import { Sprite } from "./sprite"

const tick = () => {}

export class Game {
  size: Coords
  gravity: Coords
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  status: Status
  animate: LoopFunction

  rAF: number = 0
  isInitial: boolean = true
  time: number = 0
  lastTime: number = 0
  delta: number = 0

  sprites: Sprite[] = []

  constructor({ parent, size, animate = tick, sprites = [], gravity = { x: 0, y: 0 } }: GameProps) {
    this.size = size
    this.gravity = gravity
    this.animate = animate
    this.update = this.update.bind(this)
    this.canvas = this.setCanvas(parent)
    this.ctx = this.canvas.getContext("2d")
    this.status = "idle"
    if (sprites.length) {
      this.add(sprites)
    }
    return this
  }

  update(time: number) {
    this.time = time
    const updated = time - this.lastTime
    this.delta = this.isInitial || updated >= 2000 ? 0 : updated
    this.lastTime = time
    if (this.isInitial) this.isInitial = false

    //reset canvas
    this.resetCanvas()
    // remove old sprites
    this.sprites = this.sprites.filter((sprite) => !sprite.destroy)
    // draw the current update
    this.sprites.forEach((sprite) => sprite.draw())
    // do default udpates
    this.sprites.forEach((sprite) => sprite.update())
    // run the user updates
    this.animate(this)

    if (this.status === "running") {
      this.rAF = requestAnimationFrame(this.update)
      return
    }
    // if it hits here its not running, so stop
    this.sprites.forEach((sprite) => {
      sprite.destroy = true
      sprite.loop = false
      sprite.visible = false
    })
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
  resetCanvas() {
    if (!this.ctx) return
    this.ctx.fillStyle = "#333"
    this.ctx?.clearRect(0, 0, this.size.x, this.size.y)
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

  start() {
    this.status = "running"
    this.rAF = requestAnimationFrame(this.update)
  }

  stop() {
    this.sprites.forEach((s) => {
      if (!s.loop) this.remove(s.id)
    })
    this.status = "idle"
    this.isInitial = true
    this.rAF = 0
    cancelAnimationFrame(this.rAF)
  }
}
