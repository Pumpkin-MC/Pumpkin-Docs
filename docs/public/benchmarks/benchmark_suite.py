#!/usr/bin/env python3
"""
Reproducible Multi-Tier TCO & Scalability Benchmark Suite:
Pumpkin 26.3 vs. Paper 26.3 vs. Folia 26.3

Hardware Isolation on AMD Ryzen 9 9950X (2 CCDs, 16 Cores / 32 Threads):
- Server Under Test: Pinned strictly to CCD0:
  - Tier 1 (2 vCPUs / 1 Physical Core): CPUs 0,16
  - Tier 2 (8 vCPUs / 4 Physical Cores): CPUs 0-3,16-19
  - Tier 3 (16 vCPUs / 8 Physical Cores, 8 Regions): CPUs 0-7,16-23
- Multi-Process Bot Pool (8 Worker Processes): Pinned strictly to CCD1 (CPUs 8-15,24-31)
"""

import asyncio
import glob
import gzip
import hashlib
import json
import math
import multiprocessing as mp
import os
import re
import shutil
import socket
import struct
import subprocess
import time
import uuid
import zlib
from pathlib import Path

BASE_DIR = Path(os.environ.get("BENCH_DIR", "./bench_work")).resolve()
PUMPKIN_BIN = Path(os.environ.get("PUMPKIN_BIN", "./target/release/pumpkin")).resolve()
PAPER_JAR = BASE_DIR / "jars/paper-26.3-244.jar"
FOLIA_JAR = BASE_DIR / "jars/folia-26.3-6.jar"
PORT = 25566
PROTOCOL_26_3 = 777

CCD1_CPUS = set(range(8, 16)) | set(range(24, 32))

AIKAR_FLAGS_10G = [
    "java",
    "-Xms10G",
    "-Xmx10G",
    "-XX:+UseG1GC",
    "-XX:+ParallelRefProcEnabled",
    "-XX:MaxGCPauseMillis=200",
    "-XX:+UnlockExperimentalVMOptions",
    "-XX:+DisableExplicitGC",
    "-XX:+AlwaysPreTouch",
    "-XX:G1NewSizePercent=30",
    "-XX:G1MaxNewSizePercent=40",
    "-XX:G1HeapRegionSize=8M",
    "-XX:G1ReservePercent=20",
    "-XX:G1HeapWastePercent=5",
    "-XX:G1MixedGCCountTarget=4",
    "-XX:InitiatingHeapOccupancyPercent=15",
    "-XX:G1MixedGCLiveThresholdPercent=90",
    "-XX:G1RSetUpdatingPauseTimePercent=5",
    "-XX:SurvivorRatio=32",
    "-XX:+PerfDisableSharedMem",
    "-XX:MaxTenuringThreshold=1",
    "-Dusing.aikars.flags=https://mcflags.emc.gs",
    "-Daikars.new.flags=true",
]

REGIONS_8 = [
    (0.5, 120.0, 0.5),
    (8192.5, 120.0, 0.5),
    (16384.5, 120.0, 0.5),
    (24576.5, 120.0, 0.5),
    (0.5, 120.0, 8192.5),
    (8192.5, 120.0, 8192.5),
    (16384.5, 120.0, 8192.5),
    (24576.5, 120.0, 8192.5),
]


def pack_varint(val: int) -> bytes:
    if val < 0:
        val = (1 << 32) + val
    out = bytearray()
    while True:
        b = val & 0x7F
        val >>= 7
        if val:
            out.append(b | 0x80)
        else:
            out.append(b)
            break
    return bytes(out)


def unpack_varint_from_bytes(data: bytes, offset: int = 0) -> tuple[int, int]:
    val = 0
    shift = 0
    while True:
        b = data[offset]
        offset += 1
        val |= (b & 0x7F) << shift
        if not (b & 0x80):
            break
        shift += 7
    if val & (1 << 31):
        val -= 1 << 32
    return val, offset


async def read_varint_stream(reader: asyncio.StreamReader) -> int:
    val = 0
    shift = 0
    while True:
        b_raw = await reader.readexactly(1)
        b = b_raw[0]
        val |= (b & 0x7F) << shift
        if not (b & 0x80):
            break
        shift += 7
    if val & (1 << 31):
        val -= 1 << 32
    return val


