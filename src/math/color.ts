import { equals, clamp } from './common'

// 0 - 1
type ColorChannel = number

export type Color = {
  r: ColorChannel
  g: ColorChannel
  b: ColorChannel
}

export const colorCreate = (r: number, g: number, b: number): Color => {
  return { r, g, b }
}

export const colorEquals = (a: Color, b: Color): boolean => {
  return equals(a.r, b.r) && equals(a.g, b.g) && equals(a.b, b.b)
}

export const colorAdd = (
  a: Color,
  b: Color,
  out: Color = colorCreate(0, 0, 0),
): Color => {
  out.r = a.r + b.r
  out.g = a.g + b.g
  out.b = a.b + b.b
  return out
}

export const colorSubtract = (
  a: Color,
  b: Color,
  out: Color = colorCreate(0, 0, 0),
): Color => {
  out.r = a.r - b.r
  out.g = a.g - b.g
  out.b = a.b - b.b
  return out
}

export const colorMultiply = (
  a: Color,
  b: Color,
  out: Color = colorCreate(0, 0, 0),
): Color => {
  out.r = a.r * b.r
  out.g = a.g * b.g
  out.b = a.b * b.b
  return out
}

export const colorMultiplyScalar = (
  a: Color,
  v: number,
  out: Color = colorCreate(0, 0, 0),
): Color => {
  out.r = a.r * v
  out.g = a.g * v
  out.b = a.b * v
  return out
}

export const colorClamp = (a: Color, out: Color = colorCreate(0, 0, 0)) => {
  out.r = clamp(a.r, 0.0, 1.0)
  out.g = clamp(a.g, 0.0, 1.0)
  out.b = clamp(a.b, 0.0, 1.0)
  return out
}

export const colorFromHex = (hex: number): Color => {
  const h = Math.floor(hex)
  return {
    r: ((h & 0xff0000) >> 16) / 255,
    g: ((h & 0x00ff00) >> 8) / 255,
    b: (h & 0x0000ff) / 255,
  }
}

export const colorToHex = (a: Color): number => {
  return ((a.r * 255) << 16) ^ ((a.g * 255) << 8) ^ ((a.b * 255) << 0)
}

export const colorToHexString = (a: Color): string => {
  const hex = colorToHex(a)
  return '#' + ('000000' + hex.toString(16)).slice(-6)
}

export const colorRandom = (): Color => {
  return {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  }
}

export const COLOR_BLACK: Color = { r: 0, g: 0, b: 0 }
export const COLOR_WHITE: Color = { r: 1, g: 1, b: 1 }
export const COLOR_RED: Color = { r: 1, g: 0, b: 0 }
export const COLOR_GREEN: Color = { r: 0, g: 1, b: 0 }
export const COLOR_BLUE: Color = { r: 0, g: 0, b: 1 }
export const COLOR_CYAN: Color = { r: 0, g: 1, b: 1 }
export const COLOR_MAGENTA: Color = { r: 1, g: 0, b: 1 }
export const COLOR_YELLOW: Color = { r: 1, g: 1, b: 0 }
