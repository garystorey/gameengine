# Simple TypeScript Game Engine

This was the start of a proof of concept. It isnt ready for prime time.

1. create an animation loop
2. create the game object by passing size, gravity, sprites, etc
3. call `game.start()` to start the loop.


## The Basics

The `Game` class controls the game loop and handles animating the game objects.

First create a new game object.  It expects to be given the following properties:

- `size`: an object containing the x,y coordinates of the left hand corner of the game screen
- `gravity`: an object containing the x,y values for gravity (0,0) will result in no gravity
- `parent`: the parent element to add the game canvas
- `sprites`: an array of `SpriteInfo` definitions
- `loop`: your custom animation loop

**Note**: Both size and gravity expect x/y coordinates.  There is a `Coords` type added for convenience.

```ts
const sprites: SpriteInfo[] = [{
  //...sprite information here
}]

const loop = (time:number) => {
  console.log('game loop logic here')
}

const game = new Game({
  size: {x: 800, y:600},
  gravity: {x:0,y:0},
  parent: document.body,
  loop,
  sprites
});

```

Once your game is initialized, you have the following commands available on the game object:

- `start` = start the game loop
- `stop` = stop the game loop
- `add` = add a new sprite
- `remove` = remove an existing sprite
- `get` = get a sprite by id
- `status` = current status of the gameloop

You also have access to the `gameloop` object and from it you can get the `sprites`. Ex game.gameloop.sprites[0]


A `Sprite` is created for each entry in the `sprites` array. These sprites are based on the `SpriteInfo` type which contains following properties:

- `size`= an x/y value for the height and width of the frame
- `coords` = an x/y value for where to place the sprite on the game screen
- `image` = an object that conatins the `src` of the image and the number of frames in the animations
- `scale` = an x/y value that determines if the sprite is scaled up or down. default: { x: 1, y: 1 }
- `loop` = does the animation loop?
- `animationSpeed` = how many frames to pass before updating the animations,
- `id` = a unique id for the sprite. One will be generated if not supplied by the user.

**Note**: Both size, coords, and gravity expect x/y coordinates. There is a `Coords` ({x:number, y:number}) type added for convenience.

## Example

In the example below, we create 50 sprites that will animate on the screen.
Each loop there is a 10% chance one will be removed.
Once there is only one sprite left, the game ends.

```ts
import { Game, SpriteInfo } from "./game"
import { btwn } from "./utils"

export function createSprite(i: number): SpriteInfo {
  const x = btwn(50, 250)
  return {
    coords: { x: btwn(15, 150), y: btwn(10, 450) },
    scale: { x: 0.25, y: 0.25 },
    loop: true,
    id: `m${i}`,
    animationSpeed: 5,
    image: {
      src: "sprite.png",
      frames: 8,
    },
    size: { x: 50, y: 50 },
    movement: { x: x / 100, y: 0 }, // speed from .5 and 2.5
  }
}


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
  sprites: addSprite(50),
})

game.start()
```
## TODO's

- add multi animation sprites
- add spritesheet and sprite atlas support (stretch goal)
- use and figure out needed improvements