def pack_string(s: str) -> bytes:
    encoded = s.encode("utf-8")
    return pack_varint(len(encoded)) + encoded


class Bot26_3:
    def __init__(self, idx: int, host: str = "127.0.0.1", port: int = PORT):
        self.idx = idx
        self.name = f"Bot_{idx:04d}"
        self.host = host
        self.port = port
        self.reader: asyncio.StreamReader | None = None
        self.writer: asyncio.StreamWriter | None = None
        self.compression_threshold = -1
        self.x = 0.0
        self.y = 100.0
        self.z = 0.0
        self.origin_x = 0.0
        self.origin_z = 0.0
        self.yaw = 0.0
        self.pitch = 0.0
        self.angle0 = (self.idx * 0.37) % (2 * math.pi)
        self.angle = self.angle0
        self.spawned = asyncio.Event()
        self.closed = False
        self.tasks: list[asyncio.Task] = []

    def frame_packet(self, pkt_id: int, payload: bytes) -> bytes:
        inner = pack_varint(pkt_id) + payload
        if self.compression_threshold >= 0:
            if len(inner) >= self.compression_threshold:
                compressed = zlib.compress(inner)
                body = pack_varint(len(inner)) + compressed
            else:
                body = pack_varint(0) + inner
            return pack_varint(len(body)) + body
        else:
            return pack_varint(len(inner)) + inner

    async def send_packet(self, pkt_id: int, payload: bytes = b""):
        if self.closed or self.writer is None:
            return
        self.writer.write(self.frame_packet(pkt_id, payload))
        await self.writer.drain()

    async def read_packet(self) -> tuple[int, bytes]:
        pkt_len = await read_varint_stream(self.reader)
        raw = await self.reader.readexactly(pkt_len)
        if self.compression_threshold >= 0:
            data_len, offset = unpack_varint_from_bytes(raw, 0)
            rest = raw[offset:]
            if data_len > 0:
                rest = zlib.decompress(rest)
            pkt_id, offset2 = unpack_varint_from_bytes(rest, 0)
            return pkt_id, rest[offset2:]
        else:
            pkt_id, offset = unpack_varint_from_bytes(raw, 0)
            return pkt_id, raw[offset:]

    async def connect_and_run(self):
        try:
            self.reader, self.writer = await asyncio.wait_for(
                asyncio.open_connection(self.host, self.port), timeout=15.0
            )
            sock = self.writer.get_extra_info("socket")
            if sock is not None:
                sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)

            # 1. Handshake -> Login (state 2)
            hs = (
                pack_varint(PROTOCOL_26_3)
                + pack_string(self.host)
                + struct.pack(">H", self.port)
                + pack_varint(2)
            )
            await self.send_packet(0x00, hs)

            # 2. Login Start
            md5 = bytearray(hashlib.md5(f"OfflinePlayer:{self.name}".encode("utf-8")).digest())
            md5[6] = (md5[6] & 0x0F) | 0x30
            md5[8] = (md5[8] & 0x3F) | 0x80
            bot_uuid = bytes(md5)
            await self.send_packet(0x00, pack_string(self.name) + bot_uuid)

            while True:
                pkt_id, payload = await asyncio.wait_for(self.read_packet(), timeout=15.0)
                if pkt_id == 0x03:  # Set Compression
                    threshold, _ = unpack_varint_from_bytes(payload, 0)
                    self.compression_threshold = threshold
                elif pkt_id == 0x02:  # Login Success
                    break
                elif pkt_id == 0x00:  # Login Disconnect
                    raise RuntimeError(f"Login disconnect: {payload!r}")

            # Login Acknowledged -> Config state
            await self.send_packet(0x03, b"")

            # 3. Config State: Send Client Information (0x00)
            client_info = (
                pack_string("en_us")
                + struct.pack(">b", 8)
                + pack_varint(0)
                + struct.pack(">?B", True, 0x7F)
                + pack_varint(1)
                + struct.pack(">??", False, True)
                + pack_varint(0)
            )
            await self.send_packet(0x00, client_info)

            while True:
                pkt_id, payload = await asyncio.wait_for(self.read_packet(), timeout=20.0)
                if pkt_id == 0x0F:  # Select Known Packs (15)
                    await self.send_packet(0x07, pack_varint(0))
                elif pkt_id == 0x04:  # Config Keep Alive (4)
                    await self.send_packet(0x04, payload)
                elif pkt_id == 0x05:  # Config Ping (5)
                    await self.send_packet(0x05, payload)
                elif pkt_id == 0x14:  # Code of Conduct (20)
                    await self.send_packet(0x09, b"")
                elif pkt_id == 0x03:  # Finish Configuration (3)
                    await self.send_packet(0x03, b"")
                    break
                elif pkt_id == 0x02:  # Config Disconnect
                    raise RuntimeError(f"Config disconnect: {payload!r}")

            # 4. Play State reader + movement loop
            self.tasks.append(asyncio.create_task(self._play_reader()))
            self.tasks.append(asyncio.create_task(self._movement_loop()))
        except Exception:
            self.closed = True

    async def _play_reader(self):
        try:
            while not self.closed:
                pkt_id, payload = await self.read_packet()
                if pkt_id == 0x2D:  # Play KeepAlive -> Serverbound KeepAlive (0x1C)
                    await self.send_packet(0x1C, payload)
                elif pkt_id == 0x3E:  # Play Ping -> Serverbound Pong (0x2D)
                    await self.send_packet(0x2D, payload)
                elif pkt_id == 0x0B:  # Chunk Batch Finished -> Chunk Batch Received (0x0B)
                    await self.send_packet(0x0B, struct.pack(">f", 25.0))
                elif pkt_id == 0x49:  # Synchronize Player Position (73)
                    tp_id, off = unpack_varint_from_bytes(payload, 0)
                    px, py, pz, dx, dy, dz, yaw, pitch, flags = struct.unpack(
                        ">ddddddffi", payload[off : off + 60]
                    )
                    self.x = (self.x + px) if (flags & 0x01) else px
                    self.y = (self.y + py) if (flags & 0x02) else py
                    self.z = (self.z + pz) if (flags & 0x04) else pz
                    self.yaw = (self.yaw + yaw) if (flags & 0x08) else yaw
                    self.pitch = (self.pitch + pitch) if (flags & 0x10) else pitch
                    self.origin_x = self.x
                    self.origin_z = self.z
                    self.angle0 = self.angle
                    if not self.spawned.is_set():
                        # Wait 1 server tick (60ms) so Paper's ServerGamePacketListenerImpl.tick()
                        # initializes firstGoodX/Y/Z via resetPosition() before AcceptTeleportation
                        await asyncio.sleep(0.06)
                    confirm_payload = pack_varint(tp_id) + struct.pack(
                        ">dddff", self.x, self.y, self.z, self.yaw, self.pitch
                    )
                    await self.send_packet(0x00, confirm_payload)
                    if not self.spawned.is_set():
                        await self.send_packet(0x2C, b"")  # Player Loaded
                        self.spawned.set()
                elif pkt_id == 0x20:  # Play Disconnect (32)
                    self.closed = True
                    break
        except Exception:
            self.closed = True

    async def _movement_loop(self):
        await self.spawned.wait()
        while not self.closed:
            await asyncio.sleep(0.05)  # 20 Hz client tick
            self.angle += 0.06
            self.x = self.origin_x + (math.cos(self.angle) - math.cos(self.angle0)) * 0.10
            self.z = self.origin_z + (math.sin(self.angle) - math.sin(self.angle0)) * 0.10
            self.yaw = (math.degrees(self.angle) + 90.0) % 360.0
            pos_rot = struct.pack(
                ">dddffB", self.x, self.y, self.z, self.yaw, self.pitch, 1
            )
            try:
                if not self.closed and self.writer is not None:
                    self.writer.write(
                        self.frame_packet(0x1F, pos_rot) + self.frame_packet(0x0D, b"")
                    )
                    await self.writer.drain()
            except Exception:
                self.closed = True
                break

    async def close(self):
        self.closed = True
        for t in self.tasks:
            t.cancel()
        if self.writer is not None:
            try:
                self.writer.close()
                await self.writer.wait_closed()
            except Exception:
                pass


