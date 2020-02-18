const DEFAULT_PRECISION = 1e-6

export class PMath {
  static equals = (a: number, b: number, p: number = DEFAULT_PRECISION) => {
    return Math.abs(a - b) < p
  }

  static clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value))
  }
}
