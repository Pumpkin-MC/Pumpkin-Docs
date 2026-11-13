# 更新日志

Zig 绑定和辅助函数的更改，按 `pumpkin-api-zig` 版本分组。这些版本独立于 Pumpkin 服务器的发布版本。发布版本所指明的插件 API 修订仍必须与服务器匹配。

## 0.2.0

WIT：[pumpkin-plugin-wit@79cc4f0](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/79cc4f05a7f47e5672169d3bef593855267ec5e2)。

### 新增辅助函数和示例

- [聊天提示](./prompts)：提出问题、解析数字答案、重试验证，并提供可点击或可键入的选项。会话支持取消、替换、超时、自定义文本和匹配、捕获过滤器以及可配置的选项命令。
- [菜单](./menus)：将类似箱子的槽位标记为 `free`，放入现有的 `stacks`，并通过 `menu.items` 读取内容，包括在 `on_close` 期间读取。
- [仓库](./menus#带页面的仓库)：支持页面选择的个人存储，显示已占用槽位，提供 `/vault <page>`，并可将容量配置为 1 至 45 页。降低容量后，较高页面上已占用的槽位仍可访问。
- 菜单示例新增 `/trash`，治疗示例现在允许发送者单独使用 `/heal`。

### 更灵活地控制辅助函数

- [命令](./commands)：通过 `cmd.bad_argument` 替换类型化参数的错误提示，通过 `cmd.failWith` 返回带样式的失败消息，并通过 `register_permission` 跳过自动权限注册。
- [物品](./items)：设置默认斜体、选择修饰符 ID、读写显式数据命名空间，以及使用 `item.room` 检查物品栏容量。将其用于交易前，请先阅读文档中关于副手的限制。
- [配置](./files)：独立于文件名选择 TOML 或 JSON，控制文件创建和缺失设置的重写，抑制未知键警告，并限制文件读取大小。TOML 写入器支持数组中的结构体和元组。
- [玩家数据](./player-data)：选择 JSON 布局、TOML 或自定义编解码器；配置键验证、闲置驱逐和读取大小限制。更改格式不会迁移现有文件。
- [网络](./networking)：为传出连接和已接受的连接配置 TCP 接收缓冲区，并通过 `http.ca_file` 选择 HTTPS 证书包。`/nettest` 新增了对自定义缓冲区和超长行的检查。

### 修复

- TOML 序列化不再因数组中的结构体或元组而失败。
- 运行时生成的彩色按钮现在会为其名称使用各自独立的后备存储。

## 0.1.1

WIT：[pumpkin-plugin-wit@75f96e9](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/75f96e9475c44295f346e87531e7508f40057622)。

修复了插件声明三个或更多事件时发生的编译期分支配额失败。[比较 0.1.0 和 0.1.1](https://github.com/Pumpkin-MC/pumpkin-api-zig/compare/v0.1.0...v0.1.1)。

## 0.1.0

WIT：[pumpkin-plugin-wit@75f96e9](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/commit/75f96e9475c44295f346e87531e7508f40057622)。

面向 Zig 0.16.0 的初始版本，可将插件构建为 WebAssembly 组件：

- 生成的插件 API 和 `wasi:sockets` 绑定，包含规范 ABI 运行时和回调资源管理。
- 用于插件构建的 `addPlugin` 和 `target`，支持额外的 Zig 导入及兼容 WASI 的 C 依赖。
- 事件注册、声明式命令树和带样式的文本辅助函数。
- 锁定的物品栏菜单，以及用于构建、编辑、给予和收取物品堆叠的物品辅助函数。
- 支持复制数据和取消跟踪的延迟任务与重复任务。
- TOML 和 JSON 配置、按玩家划分的文件存储、HTTP/HTTPS 以及 TCP/UDP 网络。
- 示例插件、用于服务器端网络检查的 `/nettest`，以及自动化构建和发布工作流。

请参阅 [0.1.0](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.1.0)、[0.1.1](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.1.1) 和 [0.2.0](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases/tag/v0.2.0) 发布页面，了解其构建产物和插件 API 修订。
