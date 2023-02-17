import { Game } from "./game"
import { addMummys, btwn } from "./utils"

const animate = () => {
  if (game.gameloop.sprites.length === 1) {
    game.stop()
    return
  }
  const chance = btwn(1, 100)
  const val = btwn(1, 50)
  // this is not very efficient but thats not the point
  if (chance > 90) game.remove(`m${val}`)
}

const game = new Game({
  size: { x: 800, y: 600 },
  gravity: { x: 0, y: 0 },
  parent: document.body,
  animate,
  sprites: addMummys(5),
})

game.start()
