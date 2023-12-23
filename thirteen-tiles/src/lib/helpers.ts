import type { BoundingBox } from "./types"

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