def worker_entry(worker_id: int, cmd_q: mp.Queue, resp_q: mp.Queue):
    """Runs in an isolated process pinned to CCD1 (cores 8-15, 24-31)."""
    try:
        os.sched_setaffinity(0, CCD1_CPUS)
    except Exception:
        pass

    async def worker_async():
        bots: list[Bot26_3] = []
        loop = asyncio.get_running_loop()
        while True:
            msg = await loop.run_in_executor(None, cmd_q.get)
            action = msg[0]
            if action == "ADD":
                indices: list[int] = msg[1]
                batch_size: int = msg[2]
                new_bots: list[Bot26_3] = []
                for i in range(0, len(indices), batch_size):
                    chunk = [Bot26_3(idx) for idx in indices[i : i + batch_size]]
                    await asyncio.gather(
                        *(b.connect_and_run() for b in chunk), return_exceptions=True
                    )
                    for b in chunk:
                        if not b.closed:
                            new_bots.append(b)
                            bots.append(b)
                    await asyncio.sleep(0.12)
                t_wait = time.perf_counter()
                while time.perf_counter() - t_wait < 12.0:
                    if all(b.spawned.is_set() or b.closed for b in new_bots):
                        break
                    await asyncio.sleep(0.1)
                alive = sum(1 for b in bots if b.spawned.is_set() and not b.closed)
                resp_q.put(("ADDED", alive))
            elif action == "COUNT":
                alive = sum(1 for b in bots if b.spawned.is_set() and not b.closed)
                resp_q.put(("COUNT", alive))
            elif action == "CLOSE":
                await asyncio.gather(*(b.close() for b in bots), return_exceptions=True)
                bots.clear()
                resp_q.put(("CLOSED", 0))
                break

    asyncio.run(worker_async())


