import { PMath } from './PMath'

export class Vector2 {
  x: number
  y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y)
  }

  copy(v: Vector2): Vector2 {
    this.x = v.x
    this.y = v.y
    return this
  }

  equals(v: Vector2): boolean {
    return PMath.equals(this.x, v.x) && PMath.equals(this.y, v.y)
  }

  toArray(): [number, number] {
    return [this.x, this.y]
  }

  add(v: Vector2): Vector2 {
    this.x += v.x
    this.y += v.y
    return this
  }

  subtract(v: Vector2): Vector2 {
    this.x -= v.x
    this.y -= v.y
    return this
  }

  multiply(k: number): Vector2 {
    this.x = this.x * k
    this.y = this.y * k
    return this
  }

  distanceTo(v: Vector2): number {
    return Math.sqrt(this.distanceToSquared(v))
  }

  distanceToSquared(v: Vector2): number {
    var dx = v.x - this.x
    var dy = v.y - this.y
    return dx * dx + dy * dy
  }

  magnitude(): number {
    return Math.sqrt(this.magnitudeSquared())
  }

  magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y
  }

  static ZERO = new Vector2(0, 0)
  static ONE = new Vector2(1, 1)
  static X = new Vector2(1, 0)
  static Y = new Vector2(0, 1)
}
