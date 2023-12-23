import type { BoundingBox, Coord } from "./types"
import { get } from "svelte/store"
import { tiles } from "./store"

const GRID_SIZE = 10
export const scale = (n: number) => n * GRID_SIZE

const START_WIDTH = 5
const MIN_LEFT = Math.ceil(START_WIDTH / -2)
const MIN_RIGHT = Math.ceil(START_WIDTH / 2)

export function getArea(bbox: BoundingBox) {
    let xMin = Math.min(MIN_LEFT, bbox.topLeft.x - 1)
    let yMin = Math.min(MIN_LEFT, bbox.topLeft.y - 1)

    let xMax = Math.max(MIN_RIGHT, bbox.bottomRight.x + 1)
    let yMax = Math.max(MIN_RIGHT, bbox.bottomRight.y + 1)

    let width = xMax - xMin
    let height = yMax - yMin

    return [xMin, yMin, width, height].map((d) => scale(d))
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
