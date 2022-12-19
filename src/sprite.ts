import { Game } from "./game";
import { nanoid } from "nanoid";

export class Sprite {
  id: string;
  coords: Coords;
  size: Coords;
  movement: Coords;
  game: Game;

  constructor({
    game,
    size = { x: 50, y: 50 },
    coords = { x: 0, y: 0 },
    movement = { x: 0, y: 0 },
  }: SpriteProps) {
    this.id = nanoid();
    this.game = game;
    this.coords = coords;
    this.size = size;
    this.movement = movement;
  }

  draw() {
    const ctx = this.game.ctx as CanvasRenderingContext2D;
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(this.coords.x, this.coords.y, this.size.x, this.size.y);
  }

  update() {
    // they dont have movement
    if (this.movement.x === 0 && this.movement.y === 0) {
      this.draw();
      return;
    }

    //move them based on their movement values
    this.coords.x += this.movement.x + this.game.gravity.x;
    this.coords.y += this.movement.y + this.game.gravity.y;

    // if they have moved off of the canvas in X direction, REMOVE them
    if (this.coords.x + this.size.x >= this.game.size.x) {
      this.game.remove(this.id);
    }
    // if they have moved off of the canvas in Y direction, stop them
    if (this.coords.y >= this.game.size.y - this.size.y) {
      this.movement.y = 0;
      //could also wrap around instead
      //this.coords.y = -1 * this.size.y;
    }
    this.draw();
  }
}
