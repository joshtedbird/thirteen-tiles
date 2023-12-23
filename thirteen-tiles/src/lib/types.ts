type Coord = { x: number; y: number }

export type Tile = Coord & {
    value: string
}

export type BoundingBox = {
    topLeft: Coord
    bottomRight: Coord
}
