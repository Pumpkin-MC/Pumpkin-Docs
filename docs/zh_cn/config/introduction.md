### 配置系统

Pumpkin 提供了强大的配置系统，允许用户无需依赖外部插件即可自定义服务器的各个方面。这为服务器的运行提供了灵活性和控制力。

### 基础 / 高级配置

Pumpkin 的配置分为"基础"配置（用于快速更改和重要设置）和更加"高级"的配置：

- `configuration.toml`：简单配置，可以与原版 Minecraft 的 `server.properties` 相比较。
- `features.toml`：设计为在一个地方包含 Pumpkin 的所有功能，是一个更全面的配置文件。

### 服务器版本

Pumpkin 旨在支持最新的 Minecraft 版本。如果您想为任何其他版本托管 Pumpkin 服务器，可以使用名为 [ViaProxy](https://github.com/ViaVersion/ViaProxy) 的项目。

- 确保允许代理连接。
- Pumpkin 和 ViaProxy 没有关联；请勿提交关于其代码的问题。此外，这是第三方代理，Pumpkin 不对其好坏负责。

#### 主要特点：

- 全面的自定义：配置服务器设置、玩家行为、世界生成等。
- 性能优化：通过配置调整优化服务器性能。
- 无插件自定义：无需额外插件即可实现所需的更改。 