import { writable } from "svelte/store"
import type { GridObject, BankObject, Coord } from "./types"

export const tiles = writable<GridObject[]>([])

export const letters = writable<BankObject[]>([
    { id: 0, value: "a" },
    { id: 1, value: "a" },
    { id: 2, value: "e" },
    { id: 3, value: "i" },
    { id: 4, value: "o" },
    { id: 5, value: "f" },
    { id: 6, value: "g" },
    { id: 7, value: "n" },
    { id: 8, value: "n" },
    { id: 9, value: "w" },
    { id: 10, value: "s" },
    { id: 11, value: "d" },
    { id: 12, value: "x" },
    { id: 13, value: "y" },
    { id: 14, value: "l" },
])

export const spaces = writable<Coord[]>([{ x: 0, y: 0 }])

export const selected = writable<BankObject | null>(null)
