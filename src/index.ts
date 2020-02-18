import { Entity } from './Entity'
import { Vector3 } from './math/Vector3'
import { Matrix3 } from './math/Matrix3'

const e = new Entity({
  position: new Vector3(),
  rotation: new Matrix3(),
  scale: new Vector3(),
})

console.log('e', e)
