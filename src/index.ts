export { Camera, OrthographicCamera, PerspectiveCamera } from './cameras'
export { Model, Polygon } from './entities'
export { ObjectFileFormat } from './formats'
export { Light } from './lights'
export { Color, Matrix3, Matrix4, PMath, Vector2, Vector3 } from './math'
export {
  CubeMesh,
  IcosahedronMesh,
  SphereMesh,
  TrianglePlaneMesh,
} from './meshes'
export { CanvasSurface } from './surfaces'
export { SvgSurface } from './surfaces'
export { Engine } from './Engine'
export { Entity } from './Entity'
export { Fn } from './Fn'
export { FpsCounter } from './FpsCounter'
export { Material } from './Material'
export { Mesh } from './Mesh'
export { Renderer } from './Renderer'
export { Scene } from './Scene'

// import { ShinyBallDemo } from './demos/ShinyBall'
// import { SpikyBallDemo } from './demos/SpikyBall'
import { IcosahedronDemo } from './demos/Icosahedron'

// const demo = new ShinyBallDemo()
// const demo = new SpikyBallDemo()
const demo = new IcosahedronDemo()
