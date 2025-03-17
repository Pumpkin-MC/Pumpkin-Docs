### Common Issues

1.  ### Failed to verify username

    **Issue:** Some players reported having issues logging into the server, including encountering a "Failed to verify username" error.

    **Cause:** This has to do with authentication, and usually with the `prevent_proxy_connections` setting.

    **Fix:** Disable `prevent_proxy_connections` in `features.toml`
