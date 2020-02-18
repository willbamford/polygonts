import { Entity } from '../Entity'
import { Matrix4 } from '../math/Matrix4'
import { Vector3 } from '../math/Vector3'

type CameraParameters = ConstructorParameters<typeof Entity>[0]

export class Camera extends Entity {
  static type = 'camera'
  viewTransform: Matrix4
  projectionTransform: Matrix4

  constructor(opts: CameraParameters) {
    super(opts)

    this.viewTransform = new Matrix4()
    this.projectionTransform = new Matrix4()
  }

  lookAt(target: Vector3): void {
    const eye = this.worldPosition
    const transform = this.viewTransform

    let up = this.up.copy(Vector3.UP)
    const forward = this.forward
      .copy(eye)
      .subtract(target)
      .normalise() // z-axis
    const right = this.right.copy(up).normal(forward) // x-axis
    up = up.copy(forward).normal(right) // y-axis

    transform.a = right.x
    transform.b = right.y
    transform.c = right.z
    transform.d = -right.dotProduct(eye)

    transform.e = up.x
    transform.f = up.y
    transform.g = up.z
    transform.h = -up.dotProduct(eye)

    transform.i = forward.x
    transform.j = forward.y
    transform.k = forward.z
    transform.l = -forward.dotProduct(eye)

    transform.m = 0
    transform.n = 0
    transform.o = 0
    transform.p = 1
  }
}
