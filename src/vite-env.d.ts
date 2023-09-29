/// <reference types="vite/client" />

type Coords = {
  x: number
  y: number
}
type Bounds = {
  top: Coords
  right: Coords
  bottom: Coords
  left: Coords
}

type ImageInfo = {
  src: string
  frames: number
}

type LoopFunction = (game: Game) => void | (() => void)

type SimpleSpriteProps = {
  game: Game
  coords: Coords
  size: Coords
  scale?: Coords
  loop?: boolean
  animationSpeed?: number
  id?: string
  type: string
}

type BaseSpriteProps = SimpleSpriteProps & {
  image: ImageInfo
  type: string
}

type SpriteProps = BaseSpriteProps & {
  movement: Coords
}

type SpriteInfo = Omit<SpriteProps, "game">

type Status = "idle" | "running" | "over"

type GameProps = {
  size: Coords
  parent: HTMLElement
  animate?: LoopFunction
  sprites?: SpriteInfo[]
  gravity: Coords
}
