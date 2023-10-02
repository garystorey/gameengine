import { SimpleSprite } from "./simplesprite"

export class BaseSprite extends SimpleSprite {
  currentFrame: number = 0
  image: HTMLImageElement
  totalFrames: number = 1
  elapsedFrames: number = 0
  loaded: boolean = false

  constructor({
    game,
    size = { x: 50, y: 50 },
    coords = { x: 0, y: 0 },
    image = {
      src: "",
      frames: 1,
    },
    scale = { x: 1, y: 1 },
    loop = true,
    animationSpeed = 1,
    id,
    type,
    visible = true,
  }: BaseSpriteProps) {
    super({ game, size, coords, scale, loop, animationSpeed, id, type, visible })
    this.image = new Image()
    this.image.src = image.src
    this.image.onload = () => {
      this.loaded = true
    }

    this.totalFrames = image.frames
    this.currentFrame = 0
    this.elapsedFrames = 0
  }

  draw() {
    if (!this.loaded) return
    if (!this.visible) return
    if (this.game.status !== "running") return
    const frameSize = this.image.width / this.totalFrames
    const ctx = this.game.ctx as CanvasRenderingContext2D

    ctx.drawImage(
      this.image,
      this.currentFrame * frameSize,
      0,
      frameSize,
      this.image.height,
      this.coords.x,
      this.coords.y,
      frameSize * this.scale.x,
      this.image.height * this.scale.y
    )
  }

  update() {
    this.elapsedFrames++

    if (this.elapsedFrames >= this.animationSpeed) {
      this.currentFrame++
    }
    if (this.elapsedFrames >= this.animationSpeed) {
      this.elapsedFrames = 0
    }
    if (this.currentFrame >= this.totalFrames) {
      this.currentFrame = 0
      if (!this.loop) {
        this.destroy = true
        this.visible = false
      }
    }
    if (this.currentFrame >= this.totalFrames && this.loop) {
      this.currentFrame = 0
    }
  }
}

export class Sprite extends BaseSprite {
  movement: Coords
  collidesWith: Sprite[] = []

  constructor({
    game,
    size = { x: 50, y: 50 },
    coords = { x: 0, y: 0 },
    movement = { x: 0, y: 0 },
    image = {
      src: "",
      frames: 1,
    },
    scale = { x: 1, y: 1 },
    loop = true,
    animationSpeed = 1,
    id,
    type,
    visible = true,
  }: SpriteProps) {
    super({ game, size, coords, image, loop, scale, animationSpeed, id, type, visible })
    this.movement = movement
  }

  update() {
    if (!this.visible) return
    super.update()

    //move them based on their movement values
    this.coords.x += this.movement.x + this.game.gravity.x
    this.coords.y += this.movement.y + this.game.gravity.y

    this.bounds = {
      top: { x: this.coords.x, y: this.coords.y },
      right: { x: this.coords.x + this.size.x * this.scale.x, y: this.coords.y },
      bottom: { x: this.coords.x + this.size.x * this.scale.x, y: this.coords.y + this.size.y * this.scale.y },
      left: { x: this.coords.x, y: this.coords.y + this.size.y * this.scale.y },
    }

    this.center.x = this.coords.x + (this.size.x / 2) * this.scale.x
    this.center.y = this.coords.y + (this.size.y / 2) * this.scale.y
  }

  checkCollisionWith(sprite: Sprite) {
    if (!this.visible) return
    if (
      this.bounds.left.x <= sprite.bounds.right.x &&
      this.bounds.right.x >= sprite.bounds.left.x &&
      this.bounds.top.y <= sprite.bounds.bottom.y &&
      this.bounds.bottom.y >= sprite.bounds.top.y
    ) {
      this.collidesWith.push(sprite)
      return true
    }
    return false
  }
}
