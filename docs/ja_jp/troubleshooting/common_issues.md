# よくある問題

1. ## ユーザー名の検証に失敗

    **問題:** 一部のプレイヤーがサーバーへのログインに問題があり、「Failed to verify username」エラーに遭遇したと報告しています。

    **原因:** これは認証に関連しており、通常は `prevent_proxy_connections` 設定に関係しています。

    **修正:** `features.toml` で `prevent_proxy_connections` を無効にしてください。
