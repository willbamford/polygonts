import { Vector3 } from './math/Vector3'
import { Matrix3 } from './math/Matrix3'
import { Matrix4 } from './math/Matrix4'
import { Fn } from './Fn'

type Time = number

type EntityParameters = {
  position?: Vector3
  rotation?: Matrix3
  scale?: Vector3
  up?: Vector3
  right?: Vector3
  forward?: Vector3
  tags?: string[]
}

export class Entity {
  static type = 'entity'
  parent: Entity | null
  position: Vector3
  rotation: Matrix3
  scale: Vector3
  up: Vector3
  right: Vector3
  forward: Vector3
  localTransform: Matrix4
  worldTransform: Matrix4
  worldPosition: Vector3
  children: Entity[]
  tags: string[]

  constructor(opts: EntityParameters = {}) {
    this.parent = null
    this.position = opts.position || new Vector3(0, 0, 0)
    this.rotation = opts.rotation || Matrix3.IDENTITY.clone()
    this.scale = opts.scale || new Vector3(1, 1, 1)

    this.up = opts.up || Vector3.UP.clone()
    this.right = opts.right || Vector3.RIGHT.clone()
    this.forward = opts.forward || Vector3.FORWARD.clone()

    this.children = []
    this.tags = opts.tags || []

    this.localTransform = Matrix4.IDENTITY.clone()
    this.worldTransform = Matrix4.IDENTITY.clone()
    this.worldPosition = Vector3.ZERO.clone()
  }

  find(tag: string): Entity[] {
    let found: Entity[] = []
    if (Fn.contains(this.tags, tag)) found.push(this)
    Fn.each(this.children, entity => {
      found = found.concat(entity.find(tag))
    })
    return found
  }

  findFirst(tag): Entity | null {
    const all = this.find(tag)
    return all.length > 0 ? all[0] : null
  }

  update(delta: Time): void {
    this.updateLocalTransform()
    this.updateWorldTransform()
    this.worldPosition.applyPosition(this.worldTransform)

    let children = this.children
    let i = children.length
    let entity
    while (--i >= 0) {
      entity = children[i]
      entity.update(delta)
    }
  }

  updateLocalTransform(): void {
    this.localTransform.setPositionRotationAndScale(
      this.position,
      this.rotation,
      this.scale,
    )
  }

  updateWorldTransform(): Matrix4 {
    const lt = this.localTransform
    const wt = this.worldTransform
    const p = this.parent
    return p ? wt.copy(p.worldTransform).multiply(lt) : lt
  }

  root(): Entity {
    let e: Entity = this
    while (e.parent) e = e.parent
    return e
  }

  addChild(entity: Entity): Entity {
    if (!entity.parent) {
      entity.parent = this
      this.children.push(entity)
    }
    return this
  }

  removeChild(entity: Entity): Entity {
    if (entity.parent === this) {
      let i = this.children.indexOf(entity)
      if (i !== -1) {
        this.children.splice(i, 1)
        entity.parent = null
      }
    }
    return this
  }
}
