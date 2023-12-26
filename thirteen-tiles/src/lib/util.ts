import type { BankObject, BoundingBox, Coord } from "./types"
import { get } from "svelte/store"
import { tiles, letters, numTiles } from "./store"
import { letterBag } from "./data"

const GRID_SIZE = 10
export const scale = (n: number) => n * GRID_SIZE

export function getArea(bbox: BoundingBox) {
    // let xMin = Math.min(MIN_LEFT, bbox.topLeft.x)
    // let yMin = Math.min(MIN_LEFT, bbox.topLeft.y)

    // let xMax = Math.max(MIN_RIGHT, bbox.bottomRight.x)
    // let yMax = Math.max(MIN_RIGHT, bbox.bottomRight.y)

    // let width = xMax - xMin
    // let height = yMax - yMin

    // return [xMin, yMin, width, height].map((d) => scale(d))

    let left = 0
    let top = 0

    let width = bbox.bottomRight.x - bbox.topLeft.x
    let height = bbox.bottomRight.y - bbox.topLeft.y

    if (width < 5) {
        left = bbox.topLeft.x - (5 - width) / 2
        width = 5
    } else {
        left = bbox.topLeft.x
    }

    if (height < 5) {
        top = bbox.topLeft.y - (5 - height) / 2
        height = 5
    } else {
        top = bbox.topLeft.y
    }

    return [left, top, width, height].map((d) => scale(d))
}

function checkForTile(x: number, y: number, spaces: Coord[]) {
    return (
        get(tiles).filter((d) => d.x === x && d.y === y).length +
        spaces.filter((d) => d.x === x && d.y === y).length
    )
}

export function genSpaces() {
    let output: Coord[] = []
    const gridTiles = get(tiles)

    for (let i = 0; i < gridTiles.length; i++) {
        let coords = { x: gridTiles[i].x, y: gridTiles[i].y }

        //LEFT
        if (!checkForTile(coords.x - 1, coords.y, output)) {
            output.push({ x: coords.x - 1, y: coords.y })
        }
        //RIGHT
        if (!checkForTile(coords.x + 1, coords.y, output)) {
            output.push({ x: coords.x + 1, y: coords.y })
        }
        //TOP
        if (!checkForTile(coords.x, coords.y - 1, output)) {
            output.push({ x: coords.x, y: coords.y - 1 })
        }
        //BOTTOM
        if (!checkForTile(coords.x, coords.y + 1, output)) {
            output.push({ x: coords.x, y: coords.y + 1 })
        }
    }

    return output
}

export function genLetters(n: number) {
    let output: BankObject[] = []
    for (let i = 0; i < n; i++) {
        let index = Math.floor(Math.random() * letterBag.length)
        output.push({ value: letterBag[index], id: i, position: i })
    }

    return output
}

export function shuffleTiles() {
    let currentLetters = get(letters)
    let m = currentLetters.length,
        t,
        i

    while (m) {
        i = Math.floor(Math.random() * m--)

        t = currentLetters[m]
        currentLetters[m] = currentLetters[i]
        currentLetters[i] = t
    }

    for (let i = 0; i < currentLetters.length; i++) {
        currentLetters[i].position = i
    }

    console.log(currentLetters)

    return currentLetters
}

export function findFirstSpace() {
    let min = 0
    let l = get(letters)

    for (let i = 0; i < numTiles; i++) {
        if (!l.filter((d) => d.position === i).length) {
            min = i
            break
        }
    }

    return min
}
