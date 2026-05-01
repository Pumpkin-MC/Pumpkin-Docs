# Minecraft Bedrock Protocol

## Introduction

Pumpkin supports both Java Edition and Bedrock Edition clients.

This section is a WIP attempt at documenting the Bedrock protocol, independently of Pumpkin's particular implementation in Rust.

There are a handful of sources on it, including Mojang's own official [bedrock-protocol-docs](https://github.com/Mojang/bedrock-protocol-docs). However at the time of this writing, the official docs are not always intuitive to read, e.g. being inconsistent on how they present information. Meanwhile other documentation such as that found on [minecraft.wiki](https://minecraft.wiki/w/Bedrock_Edition_protocol) is incomplete.

This guide aggregates information from the official docs, and information gleaned from various implementations such as [gophertunnel](https://github.com/Sandertv/gophertunnel), [BetterAltay](https://github.com/Benedikt05/BetterAltay), [GeyserMC](https://github.com/GeyserMC/Geyser), [Cloudburst Nukkit](https://github.com/CloudburstMC/Nukkit), etc. and tries to lay it out in an easy to understand way.

## Underylying Protocols

The Bedrock Protocol is layered over one of two other protocols: RakNet or NetherNet

RakNet is the older of the two, built atop of UDP, and is the one currently implemented by Pumpkin. Most other Bedrock server implementations also stick to RakNet.

NetherNet is a newer protocol designed specifically for Minecraft backed by WebRTC. Xbox Live sessions and LAN games hosted by the official client have transitioned to using it. There is not a great deal of publically available information about it. [NetherNet of the Bedrock Wiki](https://wiki.bedrock.dev/servers/nethernet)
