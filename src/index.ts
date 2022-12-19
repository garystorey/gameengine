import { Game } from "./game";

const sprites: SpriteInfo[] = [
  {
    size: { x: 50,y: 50 },
    coords: { x: 20, y: 0 },
    movement: { x: 0, y: 5 },
  },
  {
    size: { y: 50, x: 50 },
    coords: { x: 300, y: 550 },
    movement: { x: 0, y: 0 },
  },
];

const body = document.body;

const game = new Game({
  size: { x: 400, y: 600 },
  gravity: { x: 0, y: 0 },
  parent: body,
  sprites,
});

const button = document.createElement("button");

const handleButtonClick = (e: Event) => {
  e.preventDefault();
  if (game.status==='running') {
    game.stop();
  } else {
    game.start();
  }
  button.innerText = game.status==='running' ? "Stop" : "Start";
};

button.setAttribute("type", "button");
button.style.position = 'absolute'
button.style.top = `50px`
button.style.right = `50%`


button.addEventListener("click", handleButtonClick);
body.appendChild(button);

button.innerText = "Start";

game.start();