class MultiProcessBotPool:
    def __init__(self, num_workers: int = 8):
        self.num_workers = num_workers
        self.cmd_qs = [mp.Queue() for _ in range(num_workers)]
        self.resp_qs = [mp.Queue() for _ in range(num_workers)]
        self.procs = [
            mp.Process(target=worker_entry, args=(i, self.cmd_qs[i], self.resp_qs[i]), daemon=True)
            for i in range(num_workers)
        ]
        for p in self.procs:
            p.start()
        self.next_bot_idx = 0

    async def add_bots(self, count: int, batch_per_worker: int = 4) -> int:
        indices = list(range(self.next_bot_idx, self.next_bot_idx + count))
        self.next_bot_idx += count
        per_worker = [[] for _ in range(self.num_workers)]
        for idx in indices:
            per_worker[idx % self.num_workers].append(idx)
        for w_idx in range(self.num_workers):
            self.cmd_qs[w_idx].put(("ADD", per_worker[w_idx], batch_per_worker))
        loop = asyncio.get_running_loop()
        total_alive = 0
        for w_idx in range(self.num_workers):
            _, alive = await loop.run_in_executor(None, self.resp_qs[w_idx].get)
            total_alive += alive
        return total_alive

    async def count_alive(self) -> int:
        for w_idx in range(self.num_workers):
            self.cmd_qs[w_idx].put(("COUNT",))
        loop = asyncio.get_running_loop()
        total_alive = 0
        for w_idx in range(self.num_workers):
            _, alive = await loop.run_in_executor(None, self.resp_qs[w_idx].get)
            total_alive += alive
        return total_alive

    async def close_all(self):
        for w_idx in range(self.num_workers):
            self.cmd_qs[w_idx].put(("CLOSE",))
        loop = asyncio.get_running_loop()
        for w_idx in range(self.num_workers):
            await loop.run_in_executor(None, self.resp_qs[w_idx].get)
        for p in self.procs:
            p.join(timeout=2.0)


ANSI_RE = re.compile(r"\x1b\[[0-9;]*[a-zA-Z]")


def strip_ansi(s: str) -> str:
    return ANSI_RE.sub("", s)


