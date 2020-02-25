import { Entity } from './Entity'
import { Light } from './lights/Light'
import { Polygon } from './entities/Polygon'
import { Camera } from './cameras/Camera'
import { Model } from './entities/Model'
import { Fn } from './Fn'

type Time = number

type EntityType = Entity | Camera | Light | Polygon | Model

export class Scene {
  root: Entity
  cameras: Camera[]
  lights: Light[]
  polygons: Polygon[]
  models: Model[]

  mainCamera: Camera
  constructor() {
    this.root = null
    this.cameras = []
    this.lights = []
    this.polygons = []
    this.models = []

    this.mainCamera = null
  }

  update(delta: Time) {
    if (this.root) this.root.update(delta)
  }

  revalidate() {
    this.cameras = []
    this.lights = []
    this.polygons = []
    this.models = []
    this._revalidateFromChildren(this.root.children)

    if (this.cameras.length > 0 && !Fn.contains(this.cameras, this.mainCamera))
      this.mainCamera = this.cameras[0]
  }

  _revalidateFromChildren(children: EntityType[]) {
    children.forEach((entity: EntityType) => {
      switch (entity.type) {
        case 'camera':
          this.cameras.push(entity as Camera)
          break
        case 'light':
          this.lights.push(entity as Light)
          break
        case 'polygon':
          this.polygons.push(entity as Polygon)
          break
        case 'model':
          this.models.push(entity as Model)
          break
      }
      this._revalidateFromChildren(entity.children)
    })
  }
}
