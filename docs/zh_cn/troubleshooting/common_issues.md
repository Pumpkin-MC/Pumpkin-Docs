### 常见问题

1.  ### 无法验证用户名

    **问题:** 一些玩家报告在登录服务器时遇到问题，包括遇到"无法验证用户名"的错误。

    **原因:** 这与身份验证有关，通常与`prevent_proxy_connections`设置有关。

    **解决方法:** 在`features.toml`中禁用`prevent_proxy_connections` 