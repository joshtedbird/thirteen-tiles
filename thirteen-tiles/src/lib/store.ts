import { writable } from "svelte/store"
import type { Tile } from "./types"

export const tiles = writable<Tile[]>([
    {
        x: 0,
        y: 0,
        value: "p",
    },
])