def get_memory_mb(pid: int) -> tuple[float, float]:
    rss_kb = 0
    pss_kb = 0
    try:
        with open(f"/proc/{pid}/status", "r") as f:
            for line in f:
                if line.startswith("VmRSS:"):
                    rss_kb += int(line.split()[1])
    except Exception:
        pass
    try:
        with open(f"/proc/{pid}/smaps_rollup", "r") as f:
            for line in f:
                if line.startswith("Pss:"):
                    pss_kb += int(line.split()[1])
    except Exception:
        pss_kb = rss_kb
    return rss_kb / 1024.0, pss_kb / 1024.0


def prepare_playerdata_positions(server_dir: Path, max_bots: int, multi_region: bool):
    """
    If multi_region is False, deletes saved playerdata so all bots spawn cleanly at world spawn.
    If multi_region is True, populates <uuid>.dat for bots 0..max_bots across 8 regions spaced 1024 blocks apart.
    """
    p_data_dir = server_dir / "world/players/data"
    p_data_dir.mkdir(parents=True, exist_ok=True)
    existing = sorted(glob.glob(str(p_data_dir / "*.dat*")))
    bkp = server_dir / "template_player.dat"
    if existing and not bkp.exists():
        shutil.copyfile(existing[0], bkp)

    if not multi_region:
        for f in existing:
            try:
                os.remove(f)
            except Exception:
                pass
        return

    # Find a valid template .dat file for this server engine
    template_bytes = None
    if existing:
        template_bytes = gzip.open(existing[0], "rb").read()
    else:
        # Fallback template from backup
        bkp = server_dir / "template_player.dat"
        if bkp.exists():
            template_bytes = gzip.open(bkp, "rb").read()

    if not template_bytes:
        return

    # Save backup template
    bkp = server_dir / "template_player.dat"
    if not bkp.exists():
        with gzip.open(bkp, "wb") as f:
            f.write(template_bytes)

    motion_marker = b"\x09\x00\x06Motion\x06\x00\x00\x00\x03"
    m_idx = template_bytes.find(motion_marker)
    if m_idx >= 0:
        template_bytes = (
            template_bytes[: m_idx + 14]
            + struct.pack(">ddd", 0.0, 0.0, 0.0)
            + template_bytes[m_idx + 38 :]
        )

    pos_marker = b"\x09\x00\x03Pos\x06\x00\x00\x00\x03"
    pos_idx = template_bytes.find(pos_marker)
    if pos_idx < 0:
        return

    # Pre-compress 8 region templates
    region_gz_blobs = []
    for rx, ry, rz in REGIONS_8:
        patched = (
            template_bytes[: pos_idx + 11]
            + struct.pack(">ddd", rx, ry, rz)
            + template_bytes[pos_idx + 35 :]
        )
        region_gz_blobs.append(gzip.compress(patched, compresslevel=1))

    # Clean old .dat files so only freshly positioned files remain
    for f in existing:
        try:
            os.remove(f)
        except Exception:
            pass

    is_pumpkin = "pumpkin" in str(server_dir).lower()
    for idx in range(max_bots):
        name = f"Bot_{idx:04d}"
        if is_pumpkin:
            bot_uuid = str(uuid.UUID(bytes=hashlib.sha256(name.encode("utf-8")).digest()[:16]))
        else:
            md5 = bytearray(hashlib.md5(f"OfflinePlayer:{name}".encode("utf-8")).digest())
            md5[6] = (md5[6] & 0x0F) | 0x30
            md5[8] = (md5[8] & 0x3F) | 0x80
            bot_uuid = str(uuid.UUID(bytes=bytes(md5)))
        (p_data_dir / f"{bot_uuid}.dat").write_bytes(region_gz_blobs[idx % len(REGIONS_8)])


