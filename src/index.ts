import { Game } from "./game"
import { addSprites, btwn, createExplosion } from "./utils"

const animate = (game: Game) => {
  game.sprites.forEach((sprite) => {
    // if they have moved off of the canvas in X direction, move to the other side
    if (sprite.bounds.right.x >= sprite.game.size.x) {
      sprite.coords.x = -1.25 * sprite.scale.x * sprite.size.x
    }
    // if they have moved off of the canvas in Y direction, stop them
    if (sprite.bounds.bottom.y >= sprite.game.size.y - sprite.size.y) {
      sprite.coords.y = -1.25 * sprite.scale.y * sprite.size.y
      sprite.movement.y = -1
    }
    if (sprite.collidesWith.length) {
      // console.log(`${sprite.id} collides with ${sprite.collidesWith.map((s) => s.id).join(", ")}`)
    }
  })

  const chance = btwn(1, 100)
  if (chance > 99) {
    const sprites = game.getAllByType("sprite")
    const sprite = sprites[Math.floor(Math.random() * sprites.length)]
    game.add([createExplosion(sprite)])
    game.remove(sprite.id)
  }

  if (game.sprites.length === 1) {
    game.stop()
    return
  }
}

const game = new Game({
  size: { x: 800, y: 600 },
  gravity: { x: 0, y: 0 },
  parent: document.body,
  animate,
  sprites: addSprites(btwn(5, 10)),
})

game.start()

setTimeout(() => {
  game.stop()
  game.debug()
}, 600000)
