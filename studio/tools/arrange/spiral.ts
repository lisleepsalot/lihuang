// Same walk as generateSpiralCoordinates() in js/display-view.js: start at the
// centre, then right, up, left, down with the run length growing every two
// turns. Keep the two in sync or the Arrange tab will stop matching the site.
export function spiralCoordinates(count: number): {x: number; y: number}[] {
  const coords: {x: number; y: number}[] = []
  if (count <= 0) return coords

  let x = 0
  let y = 0
  coords.push({x, y})

  let steps = 1
  let direction = 0 // 0: right, 1: up, 2: left, 3: down

  while (coords.length < count) {
    for (let turn = 0; turn < 2 && coords.length < count; turn++) {
      for (let i = 0; i < steps && coords.length < count; i++) {
        if (direction === 0) x++
        else if (direction === 1) y--
        else if (direction === 2) x--
        else y++
        coords.push({x, y})
      }
      direction = (direction + 1) % 4
    }
    steps++
  }

  return coords
}
