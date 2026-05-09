import { defineRoutes } from "vitepress";
import { glob, readFile } from "node:fs/promises";
import path from "node:path";

interface TypeDescriptorPrimitive {
    kind: "primitive";
    name:
        | "i8"
        | "i16"
        | "i32"
        | "i64"
        | "u8"
        | "u16"
        | "u32"
        | "u64"
        | "vi32"
        | "vi64"
        | "vu32"
        | "vu64"
        | "f32"
        | "f64"
        | "bool"
        | "string";
}

interface TypeDescriptorReference {
    kind: "local" | "global";
    name: string;
}

interface TypeDescriptorArray {
    kind: "array";
    item: TypeDescriptor;
    length: "u8" | "u16" | "u32" | "u64" | "vu32" | "vu64";
}

interface TypeDescriptorOptional {
    kind: "optional";
    payload: TypeDescriptor;
}

interface TypeDescriptorBlob {
    kind: "blob";
    schema?: TypeDescriptor;
}

interface TypeDescriptor {
    kind:
        | "primitive"
        | "local"
        | "global"
        | "array"
        | "optional"
        | "nbt"
        | "blob";
}

interface PacketField {
    name: string;
    type: TypeDescriptor;
    description: string;
    optional?: boolean;
}

interface PacketLocalTypeEnum {
    name: string;
    description: string;
    kind: "enum";
    repr: "u8" | "u16" | "u32" | "u64";
    members: {
        name: string;
        value: number;
        description: string;
    }[];
}

interface PacketLocalTypeRecord {
    name: string;
    description: string;
    kind: "record";
    fields: PacketField[];
}

interface PacketLocalType {
    name: string;
    description: string;
    kind: "enum" | "record";
}

interface Packet {
    id: number;
    name: string;
    details?: {
        short_description: string;
        long_description: string;
        direction: "server-bound" | "client-bound";
        fields: PacketField[];
        types?: PacketLocalType[];
    };
}

interface PacketSummary {
    id: number;
    urlName: string;
    name: string;
    description: string;
    documented: boolean;
}

function typeToMarkdown(type: TypeDescriptor): string {
    switch (type.kind) {
        case "primitive": {
            let typePrimitive = type as TypeDescriptorPrimitive;
            return `[${typePrimitive.name}]()`;
        }
        case "array": {
            let typeArray = type as TypeDescriptorArray;
            let itemMD = typeToMarkdown(typeArray.item);

            if (typeArray.length == "vu32") {
                return `[array]()&lt;${itemMD}&gt;`;
            } else {
                const lengthType: TypeDescriptorPrimitive = {
                    kind: "primitive",
                    name: typeArray.length,
                };
                let lengthMD = typeToMarkdown(lengthType);
                return `[array]()&lt;${itemMD}, ${lengthMD}&gt;`;
            }
        }
        case "optional": {
            let typeOptional = type as TypeDescriptorOptional;
            let payloadMD = typeToMarkdown(typeOptional.payload);
            return `[optional]()&lt;${payloadMD}&gt;`;
        }
        case "blob": {
            let typeBlob = type as TypeDescriptorBlob;
            if (typeBlob.schema !== undefined) {
                let payloadMD = typeToMarkdown(typeBlob.schema);
                return `[blob]()&lt;${payloadMD}&gt;`;
            } else {
                return `[blob]()`;
            }
        }
        case "nbt": {
            return "[nbt]()";
        }
        case "local":
        case "global": {
            let typeRef = type as TypeDescriptorReference;
            let link =
                "#$type-" +
                typeRef.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            return `[${typeRef.name}](${link})`;
        }
        default:
            return "[[error]]";
    }
}

function generateFieldList(
    fields: PacketField[],
    typeID: string,
    headerDepth: string,
) {
    let table = `
|Name|Type|
|----|----|
`;
    let body = "---\n";

    for (let field of fields) {
        let nameSuffix = "";

        if (field.optional === true) {
            nameSuffix = "?";
        }

        let kebabCaseFieldName = field.name.replaceAll("_", "-");

        let typeMD = typeToMarkdown(field.type);
        table += `|[\`${field.name}${nameSuffix}\`](#$type-${typeID}-$field-${kebabCaseFieldName})|<code>${typeMD}</code>|\n`;
        body += `
${headerDepth} <code>${field.name}${nameSuffix}: ${typeMD}</code> {#$type-${typeID}-$field-${kebabCaseFieldName}}
${field.description}

---
`;
    }

    return table + body;
}

function generateDetailPage(packet: Packet): string {
    let result = `
# \`${packet.name}\` Packet

`;
    if (packet.details === undefined) {
        result += `
::: warning\nThis packet is currently not documented. Please consult other sources.\n:::
        `;

        return result;
    }

    result += `
${packet.details.short_description}

## Details
- **Packet ID**: \`${packet.id}\` / \`0x${packet.id.toString(16)}\`
- **Send Direction**: ${packet.details.direction == "server-bound" ? "Client => Server" : "Server => Client"}

${packet.details.long_description}

## Fields {#$type-$root-$fields}
`;
    result += generateFieldList(packet.details.fields, "$root", "###");

    if (packet.details.types === undefined) return result;

    result += `## Supporting Types\n`;
    for (let type of packet.details.types) {
        let anchorId = type.name
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .toLowerCase();

        result += `### ${type.name} {#$type-${anchorId}}\n`;

        switch (type.kind) {
            case "enum":
                let typeEnum = type as PacketLocalTypeEnum;
                result += `
- **Kind**: Enum
- **Representation**: [\`${typeEnum.repr}\`]()

${type.description}

#### Members {#$type-${anchorId}-$members}
|Name|Value|Description|
|----|-----|-----------|
`;
                for (let member of typeEnum.members) {
                    result += `|\`${member.name}\`|\`${member.value}\`|${member.description}|\n`;
                }
                break;
            case "record":
                let typeRecord = type as PacketLocalTypeRecord;
                result += `
- **Kind**: Record

${type.description}

#### Fields {#$type-${anchorId}-$fields}

`;

                result += generateFieldList(
                    typeRecord.fields,
                    anchorId,
                    "#####",
                );
                break;
            default:
                result += `- Kind: *[[unknown kind - ${type.kind}]]*\n`;
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
            result += `|${packet.id} (0x${packet.id.toString(16)})|[${packet.name}](${packet.urlName})|${packet.description}|\n`;
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
                const urlName = path.basename(filePath, ".json");
                const raw = await readFile(filePath, "utf-8");
                const json = JSON.parse(raw);

                const packetInfo = json as Packet;

                return {
                    page: {
                        params: {
                            packet: urlName,
                        },
                        content: generateDetailPage(packetInfo),
                    },
                    summary: {
                        id: packetInfo.id,
                        urlName,
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
