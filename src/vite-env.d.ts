/// <reference types="vite/client" />

type Coords = {
    x: number,
    y:number,
}

type SpriteProps = {
    game: Game;
    coords: Coords;
    size: Coords;
    movement?: Coords;
  };
  
type SpriteInfo = Omit<SpriteProps,'game'>
  