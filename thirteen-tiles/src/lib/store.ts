import { writable } from "svelte/store"
import type { GridObject, BankObject, Coord } from "./types"
import { genLetters } from "./util"

export const numTiles = 15

export const tiles = writable<GridObject[]>([])

export const letters = writable<BankObject[]>(genLetters(numTiles))

export const spaces = writable<Coord[]>([{ x: 0, y: 0 }])

export const selected = writable<BankObject | null>(null)
