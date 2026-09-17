# Common Issues

1. ## Failed to verify username

    **Issue:** Some players reported having issues logging into the server, including encountering a "Failed to verify username" error.

    **Cause:** This has to do with authentication, and usually with the `prevent_proxy_connections` setting.

    **Fix:** Disable `prevent_proxy_connections` under `[networking.java.authentication]` in `pumpkin.toml`

2. ## Cannot connect using 0.0.0.0

    **Issue:** Players attempting to join a server running on their own machine cannot connect (e.g., encountering a "Connection refused" error) when entering `0.0.0.0` or `0.0.0.0:25565`.

    **Cause:** In `pumpkin.toml`, `0.0.0.0` is a wildcard listener address that tells Pumpkin to bind and listen on all local network interfaces. It is not a valid destination address for Minecraft clients to connect to.

    **Fix:**
    - When connecting from the **same machine**, enter `localhost` or `127.0.0.1` in the Minecraft client.
    - When connecting from **another device on the same local network (LAN)**, use the server host's local IP address (e.g., `192.168.x.x`).
    - When connecting over the **internet**, other players must connect using your public IP address or domain name (with port `25565` forwarded on your router).
