import { Game } from "./game"
import { btwn, createMummy } from "./utils"

const body = document.body

const animate = () => {
  if (game.gameloop.sprites.length === 1) {
    game.stop()
    game.gameloop.stop()
    return
  }
  const chance = btwn(1, 100)
  const val = btwn(1, 50)
  if (chance > 90) game.remove(`m${val}`)
}

const game = new Game({
  size: { x: 800, y: 600 },
  gravity: { x: 0, y: 0 },
  parent: body,
  animate,
  sprites: [
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
    createMummy(),
  ],
})

const button = document.createElement("button")

const handleButtonClick = (e: Event) => {
  e.preventDefault()
  if (game.status === "running") {
    game.stop()
  } else {
    game.start()
  }
  button.innerText = game.status === "running" ? "Stop" : "Start"
}

button.setAttribute("type", "button")
button.style.position = "absolute"
button.style.top = `50px`
button.style.right = `50%`

button.addEventListener("click", handleButtonClick)
body.appendChild(button)

button.innerText = "Stop"
game.start()
