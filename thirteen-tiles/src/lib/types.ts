export type Coord = { x: number; y: number }

export type GridObject = Coord & {
    id: number
    value: string
}

export type BankObject = {
    id: number
    value: string
}

export type BoundingBox = {
    topLeft: Coord
    bottomRight: Coord
}
