import type { BoundingBox, Coord } from "./types"
import { get } from "svelte/store"
import { tiles } from "./store"

const GRID_SIZE = 10
export const scale = (n: number) => n * GRID_SIZE

export function getArea(bbox: BoundingBox) {
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

    if (height < 7) {
        top = bbox.topLeft.y - (7 - height) / 2
        height = 7
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
