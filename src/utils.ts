

export function btwn(pMin = 1, pMax = 1_000_000_000){
    pMin = Math.round(pMin);
    pMax = Math.round(pMax);
    if (pMax < pMin) { let t = pMin; pMin = pMax; pMax = t;}
    return Math.floor(Math.random() * (pMax+1 - pMin) + pMin);
}

let count =1
export function createMummy():SpriteInfo {
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
  