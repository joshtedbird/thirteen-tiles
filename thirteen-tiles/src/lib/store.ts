import { writable } from "svelte/store"
import type { GridObject, BankObject, Coord } from "./types"

export const tiles = writable<GridObject[]>([])

export const letters = writable<BankObject[]>([
    { id: 0, value: "r" },
    { id: 1, value: "h" },
    { id: 2, value: "e" },
    { id: 3, value: "t" },
    { id: 4, value: "r" },
    { id: 5, value: "e" },
    { id: 6, value: "v" },
    { id: 7, value: "o" },
    { id: 8, value: "h" },
    { id: 9, value: "i" },
    { id: 10, value: "g" },
    { id: 11, value: "e" },
    { id: 12, value: "e" },
    { id: 13, value: "a" },
    { id: 14, value: "w" },
])

export const spaces = writable<Coord[]>([{ x: 0, y: 0 }])

export const selected = writable<BankObject | null>(null)
