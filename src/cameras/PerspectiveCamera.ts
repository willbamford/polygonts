import { Camera } from './Camera'
import { Matrix4 } from '../math/Matrix4'

type PerspectiveCameraParameters = ConstructorParameters<typeof Camera>[0] & {
  fieldOfViewY?: number
  aspectRatio?: number
  nearZ?: number
  farZ?: number
}

export class PerspectiveCamera extends Camera {
  fieldOfViewY: number
  aspectRatio: number
  nearZ: number
  farZ: number

  constructor(opts: PerspectiveCameraParameters = {}) {
    super(opts)

    this.fieldOfViewY = opts.fieldOfViewY || 60
    this.aspectRatio = opts.aspectRatio || 1.25
    this.nearZ = opts.nearZ || 1
    this.farZ = opts.farZ || 100

    this.updateProjectionTransform()
  }

  static createFrustum(
    left: number,
    right: number,
    bottom: number,
    top: number,
    nearZ: number,
    farZ: number,
    transform: Matrix4 = new Matrix4(),
  ): Matrix4 {
    const m = transform
    const w = right - left
    const h = top - bottom
    const d = farZ - nearZ

    m.a = (2 * nearZ) / w
    m.b = 0
    m.c = 0
    m.d = 0

    m.e = 0
    m.f = (2 * nearZ) / h
    m.g = 0
    m.h = 0

    m.i = (right + left) / w
    m.j = (top + bottom) / h
    m.k = -(farZ + nearZ) / d
    m.l = -1

    m.m = 0
    m.n = 0
    m.o = (-2 * farZ * nearZ) / d
    m.p = 0

    return m
  }

  static createProjectionTransform(
    fieldOfViewY: number,
    aspectRatio: number,
    nearZ: number,
    farZ: number,
    transform: Matrix4,
  ): Matrix4 {
    var maxY = nearZ * Math.tan((fieldOfViewY * Math.PI) / 360.0)
    var minY = -maxY
    var minX = minY * aspectRatio
    var maxX = -minX
    return PerspectiveCamera.createFrustum(
      minX,
      maxX,
      minY,
      maxY,
      nearZ,
      farZ,
      transform,
    )
  }

  updateProjectionTransform(): void {
    this.projectionTransform = PerspectiveCamera.createProjectionTransform(
      this.fieldOfViewY,
      this.aspectRatio,
      this.nearZ,
      this.farZ,
      this.projectionTransform,
    )
  }
}