class ServerProcess:
    def __init__(self, name: str, cmd: list[str], cwd: Path, ready_substring: str):
        self.name = name
        self.cmd = cmd
        self.cwd = cwd
        self.ready_substring = ready_substring
        self.proc: subprocess.Popen | None = None
        self.lines: list[str] = []
        self._reader_task: asyncio.Task | None = None
        self.ready_event = asyncio.Event()
        self.boot_ms = 0.0

    async def start(self) -> float:
        t0 = time.perf_counter()
        self.proc = subprocess.Popen(
            self.cmd,
            cwd=str(self.cwd),
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )
        self._reader_task = asyncio.create_task(self._read_stdout())
        await asyncio.wait_for(self.ready_event.wait(), timeout=120.0)
        while True:
            try:
                r, w = await asyncio.open_connection("127.0.0.1", PORT)
                w.close()
                await w.wait_closed()
                break
            except Exception:
                await asyncio.sleep(0.005)
        self.boot_ms = (time.perf_counter() - t0) * 1000.0
        return self.boot_ms

    async def _read_stdout(self):
        loop = asyncio.get_running_loop()
        while self.proc and self.proc.stdout:
            line = await loop.run_in_executor(None, self.proc.stdout.readline)
            if not line:
                break
            clean = strip_ansi(line).strip()
            if clean:
                self.lines.append(clean)
                if not self.ready_event.is_set() and self.ready_substring in clean:
                    self.ready_event.set()

    def send_cmd(self, cmd_str: str):
        if self.proc and self.proc.stdin:
            try:
                self.proc.stdin.write(cmd_str + "\n")
                self.proc.stdin.flush()
            except Exception:
                pass

    async def query_metrics(self) -> dict:
        idx_before = len(self.lines)
        is_folia = "folia" in self.name.lower()
        is_pumpkin = "pumpkin" in self.name.lower()

        if is_pumpkin:
            self.send_cmd("tps")
            self.send_cmd("tick query")
        elif is_folia:
            self.send_cmd("tps")
        else:
            self.send_cmd("tick query")
            self.send_cmd("tps")

        t_wait = time.perf_counter()
        last_send = t_wait
        while time.perf_counter() - t_wait < 12.0:
            await asyncio.sleep(0.25)
            cur = self.lines[idx_before:]
            if any(
                ("Percentiles:" in ln) or ("Lowest Region TPS:" in ln)
                for ln in cur
            ):
                await asyncio.sleep(0.2)
                break
            if time.perf_counter() - last_send > 3.5:
                last_send = time.perf_counter()
                if is_pumpkin:
                    self.send_cmd("tps")
                    self.send_cmd("tick query")
                elif is_folia:
                    self.send_cmd("tps")
                else:
                    self.send_cmd("tick query")
                    self.send_cmd("tps")

        new_lines = self.lines[idx_before:]
        tps = 20.0
        mspt = 0.0
        p50 = 0.0
        p95 = 0.0
        p99 = 0.0
        regions = 1

        for ln in new_lines:
            m_p = re.search(r"TPS:\s*([0-9.]+)\s*MSPT:\s*([0-9.]+)ms", ln)
            if m_p:
                tps = float(m_p.group(1))
                mspt = float(m_p.group(2))
            m_tq = re.search(r"Average time per tick:\s*([0-9.]+)ms", ln)
            if m_tq:
                mspt = float(m_tq.group(1))
            m_pct = re.search(
                r"Percentiles:\s*P50:\s*([0-9.]+)ms\s*P95:\s*([0-9.]+)ms\s*P99:\s*([0-9.]+)ms",
                ln,
            )
            if m_pct:
                p50 = float(m_pct.group(1))
                p95 = float(m_pct.group(2))
                p99 = float(m_pct.group(3))
            m_ptps = re.search(r"TPS from last 1m, 5m, 15m:\s*\*?([0-9.]+)", ln)
            if m_ptps and mspt == 0.0:
                tps = float(m_ptps.group(1))
            # Folia health output
            m_reg = re.search(r"Total regions:\s*([0-9]+)", ln)
            if m_reg:
                regions = int(m_reg.group(1))
            m_med = re.search(r"Median Region TPS:\s*([0-9.]+)", ln)
            if m_med:
                tps = float(m_med.group(1))
            m_fmspt = re.search(r"at\s+([0-9.]+)\s+MSPT\s+at\s+([0-9.]+)\s+TPS", ln)
            if m_fmspt and mspt == 0.0:
                mspt = float(m_fmspt.group(1))

        if mspt > 50.0:
            tps = min(tps, round(1000.0 / mspt, 2))

        return {
            "tps": round(tps, 2),
            "mspt": round(mspt, 2),
            "p50_ms": round(p50, 2),
            "p95_ms": round(p95, 2),
            "p99_ms": round(p99, 2),
            "regions": regions,
            "raw": " | ".join(new_lines[-12:]),
        }

    async def stop(self):
        if self.proc and self.proc.poll() is None:
            try:
                self.send_cmd("stop")
                for _ in range(60):
                    if self.proc.poll() is not None:
                        break
                    await asyncio.sleep(0.25)
                if self.proc.poll() is None:
                    self.proc.kill()
            except Exception:
                self.proc.kill()
        if self._reader_task:
            self._reader_task.cancel()
        await asyncio.sleep(0.5)


