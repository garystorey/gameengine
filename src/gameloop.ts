import { Game } from "./game"

export class GameLoop {
  animate: LoopFunction
  game: Game

  rAF: number = 0
  isInitial: boolean = true
  time: number = 0
  lastTime: number = 0
  delta: number = 0

  constructor(game: Game, animate: LoopFunction) {
    this.game = game
    this.animate = animate
    this.update = this.update.bind(this)
    return this
  }

  start() {
    this.rAF = requestAnimationFrame(this.update)
  }

  resetScreen() {
    if (this.game.ctx) {
      this.game.ctx.fillStyle = "#333"
      this.game.ctx?.clearRect(0, 0, this.game.size.x, this.game.size.y)
    }
  }

  private updateTime(time: number) {
    this.time = time
    const updated = time - this.lastTime
    this.delta = this.isInitial || updated >= 2000 ? 0 : updated
    this.lastTime = time
    if (this.isInitial) this.isInitial = false
  }

  private update(time: number) {
    this.updateTime(time)
    this.resetScreen()

    this.game.sprites.forEach((sprite) => sprite.draw())

    this.game.sprites = this.game.sprites.filter((sprite) => !sprite.destroy)
    this.game.sprites.forEach((sprite) => {
      sprite.update()
      sprite.collidesWith = []
      this.game.sprites.forEach((s) => {
        if (s.id !== sprite.id && sprite.checkCollisionWith(s)) {
          sprite.collidesWith.push(s)
        }
      })
    })

    this.animate(this.game)

    if (this.game.status === "running") {
      this.rAF = requestAnimationFrame(this.update)
      return
    }
    this.game.sprites.forEach((sprite) => (sprite.destroy = true))
  }

  stop() {
    this.isInitial = true
    cancelAnimationFrame(this.rAF)
  }
}
