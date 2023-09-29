import { Sprite } from "./sprite"

export function btwn(pMin = 1, pMax = 1_000_000_000) {
  pMin = Math.round(pMin)
  pMax = Math.round(pMax)
  if (pMax < pMin) {
    let t = pMin
    pMin = pMax
    pMax = t
  }
  return Math.floor(Math.random() * (pMax + 1 - pMin) + pMin)
}

export function addSprites(num: number) {
  const a = []
  for (let i = 0; i < num; i++) {
    a.push(createSprite(i))
  }
  return a
}

export function createSprite(i: number): SpriteInfo {
  const x = btwn(2, 4)
  const type = btwn(0, 1) === 0 ? "zombie" : "robot"
  const scale = btwn(0.75, 1.5)
  return {
    coords: { x: btwn(15, 150), y: btwn(10, 450) },
    scale: { x: scale, y: scale },
    loop: true,
    type: "sprite",
    id: `sprite-${i}`,
    animationSpeed: 4,
    image: {
      src: `${type}.png`,
      frames: 8,
    },
    size: { x: 50, y: 50 },
    movement: { x: x, y: 0 },
  }
}

export function createExplosion(sprite: Sprite): SpriteInfo {
  return {
    ...sprite,
    size: { x: 50, y: 50 },
    coords: { x: sprite.center.x + 25 * sprite.scale.x, y: sprite.center.y + 25 * sprite.scale.y },
    movement: { x: 0, y: 0 },
    loop: false,
    type: "explosion",
    id: `explosion-for-${sprite.id}`,
    animationSpeed: 4,
    image: {
      src: `explosion.png`,
      frames: 10,
    },
  }
}
