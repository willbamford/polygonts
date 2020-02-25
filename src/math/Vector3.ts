import { PMath } from './PMath'
import { Matrix4 } from './Matrix4'

export class Vector3 {
  x: number
  y: number
  z: number

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  static createFromArray = (arr: [number, number, number]) => {
    return new Vector3(arr[0], arr[1], arr[2])
  }

  static createFromArrays = (ia: [number, number, number][]): Vector3[] => {
    const oa: Vector3[] = []
    if (ia) {
      const len = ia.length
      for (let i = 0; i < len; i += 1) {
        const a = ia[i]
        oa.push(new Vector3(a[0], a[1], a[2]))
      }
    }
    return oa
  }

  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z)
  }

  copy(v: Vector3): Vector3 {
    this.x = v.x
    this.y = v.y
    this.z = v.z
    return this
  }

  equals(v: Vector3): boolean {
    return (
      PMath.equals(this.x, v.x) &&
      PMath.equals(this.y, v.y) &&
      PMath.equals(this.z, v.z)
    )
  }

  toArray(): [number, number, number] {
    return [this.x, this.y, this.z]
  }

  set(x: number, y: number, z: number): Vector3 {
    this.x = x
    this.y = y
    this.z = z
    return this
  }

  setScalar(k: number): Vector3 {
    this.x = k
    this.y = k
    this.z = k
    return this
  }

  add(v: Vector3): Vector3 {
    this.x += v.x
    this.y += v.y
    this.z += v.z
    return this
  }

  subtract(v: Vector3): Vector3 {
    this.x -= v.x
    this.y -= v.y
    this.z -= v.z
    return this
  }

  multiply(k: number): Vector3 {
    this.x *= k
    this.y *= k
    this.z *= k
    return this
  }

  distanceTo(v: Vector3): number {
    return Math.sqrt(this.distanceToSquared(v))
  }

  distanceToSquared(v: Vector3): number {
    const dx = v.x - this.x
    const dy = v.y - this.y
    const dz = v.z - this.z
    return dx * dx + dy * dy + dz * dz
  }

  magnitude(): number {
    return Math.sqrt(this.magnitudeSquared())
  }

  magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }

  crossProduct(v: Vector3): Vector3 {
    const x = this.x
    const y = this.y
    const z = this.z
    this.x = y * v.z - z * v.y
    this.y = z * v.x - x * v.z
    this.z = x * v.y - y * v.x
    return this
  }

  dotProduct(v: Vector3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  normalise(): Vector3 {
    const mag = this.magnitude()
    if (mag !== 0) {
      this.x /= mag
      this.y /= mag
      this.z /= mag
    }
    return this
  }

  normal(v: Vector3): Vector3 {
    return this.crossProduct(v).normalise()
  }

  applyMatrix4(m: Matrix4): Vector3 {
    const x = this.x
    const y = this.y
    const z = this.z
    this.x = x * m.a + y * m.b + z * m.c
    this.y = x * m.e + y * m.f + z * m.g
    this.z = x * m.i + y * m.j + z * m.k
    return this
  }

  applyProjection(m: Matrix4): Vector3 {
    const x = this.x
    const y = this.y
    const z = this.z
    this.x = x * m.a + y * m.b + z * m.c + m.d
    this.y = x * m.e + y * m.f + z * m.g + m.h
    this.z = x * m.i + y * m.j + z * m.k + m.l
    const vw = x * m.m + y * m.n + z * m.o + m.p
    if (vw !== 0 && vw !== 1) {
      this.x /= vw
      this.y /= vw
      this.z /= vw
    }
    return this
  }

  applyPosition(m: Matrix4): Vector3 {
    this.x = m.d
    this.y = m.h
    this.z = m.l
    return this
  }

  center(vectors: Vector3[]): Vector3 {
    let ax = 0
    let ay = 0
    let az = 0

    if (vectors) {
      const len = vectors.length
      let i = len
      while (--i >= 0) {
        const v = vectors[i]
        ax += v.x
        ay += v.y
        az += v.z
      }
      this.x = ax / len
      this.y = ay / len
      this.z = az / len
    }
    return this
  }

  normalFromPositionVectors(a: Vector3, b: Vector3, c: Vector3): Vector3 {
    const ba = new Vector3(0, 0, 0)
    const ca = new Vector3(0, 0, 0)
    ba.copy(a).subtract(b)
    ca.copy(a).subtract(c)
    return this.copy(ba).normal(ca)
  }

  reflect(normal: Vector3): Vector3 {
    const v = new Vector3(0, 0, 0)
    // http://math.stackexchange.com/a/13263
    return this.subtract(v.copy(normal).multiply(2 * this.dotProduct(normal)))
  }

  static ZERO = new Vector3(0, 0, 0)
  static ONE = new Vector3(1, 1, 1)
  static X = new Vector3(1, 0, 0)
  static Y = new Vector3(0, 1, 0)
  static Z = new Vector3(0, 0, 1)
  static UP = new Vector3(0, 1, 0)
  static DOWN = new Vector3(0, -1, 0)
  static FORWARD = new Vector3(0, 0, -1)
  static BACK = new Vector3(0, 0, 1)
  static RIGHT = new Vector3(1, 0, 0)
  static LEFT = new Vector3(-1, 0, 0)
}
