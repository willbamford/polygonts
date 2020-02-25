import { PMath } from './PMath'
import { Vector3 } from './Vector3'

type Matrix3Arrays = [
  [number, number, number],
  [number, number, number],
  [number, number, number],
]

const IDENTITY: Matrix3Arrays = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
]

export class Matrix3 {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
  g: number
  h: number
  i: number

  constructor(a: Matrix3Arrays = IDENTITY) {
    this.a = a[0][0]
    this.b = a[0][1]
    this.c = a[0][2]
    this.d = a[1][0]
    this.e = a[1][1]
    this.f = a[1][2]
    this.g = a[2][0]
    this.h = a[2][1]
    this.i = a[2][2]
  }

  clone() {
    return new Matrix3(this.toArrays())
  }

  copy(m: Matrix3) {
    this.a = m.a
    this.b = m.b
    this.c = m.c
    this.d = m.d
    this.e = m.e
    this.f = m.f
    this.g = m.g
    this.h = m.h
    this.i = m.i
  }

  toString(): string {
    let s = ''
    this.toArrays().forEach(function(row) {
      s += row.join(', ') + '\n'
    })
    return s
  }

  toArrays(): Matrix3Arrays {
    return [
      [this.a, this.b, this.c],
      [this.d, this.e, this.f],
      [this.g, this.h, this.i],
    ]
  }

  equals(m: Matrix3): boolean {
    return (
      PMath.equals(this.a, m.a) &&
      PMath.equals(this.b, m.b) &&
      PMath.equals(this.c, m.c) &&
      PMath.equals(this.d, m.d) &&
      PMath.equals(this.e, m.e) &&
      PMath.equals(this.f, m.f) &&
      PMath.equals(this.g, m.g) &&
      PMath.equals(this.h, m.h) &&
      PMath.equals(this.i, m.i)
    )
  }

  multiply(m: Matrix3): Matrix3 {
    const p = new Matrix3()
    const t = this

    p.a = t.a * m.a + t.b * m.d + t.c * m.g
    p.b = t.a * m.b + t.b * m.e + t.c * m.h
    p.c = t.a * m.c + t.b * m.f + t.c * m.i

    p.d = t.d * m.a + t.e * m.d + t.f * m.g
    p.e = t.d * m.b + t.e * m.e + t.f * m.h
    p.f = t.d * m.c + t.e * m.f + t.f * m.i

    p.g = t.g * m.a + t.h * m.d + t.i * m.g
    p.h = t.g * m.b + t.h * m.e + t.i * m.h
    p.i = t.g * m.c + t.h * m.f + t.i * m.i

    return p
  }

  multiplyVector(v: Vector3): Vector3 {
    const t = this
    const x = v.x * t.a + v.y * t.b + v.z * t.c
    const y = v.x * t.d + v.y * t.e + v.z * t.f
    const z = v.x * t.g + v.y * t.h + v.z * t.i
    return new Vector3(x, y, z)
  }

  inverse(): Matrix3 | null {
    const t = this
    const m = new Matrix3()

    const det =
      t.a * (t.e * t.i - t.h * t.f) -
      t.b * (t.d * t.i - t.f * t.g) +
      t.c * (t.d * t.h - t.e * t.g)

    if (det === 0) return null

    const idet = 1 / det
    m.a = (t.e * t.i - t.h * t.f) * idet
    m.b = (t.c * t.h - t.b * t.i) * idet
    m.c = (t.b * t.f - t.c * t.e) * idet
    m.d = (t.f * t.g - t.d * t.i) * idet
    m.e = (t.a * t.i - t.c * t.g) * idet
    m.f = (t.d * t.c - t.a * t.f) * idet
    m.g = (t.d * t.h - t.g * t.e) * idet
    m.h = (t.g * t.b - t.a * t.h) * idet
    m.i = (t.a * t.e - t.d * t.b) * idet

    return m
  }

  tranpose(): Matrix3 {
    const t = this
    const m = t.clone()
    m.b = t.d
    m.d = t.b
    m.c = t.g
    m.g = t.c
    m.f = t.h
    m.h = t.f
    return m
  }

  setRotationX(ax: number): Matrix3 {
    const c = Math.cos(ax)
    const s = Math.sin(ax)
    this.a = 1
    this.b = 0
    this.c = 0
    this.d = 0
    this.e = c
    this.f = -s
    this.g = 0
    this.h = s
    this.i = c
    return this
  }

  setRotationY(ay: number): Matrix3 {
    const c = Math.cos(ay)
    const s = Math.sin(ay)
    this.a = c
    this.b = 0
    this.c = s
    this.d = 0
    this.e = 1
    this.f = 0
    this.g = -s
    this.h = 0
    this.i = c
    return this
  }

  setRotationZ(az: number): Matrix3 {
    const c = Math.cos(az)
    const s = Math.sin(az)
    this.a = c
    this.b = -s
    this.c = 0
    this.d = s
    this.e = c
    this.f = 0
    this.g = 0
    this.h = 0
    this.i = 1
    return this
  }

  setRotation(ax: number, ay: number, az: number): Matrix3 {
    const x = Matrix3.identity().setRotationX(ax)
    const y = Matrix3.identity().setRotationY(ay)
    const z = Matrix3.identity().setRotationZ(az)
    this.copy(x.multiply(y).multiply(z))
    return this
  }

  rotateX(ax: number): Matrix3 {
    const v = Matrix3.IDENTITY.clone()
    this.copy(this.multiply(v.setRotationX(ax)))
    return this
  }

  static identity(): Matrix3 {
    return Matrix3.IDENTITY.clone()
  }

  static IDENTITY = new Matrix3(IDENTITY)
}
