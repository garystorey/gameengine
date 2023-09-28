import { Game } from "./game"
import { addSprites, btwn } from "./utils"

const animate = (_delta: number, game: Game) => {
  if (game.sprites.length === 1) {
    game.stop()
    return
  }
  const chance = btwn(1, 100)
  if (chance > 90) {
    game.remove(game.sprites[btwn(0, game.sprites.length - 1)].id)
  }
}

const game = new Game({
  size: { x: 800, y: 600 },
  gravity: { x: 0, y: 0 },
  parent: document.body,
  animate,
  sprites: addSprites(btwn(100, 500)),
})

game.start()

setTimeout(() => {
  game.stop()
}, 600000)
