# Simple TypeScript Game Engine

This was the start of a proof of concept. It isnt ready for prime time.

1. create an animation loop
2. create the game objects by passing size, gravity, sprites, etc
3. call `game.start()` to start the loop.

In this example, we create 50 sprites that will animate on the screen.
Each loop there is a 10% chance one will be removed.
Once there is only one sprite left, the game ends.

```ts
import { Game } from "./game"
import { addSprite, btwn } from "./utils"


const animate = () => {
  if (game.gameloop.sprites.length === 1) {
    game.stop()
    return
  }
  const chance = btwn(1, 100)
  const val = btwn(1, 50)
  if (chance > 90) game.remove(`m${val}`)
}

const game = new Game({
  size: { x: 800, y: 600 },
  gravity: { x: 0, y: 0 },
  parent: document.body,
  animate,
  sprites: addSpirte(50),
})

game.start()
```
