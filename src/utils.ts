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

export function addMummys(num: number) {
  const a = []
  for (let i = 0; i < num; i++) {
    a.push(createMummy(i))
  }
  return a
}

export function createMummy(i: number): SpriteInfo {
  const x = btwn(50, 250)
  return {
    coords: { x: btwn(15, 150), y: btwn(10, 450) },
    scale: { x: 0.25, y: 0.25 },
    loop: true,
    id: `m${i}`,
    animationSpeed: 5,
    image: {
      src: "mummy.png",
      frames: 32,
    },
    size: { x: 50, y: 50 },
    movement: { x: x / 100, y: 0 },
  }
}
