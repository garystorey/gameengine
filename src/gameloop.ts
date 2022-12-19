import { Game } from "./game";
import { Sprite } from "./sprite";

export type LoopFunction = (delta: number, game: Game) => void | (() => void);

export class GameLoop {
  animate: LoopFunction;
  game: Game;

  rAF: number = 0;
  isInitial: boolean = true;
  time: number = 0;
  lastTime: number = 0;
  delta: number = 0;

  sprites: Sprite[] = [];

  constructor(game: Game, animate: LoopFunction) {
    this.game = game;
    this.animate = animate;
    this.update = this.update.bind(this);
    return this;
  }

  start() {
    this.rAF = requestAnimationFrame(this.update);
  }

  add(sprite: Sprite) {
    const els = this.sprites;
    this.sprites = [...els, sprite];
  }
  remove(id: string) {
    this.sprites = this.sprites.filter((s) => s.id === id);
  }

  update(time: number) {
    this.time = time;
    const updated = time - this.lastTime;
    this.delta = this.isInitial || updated >= 2000 ? 0 : updated;
    this.lastTime = time;

    if (this.isInitial) this.isInitial = false;

    this.game.ctx?.clearRect(0, 0, this.game.size.x, this.game.size.y);
    if (this.sprites.length) this.sprites.forEach((i) => i.update());
    this.animate(updated, this.game);

    this.rAF = requestAnimationFrame(this.update);
  }

  stop() {
    cancelAnimationFrame(this.rAF);
    // this.rAF = -1;
  }
}