async def ensure_template_and_warmup_regions(
    name: str, cmd: list[str], cwd: Path, ready_str: str
):
    """Ensures a template_player.dat exists and warms up the 8 dispersed regions on disk."""
    print(f"=== Warming up 8 dispersed regions for {name} ===", flush=True)
    # First ensure template_player.dat exists by connecting 1 bot if needed
    p_data_dir = cwd / "world/players/data"
    if not (cwd / "template_player.dat").exists() and not glob.glob(str(p_data_dir / "*.dat")):
        srv = ServerProcess(name, ["taskset", "-c", "0-7,16-23"] + cmd, cwd, ready_str)
        await srv.start()
        pool = MultiProcessBotPool(num_workers=1)
        await pool.add_bots(1, batch_per_worker=1)
        await asyncio.sleep(2.0)
        await pool.close_all()
        await srv.stop()

    prepare_playerdata_positions(cwd, max_bots=16, multi_region=True)
    srv = ServerProcess(name, ["taskset", "-c", "0-7,16-23"] + cmd, cwd, ready_str)
    await srv.start()
    pool = MultiProcessBotPool(num_workers=4)
    alive = await pool.add_bots(8, batch_per_worker=2)
    print(f"  Connected {alive}/8 region-warmup bots, generating chunks for 8s...", flush=True)
    await asyncio.sleep(8.0)
    await pool.close_all()
    await srv.stop()
    print(f"=== Finished warming up 8 regions for {name} ===", flush=True)


