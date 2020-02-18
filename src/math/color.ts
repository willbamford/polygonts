import { PMath } from './PMath'

export class Color {
  r: number
  g: number
  b: number

  constructor({ r, g, b }: { r: number; g: number; b: number }) {
    this.r = r
    this.g = g
    this.b = b
  }

  equals(color: Color) {
    return (
      PMath.equals(this.r, color.r) &&
      PMath.equals(this.g, color.g) &&
      PMath.equals(this.b, color.b)
    )
  }

  clone() {
    return new Color({ r: this.r, g: this.g, b: this.b })
  }

  copy(color: Color) {
    this.r = color.r
    this.g = color.g
    this.b = color.b
    return this
  }

  add(color: Color) {
    this.r += color.r
    this.g += color.g
    this.b += color.b
    return this
  }

  subtract(color: Color) {
    this.r -= color.r
    this.g -= color.g
    this.b -= color.b
    return this
  }

  multiply(color: Color) {
    this.r *= color.r
    this.g *= color.g
    this.b *= color.b
    return this
  }

  multiplyScalar(k: number) {
    this.r *= k
    this.g *= k
    this.b *= k
    return this
  }

  clamp() {
    this.r = PMath.clamp(this.r, 0.0, 1.0)
    this.g = PMath.clamp(this.g, 0.0, 1.0)
    this.b = PMath.clamp(this.b, 0.0, 1.0)
    return this
  }

  setRGB(r: number, g: number, b: number) {
    this.r = r
    this.g = g
    this.b = b
    return this
  }

  getHex() {
    return (
      ((this.r * 255) << 16) ^ ((this.g * 255) << 8) ^ ((this.b * 255) << 0)
    )
  }

  setHex(hex: number) {
    const h = Math.floor(hex)
    this.r = ((h & 0xff0000) >> 16) / 255
    this.g = ((h & 0x00ff00) >> 8) / 255
    this.b = (h & 0x0000ff) / 255
    return this
  }

  getHexStyle() {
    return '#' + ('000000' + this.getHex().toString(16)).slice(-6)
  }

  randomise() {
    this.r = Math.random()
    this.g = Math.random()
    this.b = Math.random()
    return this
  }

  static BLACK = new Color({ r: 0, g: 0, b: 0 })
  static WHITE = new Color({ r: 1, g: 1, b: 1 })
  static RED = new Color({ r: 1, g: 0, b: 0 })
  static GREEN = new Color({ r: 0, g: 1, b: 0 })
  static BLUE = new Color({ r: 0, g: 0, b: 1 })
  static CYAN = new Color({ r: 0, g: 1, b: 1 })
  static MAGENTA = new Color({ r: 1, g: 0, b: 1 })
  static YELLOW = new Color({ r: 1, g: 1, b: 0 })
}
