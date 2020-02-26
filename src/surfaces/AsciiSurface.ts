import { Surface } from './Surface'
import { CanvasSurface } from './CanvasSurface'
import { Vector3, Color } from '../math'

type PaletteItem = { i: number; c: string; v: number }

const createAsciiPalette = (): PaletteItem[][] => {
  const canvas = document.createElement('canvas')
  canvas.width = 3200
  canvas.height = 32
  canvas.setAttribute('style', 'width: 1600px; height: 16px')

  const g = canvas.getContext('2d')

  const fontSize = 32
  const numChars = 95
  const asciiOffset = 32
  g.textAlign = 'center'
  g.textBaseline = 'middle'

  for (let i = 0; i < numChars; i += 1) {
    const char = String.fromCharCode(i + asciiOffset)
    g.fillStyle = 'black'
    g.font = `bold ${fontSize + 0}px monospace`
    g.fillText(char, i * fontSize + fontSize * 0.5, fontSize * 0.5)

    // g.fillStyle = 'red'
    // g.strokeRect(i * fontSize, 0, fontSize, fontSize)
  }

  const charL = (i: number) => {
    let v = 0
    const imageData = g.getImageData(i * fontSize, 0, fontSize, fontSize)
    for (let i = 0; i < fontSize * fontSize; i += 1) {
      const r = imageData.data[i * 4 + 0]
      const g = imageData.data[i * 4 + 1]
      const b = imageData.data[i * 4 + 2]
      const a = imageData.data[i * 4 + 3]
      v += a
    }
    return v / (imageData.width * imageData.height)
  }

  const results: PaletteItem[] = []
  for (let i = 0; i < numChars; i += 1) {
    results.push({ i, c: String.fromCharCode(i + asciiOffset), v: charL(i) })
  }

  const sorted = results.sort((a, b) => {
    return a.v - b.v
  })

  const palette: PaletteItem[][] = []
  sorted.forEach(s => {
    const idx = Math.round(s.v) >> 2
    if (!palette[idx]) {
      palette[idx] = []
    }

    palette[idx].push(s)
  })

  console.log(palette)
  return palette
}

type AsciiSurfaceParams = {
  container: HTMLElement
  width: number
  height: number
}

export class AsciiSurface implements Surface {
  width: number
  height: number
  cx: number
  cy: number

  container: HTMLElement
  canvasSurface: CanvasSurface

  asciiContainer: HTMLDivElement
  asciiPalette: PaletteItem[][]

  constructor(opts: AsciiSurfaceParams) {
    this.width = opts.width
    this.height = opts.height

    const canvasContainer = document.createElement('div')
    this.canvasSurface = new CanvasSurface({
      container: canvasContainer,
      width: opts.width,
      height: opts.height,
    })

    this.container = opts.container
    this.asciiPalette = createAsciiPalette()

    this.asciiContainer = document.createElement('div')

    const style = [
      'font-family: monospace',
      'font-weight: bold',
      'font-size: 8px',
      'line-height: 1',
      'white-space: pre',
    ]

    this.asciiContainer.setAttribute('style', style.join(';'))
    this.container.appendChild(this.asciiContainer)
  }

  clear(): void {
    this.canvasSurface.clear()
  }

  polygon(points: Vector3[], color: Color): void {
    this.canvasSurface.polygon(points, color)
  }

  line(from: Vector3, to: Vector3, color: Color): void {
    this.canvasSurface.line(from, to, color)
  }

  render(): void {
    const palette = this.asciiPalette
    const imageData = this.canvasSurface.getImageData()
    let i = 0
    let s = ''
    for (let y = 0; y < imageData.height; y += 1) {
      for (let x = 0; x < imageData.width; x += 1) {
        const r = imageData.data[i * 4 + 0]
        const g = imageData.data[i * 4 + 1]
        const b = imageData.data[i * 4 + 2]
        // const a = imageData.data[i * 4 + 3]

        const v = (r + g + b) / (3 * 255)
        const idx = Math.floor(v * (palette.length - 1))
        const chars = palette[idx]
        s += chars[Math.floor(Math.random() * chars.length)].c
        // s += chars[0].c
        i += 1
      }
      s += '\n'
    }
    this.asciiContainer.innerText = s
  }
}
