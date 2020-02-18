import { Camera } from './Camera'
import { Matrix4 } from '../math/Matrix4'

type OrthographicCameraParameters = ConstructorParameters<typeof Camera>[0] & {
  width?: number
  height?: number
  nearZ?: number
  farZ?: number
}

export class OrthographicCamera extends Camera {
  width: number
  height: number
  nearZ: number
  farZ: number

  constructor(opts: OrthographicCameraParameters = {}) {
    super(opts)

    this.width = opts.width || 6.4
    this.height = opts.height || 4.8
    this.nearZ = opts.nearZ || 0
    this.farZ = opts.farZ || 100

    this.updateProjectionTransform()
  }

  static createProjectionTransform(
    width: number,
    height: number,
    nearZ: number,
    farZ: number,
    transform: Matrix4 = new Matrix4(),
  ): Matrix4 {
    var m = transform
    var depthZ = farZ - nearZ
    m.a = 2 / width
    m.b = 0
    m.c = 0
    m.d = 0
    m.e = 0
    m.f = 2 / height
    m.g = 0
    m.h = 0
    m.i = 0
    m.j = 0
    m.k = -2 / depthZ
    m.l = -(farZ + nearZ) / depthZ
    m.m = 0
    m.n = 0
    m.o = 0
    m.p = 1
    return m
  }

  updateProjectionTransform(): void {
    this.projectionTransform = OrthographicCamera.createProjectionTransform(
      this.width,
      this.height,
      this.nearZ,
      this.farZ,
      this.projectionTransform,
    )
  }
}
