import { PMath } from './PMath'
import { Vector3 } from './Vector3'
import { Matrix3 } from './Matrix3'

type Matrix4Arrays = [
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number],
]

const IDENTITY: Matrix4Arrays = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
]

export class Matrix4 {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
  g: number
  h: number
  i: number
  j: number
  k: number
  l: number
  m: number
  n: number
  o: number
  p: number

  constructor(a: Matrix4Arrays = IDENTITY) {
    const t = this
    t.a = a[0][0]
    t.b = a[0][1]
    t.c = a[0][2]
    t.d = a[0][3]
    t.e = a[1][0]
    t.f = a[1][1]
    t.g = a[1][2]
    t.h = a[1][3]
    t.i = a[2][0]
    t.j = a[2][1]
    t.k = a[2][2]
    t.l = a[2][3]
    t.m = a[3][0]
    t.n = a[3][1]
    t.o = a[3][2]
    t.p = a[3][3]
  }

  toArrays(): Matrix4Arrays {
    return [
      [this.a, this.b, this.c, this.d],
      [this.e, this.f, this.g, this.h],
      [this.i, this.j, this.k, this.l],
      [this.m, this.n, this.o, this.p],
    ]
  }

  toString() {
    let s = ''
    this.toArrays().forEach(function(row) {
      s += row.join(', ') + '\n'
    })
    return s
  }

  clone() {
    return new Matrix4(this.toArrays())
  }

  copy(m: Matrix4): Matrix4 {
    this.a = m.a
    this.b = m.b
    this.c = m.c
    this.d = m.d
    this.e = m.e
    this.f = m.f
    this.g = m.g
    this.h = m.h
    this.i = m.i
    this.j = m.j
    this.k = m.k
    this.l = m.l
    this.m = m.m
    this.n = m.n
    this.o = m.o
    this.p = m.p
    return this
  }

  equals(m: Matrix4) {
    return (
      PMath.equals(this.a, m.a) &&
      PMath.equals(this.b, m.b) &&
      PMath.equals(this.c, m.c) &&
      PMath.equals(this.d, m.d) &&
      PMath.equals(this.e, m.e) &&
      PMath.equals(this.f, m.f) &&
      PMath.equals(this.g, m.g) &&
      PMath.equals(this.h, m.h) &&
      PMath.equals(this.i, m.i) &&
      PMath.equals(this.j, m.j) &&
      PMath.equals(this.k, m.k) &&
      PMath.equals(this.l, m.l) &&
      PMath.equals(this.m, m.m) &&
      PMath.equals(this.n, m.n) &&
      PMath.equals(this.o, m.o) &&
      PMath.equals(this.p, m.p)
    )
  }

  multiply(m: Matrix4): Matrix4 {
    return this.multiplyMatrices(this, m)
  }

  multiplyMatrices(m: Matrix4, n: Matrix4): Matrix4 {
    const ma = m.a
    const mb = m.b
    const mc = m.c
    const md = m.d
    const me = m.e
    const mf = m.f
    const mg = m.g
    const mh = m.h
    const mi = m.i
    const mj = m.j
    const mk = m.k
    const ml = m.l
    const mm = m.m
    const mn = m.n
    const mo = m.o
    const mp = m.p

    const na = n.a
    const nb = n.b
    const nc = n.c
    const nd = n.d
    const ne = n.e
    const nf = n.f
    const ng = n.g
    const nh = n.h
    const ni = n.i
    const nj = n.j
    const nk = n.k
    const nl = n.l
    const nm = n.m
    const nn = n.n
    const no = n.o
    const np = n.p

    this.a = ma * na + mb * ne + mc * ni + md * nm
    this.b = ma * nb + mb * nf + mc * nj + md * nn
    this.c = ma * nc + mb * ng + mc * nk + md * no
    this.d = ma * nd + mb * nh + mc * nl + md * np

    this.e = me * na + mf * ne + mg * ni + mh * nm
    this.f = me * nb + mf * nf + mg * nj + mh * nn
    this.g = me * nc + mf * ng + mg * nk + mh * no
    this.h = me * nd + mf * nh + mg * nl + mh * np

    this.i = mi * na + mj * ne + mk * ni + ml * nm
    this.j = mi * nb + mj * nf + mk * nj + ml * nn
    this.k = mi * nc + mj * ng + mk * nk + ml * no
    this.l = mi * nd + mj * nh + mk * nl + ml * np

    this.m = mm * na + mn * ne + mo * ni + mp * nm
    this.n = mm * nb + mn * nf + mo * nj + mp * nn
    this.o = mm * nc + mn * ng + mo * nk + mp * no
    this.p = mm * nd + mn * nh + mo * nl + mp * np

    return this
  }

  setPositionRotationAndScale(
    position: Vector3,
    rotation: Matrix3,
    scale: Vector3,
  ) {
    const p = position
    const r = rotation
    const s = scale

    this.setPosition(p)

    this.a = s.x * r.a
    this.b = s.x * r.b
    this.c = s.x * r.c

    this.e = s.y * r.d
    this.f = s.y * r.e
    this.g = s.y * r.f

    this.i = s.z * r.g
    this.j = s.z * r.h
    this.k = s.z * r.i

    this.m = 0
    this.n = 0
    this.o = 0
    this.p = 1

    return this
  }

  setPosition(position: Vector3): Matrix4 {
    this.d = position.x
    this.h = position.y
    this.l = position.z
    return this
  }

  static IDENTITY = new Matrix4(IDENTITY)
}
