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

  constructor({ parent, size, animate = tick, sprites=[], gravity }: GameProps) {
    this.size = size
    this.gravity = gravity
    this.loop = animate
    this.canvas = this.setCanvas(parent)
    this.ctx = this.canvas.getContext("2d")
    this.gameloop = new GameLoop(this,this.loop)
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
    el.style.backgroundColor = '#222'
    el.setAttribute("height", `${this.size.y}`)
    el.setAttribute("width", `${this.size.x}`)
    parent.appendChild(el)
    return el
  }

  add(sprites: SpriteInfo[]) {
    for (let i = 0, len = sprites.length; i < len; i++) {
        this.gameloop.add(new Sprite({ game: this, ...sprites[i] }))
    }
  }

  get(id:string) {
    return this.gameloop.sprites.find((s) => s.id===id)
  }

  debug() {
    console.log(this)
  }

  remove(id: string) {
    this.gameloop.remove(id)
  }

  delta() {
    return this.gameloop.delta
  }

  start() {
    this.status = "running"
    this.gameloop.start()
  }

  stop() {
    this.status = "idle"
    this.gameloop.stop()
  }
}
