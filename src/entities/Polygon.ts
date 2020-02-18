import { Entity } from 'Entity'
import { Material } from 'Material'
import { Vector3 } from '../math/Vector3'
import { Color } from '../math/Color'

type PolygonParameters = ConstructorParameters<typeof Entity>[0] & {
  vertices?: Vector3[]
  worldVertices?: Vector3[]
  viewVertices?: Vector3[]
  screenVertices?: Vector3[]
  material?: Material
}

type Time = number

export class Polygon extends Entity {
  static type = 'polygon'

  vertices: Vector3[]
  worldVertices: Vector3[]
  viewVertices: Vector3[]
  screenVertices: Vector3[]

  normal: Vector3
  worldNormal: Vector3
  isCulled: boolean
  distanceToCamera: number

  material: Material
  color: Color

  constructor(opts: PolygonParameters = {}) {
    super(opts)

    this.vertices = opts.vertices || []
    this.worldVertices = opts.worldVertices || []
    this.viewVertices = opts.viewVertices || []
    this.screenVertices = opts.screenVertices || []
    this.normal = Vector3.ONE.clone()
    this.worldNormal = this.normal.clone()
    this.isCulled = false
    this.distanceToCamera = 0

    this.material = opts.material || new Material()
    this.color = Color.BLACK.clone()

    this.updateNormal()
  }

  update(delta: Time): void {
    super.update(delta)
    this.worldNormal
      .copy(this.normal)
      .applyMatrix4(this.worldTransform)
      .normalise()
    this.worldPosition.center(this.worldVertices)
  }

  updateNormal(): void {
    const v = this.vertices
    if (v.length >= 3) this.normal.normalFromPositionVectors(v[0], v[1], v[2])
  }
}
