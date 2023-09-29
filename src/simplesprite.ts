import { nanoid } from "nanoid"
import { Game } from "./game"

export class SimpleSprite {
  id: string
  coords: Coords
  size: Coords
  game: Game
  center: Coords
  bounds: Bounds
  scale: Coords
  loop: boolean
  destroy: boolean = false
  animationSpeed: number
  type: string

  constructor({
    game,
    size = { x: 50, y: 50 },
    coords = { x: 0, y: 0 },
    scale = { x: 1, y: 1 },
    loop = true,
    animationSpeed = 1,
    id,
    type,
  }: SimpleSpriteProps) {
    this.id = id ?? nanoid()
    this.game = game
    this.coords = coords
    this.size = size
    this.scale = scale
    this.center = { x: (this.size.x / 2) * this.scale.x, y: (this.size.y / 2) * this.scale.y }
    this.bounds = {
      top: { x: this.coords.x, y: this.coords.y },
      right: { x: this.coords.x + this.size.x * this.scale.x, y: this.coords.y },
      bottom: { x: this.coords.x + this.size.x * this.scale.x, y: this.coords.y + this.size.y * this.scale.y },
      left: { x: this.coords.x, y: this.coords.y + this.size.y * this.scale.y },
    }
    this.loop = loop
    this.animationSpeed = animationSpeed
    this.type = type
  }

  debug() {
    console.log
  }
}
