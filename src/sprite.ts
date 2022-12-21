import { SimpleSprite } from "./simplesprite"

export class BaseSprite extends SimpleSprite {
  currentFrame: number = 0
  image: HTMLImageElement
  totalFrames: number = 1
  elapsedFrames: number = 0

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
  }: BaseSpriteProps) {
    super({ game, size, coords, scale, loop, animationSpeed, id })
    this.image = new Image()
    this.image.src = image.src
    this.totalFrames = image.frames
    this.currentFrame = 0
    this.elapsedFrames = 0
  }

  draw() {
    if (this.game.status !== "running") return
    const frameSize = this.image.width / this.totalFrames
    const ctx = this.game.ctx as CanvasRenderingContext2D
    if (this.elapsedFrames >= this.animationSpeed) {
      this.elapsedFrames = 0
    }
   
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
    this.draw()
    this.elapsedFrames++

    if (this.elapsedFrames >= this.animationSpeed) {
      this.currentFrame++
    }
    if (this.currentFrame >= this.totalFrames && this.loop) {
      this.currentFrame = 0
    }
  }
}

export class Sprite extends BaseSprite {
  movement: Coords

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
  }: SpriteProps) {
    super({ game, size, coords, image, loop, scale, animationSpeed, id })
    this.movement = movement
  }

  update() {
    super.update()

    //move them based on their movement values
    this.coords.x += this.movement.x + this.game.gravity.x
    this.coords.y += this.movement.y + this.game.gravity.y

    this.bounds = {
      top: { x: this.coords.x, y: this.coords.y },
      right: { x: this.coords.x + this.size.x, y: this.coords.y },
      bottom: { x: this.coords.x + this.size.x, y: this.coords.y + this.size.y },
      left: { x: this.coords.x, y: this.coords.y + this.size.y },
    }

    // if they have moved off of the canvas in X direction, REMOVE them
    if (this.bounds.right.x >= this.game.size.x) {
      this.coords.x = -1.5 * this.size.x
    }
    // if they have moved off of the canvas in Y direction, stop them
    if (this.bounds.bottom.y >= this.game.size.y - this.size.y) {
      // this.movement.y = 0;
      //could also wrap around instead
    }
  }
}
