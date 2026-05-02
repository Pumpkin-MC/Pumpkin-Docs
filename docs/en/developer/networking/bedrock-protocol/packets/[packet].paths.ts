import { defineRoutes } from "vitepress";
import { glob, readFile } from "node:fs/promises";
import path from "node:path";

interface TypeDescriptor {
    kind: "primitive";
    name: string;
}

interface PacketField {
    name: string;
    type: TypeDescriptor;
    description: string;
}

interface PacketDetails {
    short_description: string;
    long_description: string;
    direction: "server-bound" | "client-bound";
    fields: PacketField[];
}

interface Packet {
    id: number;
    name: string;
    details?: PacketDetails;
}

interface PacketSummary {
    id: number;
    url_name: string;
    name: string;
    description: string;
    documented: boolean;
}

function generateDetailPage(packet: Packet): string {
    let result = `
# \`${packet.name}\` Packet

`;
    if (packet.details === undefined) {
        result += `
::: warning\nThis packet is currently not documented. Please consult other sources.\n:::
        `;
    } else {
        result += `
${packet.details.short_description}

## Details
- **Packet ID**: \`${packet.id}\` / \`0x${packet.id.toString(16)}\`
- **Send Direction**: ${packet.details.direction == "server-bound" ? "Client => Server" : "Server => Client"}

${packet.details.long_description}

## Fields
|Name|Type|Description|
|----|----|-----------|
`;

        for (let field of packet.details.fields) {
            result += `|[](){#field-${field.name.replaceAll("_", "-")}}\`${field.name}\`|[\`${field.type.name}\`]()|${field.description}|\n`;
        }
    }

    return result;
}

function generateIndex(entries: PacketSummary[]): string {
    let result = `
# Bedrock Protocol Packets
|ID|Name|Description|
|--|----|-----------|
`;

    for (let packet of entries) {
        if (packet.documented) {
            result += `|${packet.id} (0x${packet.id.toString(16)})|[${packet.name}](${packet.url_name})|${packet.description}|\n`;
        } else {
            result += `|${packet.id} (0x${packet.id.toString(16)})|${packet.name}|_(currently undocumented)_|\n`;
        }
    }

    return result;
}

export default defineRoutes({
    watch: ["./*.json", "./*.md"],
    async paths(watchedFiles: string[]) {
        let pageTasks = watchedFiles
            .filter((f) => path.extname(f) == ".json")
            .map(async (filePath) => {
                const url_name = path.basename(filePath, ".json");
                const raw = await readFile(filePath, "utf-8");
                const json = JSON.parse(raw);

                const packetInfo = json as Packet;

                return {
                    page: {
                        params: {
                            packet: url_name,
                        },
                        content: generateDetailPage(packetInfo),
                    },
                    summary: {
                        id: packetInfo.id,
                        url_name,
                        name: packetInfo.name,
                        documented: packetInfo.details !== undefined,
                        description:
                            packetInfo.details !== undefined
                                ? packetInfo.details.short_description
                                : "",
                    },
                };
            });

        let pages = (await Promise.all(pageTasks)).sort(
            (a, b) => a.summary.id - b.summary.id,
        );

        let result = pages.map((p) => p.page);
        result.push({
            params: {
                packet: "all",
            },
            content: generateIndex(pages.map((p) => p.summary)),
        });
        return result;
    },
});
