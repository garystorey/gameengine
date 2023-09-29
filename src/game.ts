import { GameLoop } from "./gameloop"
import { Sprite } from "./sprite"

const tick = () => {}

export class Game {
  size: Coords
  gravity: Coords
  loop: LoopFunction
  gameloop: GameLoop
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  status: Status

  sprites: Sprite[] = []

  constructor({ parent, size, animate = tick, sprites = [], gravity = { x: 0, y: 0 } }: GameProps) {
    this.size = size
    this.gravity = gravity
    this.loop = animate
    this.canvas = this.setCanvas(parent)
    this.ctx = this.canvas.getContext("2d")
    this.gameloop = new GameLoop(this, this.loop)
    this.status = "idle"
    if (sprites.length) {
      this.add(sprites)
    }
  }

  setCanvas(parent: HTMLElement) {
    const el = document.createElement("canvas")
    el.id = "canvas"
    el.style.height = `${this.size.y}px`
    el.style.width = `${this.size.x}px`
    el.style.backgroundColor = "#222"
    el.setAttribute("height", `${this.size.y}`)
    el.setAttribute("width", `${this.size.x}`)
    parent.appendChild(el)
    return el
  }

  add(sprites: SpriteInfo[]) {
    for (let i = 0, len = sprites.length; i < len; i++) {
      const sprite = new Sprite({ game: this, ...sprites[i] })
      const els = [...this.sprites, sprite].sort((a, b) => (a.coords.y <= b.coords.y ? -1 : 1))
      this.sprites = els
    }
  }
  remove(id: string) {
    const sprite = this.sprites.filter((s) => s.id === id)
    sprite.forEach((s) => {
      s.destroy = true
      s.loop = false
    })
    this.sprites = this.sprites.filter((s) => s.id !== id)
  }

  get(id: string) {
    return this.sprites.find((s) => s.id === id)
  }

  getAllByType(type: string) {
    return this.sprites.filter((s) => s.type === type)
  }

  debug() {
    console.log(this)
  }

  delta() {
    return this.gameloop.delta
  }

  start() {
    this.status = "running"
    this.gameloop.start()
  }

  stop() {
    this.sprites.forEach((s) => {
      s.elapsedFrames = 0
      s.currentFrame = 0
      if (!s.loop) this.remove(s.id)
    })
    this.status = "idle"
    this.gameloop.stop()
  }
}
