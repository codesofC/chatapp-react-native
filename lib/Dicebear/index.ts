import { thumbs } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export default function generatorAvatar(name: string){
    const svg = createAvatar(thumbs, {
        seed: name,
        size: 40
    }).toString()

    return svg
}