async def run_tier_benchmark(
    tier_name: str,
    cpu_mask: str,
    server_name: str,
    cmd: list[str],
    cwd: Path,
    ready_str: str,
    bot_steps: list[int],
    multi_region: bool = False,
    measure_boot: bool = False,
) -> dict:
    print(f"\n=======================================================", flush=True)
    print(f"[{tier_name}] {server_name} (CPUs: {cpu_mask}, Multi-Region: {multi_region})", flush=True)
    print(f"=======================================================", flush=True)

    prepare_playerdata_positions(cwd, max_bots=max(bot_steps) + 100, multi_region=multi_region)

    boot_times = []
    num_boot_runs = 3 if measure_boot else 1
    srv = None
    for r in range(num_boot_runs):
        srv = ServerProcess(server_name, ["taskset", "-c", cpu_mask] + cmd, cwd, ready_str)
        b_ms = await srv.start()
        boot_times.append(round(b_ms, 1))
        if measure_boot:
            print(f"  [Boot Run {r + 1}/{num_boot_runs}] {b_ms:.1f} ms", flush=True)
        if r < num_boot_runs - 1:
            await srv.stop()
            await asyncio.sleep(0.8)

    await asyncio.sleep(6.0)
    idle_rss, idle_pss = get_memory_mb(srv.proc.pid)
    idle_m = await srv.query_metrics()
    print(
        f"  [Idle] RSS: {idle_rss:.1f} MiB | PSS: {idle_pss:.1f} MiB | MSPT: {idle_m['mspt']:.2f} ms",
        flush=True,
    )

    pool = MultiProcessBotPool(num_workers=8)
    scaling = []
    max_bots_20tps = 0

    try:
        current_target = 0
        for step_target in bot_steps:
            needed = step_target - current_target
            current_target = step_target
            if needed > 0:
                t0 = time.perf_counter()
                alive = await pool.add_bots(
                    needed,
                    batch_per_worker=5 if "pumpkin" in server_name.lower() else 3,
                )
                dt = time.perf_counter() - t0
                print(
                    f"  -> Step {step_target}: {alive}/{step_target} bots connected in {dt:.1f}s, stabilizing 8s...",
                    flush=True,
                )
            await asyncio.sleep(8.0)
            rss, pss = get_memory_mb(srv.proc.pid)
            m = await srv.query_metrics()
            alive = await pool.count_alive()
            print(
                f"  [Load: {alive}/{step_target} bots] TPS: {m['tps']:.2f} | MSPT: {m['mspt']:.2f} ms "
                f"(P50: {m['p50_ms']:.1f}, P95: {m['p95_ms']:.1f}, P99: {m['p99_ms']:.1f}) | "
                f"Regions: {m['regions']} | RSS: {rss:.1f} MiB",
                flush=True,
            )
            entry = {
                "target_bots": step_target,
                "alive_bots": alive,
                "tps": m["tps"],
                "mspt": m["mspt"],
                "p50_ms": m["p50_ms"],
                "p95_ms": m["p95_ms"],
                "p99_ms": m["p99_ms"],
                "regions": m["regions"],
                "rss_mib": round(rss, 1),
                "pss_mib": round(pss, 1),
            }
            scaling.append(entry)

            # Check if server maintained ~20 TPS (MSPT <= 50.0, TPS >= 19.0, >=90% bots alive)
            if m["tps"] >= 19.0 and m["mspt"] <= 50.0 and alive >= step_target * 0.90:
                max_bots_20tps = alive
            else:
                print(
                    f"  [!] Saturated at {alive}/{step_target} bots (TPS={m['tps']}, MSPT={m['mspt']}ms). Stopping ramp.",
                    flush=True,
                )
                break
    finally:
        await pool.close_all()
        await srv.stop()

    return {
        "tier": tier_name,
        "cpu_mask": cpu_mask,
        "multi_region": multi_region,
        "server": server_name,
        "boot_runs_ms": boot_times,
        "boot_median_ms": sorted(boot_times)[len(boot_times) // 2],
        "idle_rss_mib": round(idle_rss, 1),
        "idle_pss_mib": round(idle_pss, 1),
        "max_bots_20tps": max_bots_20tps,
        "scaling": scaling,
    }


async def main():
    prev_file = BASE_DIR / "results_full_tiers.json"
    all_suites = []
    if prev_file.exists():
        prev = json.loads(prev_file.read_text())
        all_suites = [s for s in prev if "Pumpkin" not in s.get("server", "")]

    # Tier 1: 1 Physical Core / 2 vCPUs (Single Region)
    all_suites.append(
        await run_tier_benchmark(
            "Tier 1: 1 Core / 2 vCPUs (Single Region)",
            "0,16",
            "Pumpkin 26.3 (Rust Release LTO + Native CPU)",
            [str(PUMPKIN_BIN)],
            BASE_DIR / "pumpkin_dir",
            "Server is now running",
            [50, 100, 150, 200, 250, 300],
            multi_region=False,
            measure_boot=True,
        )
    )

    # Tier 2: 4 Physical Cores / 8 vCPUs (Single Region)
    all_suites.append(
        await run_tier_benchmark(
            "Tier 2: 4 Cores / 8 vCPUs (Single Region)",
            "0-3,16-19",
            "Pumpkin 26.3 (Rust Release LTO + Native CPU)",
            [str(PUMPKIN_BIN)],
            BASE_DIR / "pumpkin_dir",
            "Server is now running",
            [50, 100, 150, 200, 250, 300, 400, 500, 600, 700],
            multi_region=False,
            measure_boot=True,
        )
    )

    # Tier 3: 8 Physical Cores / 16 vCPUs (8 Dispersed Regions)
    all_suites.append(
        await run_tier_benchmark(
            "Tier 3: 8 Cores / 16 vCPUs (8 Dispersed Regions)",
            "0-7,16-23",
            "Pumpkin 26.3 (Rust Release LTO + Native CPU)",
            [str(PUMPKIN_BIN)],
            BASE_DIR / "pumpkin_dir",
            "Server is now running",
            [100, 200, 300, 400, 500, 600, 750, 900, 1050, 1200],
            multi_region=True,
            measure_boot=False,
        )
    )

    out_file = BASE_DIR / "results_full_tiers.json"
    out_file.write_text(json.dumps(all_suites, indent=2))
    print(f"\nSaved complete multi-tier results to {out_file}", flush=True)


if __name__ == "__main__":
    asyncio.run(main())
