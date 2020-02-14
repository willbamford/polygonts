export const equals = (a: number, b: number, precision: number = 1e-6) => {
  return Math.abs(a - b) < precision
}

export const clamp = (a: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, a))
}
