import { Game } from "./game"

const body = document.body

function btwn(pMin = 1, pMax = 1_000_000_000){
    pMin = Math.round(pMin);
    pMax = Math.round(pMax);
    if (pMax < pMin) { let t = pMin; pMin = pMax; pMax = t;}
    return Math.floor(Math.random() * (pMax+1 - pMin) + pMin);
}

let count =1
function createMummy():SpriteInfo {
  const x = btwn(50,250)
  return {
    coords: {x:btwn(15,150),y:btwn(10,450)},
    scale:{ x:.25,y:.25},
    loop:true,
    id:`m${count++}`,
    animationSpeed: 1,
    image: {
      src: "mummy.png",
      frames:32,
    },
    size: {x:50,y:50},
    movement: {x:x/100,y:0}
  }
}


const animate = (_:number, game:Game) => {
  const chance = btwn(1,100)
  const val = btwn(1,50)
  if (chance >90) game.remove(`m${val}`)
  if (game.gameloop.sprites.length===1) {
    game.stop()
    console.log('should have stopped but im guessing it didnt')
  }
}

const game = new Game({
  size: { x: 800, y: 600 },
  gravity: { x: 0, y: 0 },
  parent: body,
  sprites : [
    createMummy(),createMummy(),createMummy(),createMummy(),createMummy(),
    createMummy(),createMummy(),createMummy(),createMummy(),createMummy(),
    createMummy(),createMummy(),createMummy(),createMummy(),createMummy(),
    createMummy(),createMummy(),createMummy(),createMummy(),createMummy(),
    // createMummy(),createMummy(),createMummy(),createMummy(),createMummy(),
    // createMummy(),createMummy(),createMummy(),createMummy(),createMummy(),
    // createMummy(),createMummy(),createMummy(),createMummy(),createMummy(),
    // createMummy(),createMummy(),createMummy(),createMummy(),createMummy(),
    // createMummy(),createMummy(),createMummy(),createMummy(),createMummy(),
    // createMummy(),createMummy(),createMummy(),createMummy(),createMummy()
  ]
})

// setInterval(()=>{
//   game.debug()
// }, 5000)


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

button.innerText ="Stop"
game.start()