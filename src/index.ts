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

// import * as colorUtils from './ColorUtils'

// console.time('colors')
// console.log('white', colorUtils.rgb2lab([255, 255, 255]))
// console.log('black', colorUtils.rgb2lab([0, 0, 0]))
// console.log('red', colorUtils.rgb2lab([255, 0, 0]))
// console.log('green', colorUtils.rgb2lab([0, 255, 0]))
// console.log('blue', colorUtils.rgb2lab([0, 0, 255]))
// console.log('cyan', colorUtils.rgb2lab([0, 255, 255]))
// console.log('magenta', colorUtils.rgb2lab([255, 0, 255]))
// console.log('yellow', colorUtils.rgb2lab([255, 255, 0]))
// console.log('dark red', colorUtils.rgb2lab([127, 0, 0]))
// console.log('dark green', colorUtils.rgb2lab([0, 127, 0]))
// console.log('dark blue', colorUtils.rgb2lab([0, 0, 127]))
// console.timeEnd('colors')

// let maxL = Number.MIN_VALUE
// let maxA = Number.MAX_VALUE
// let maxB = Number.MIN_VALUE
// let minL = Number.MAX_VALUE
// let minA = Number.MIN_VALUE
// let minB = Number.MAX_VALUE

// console.time('min / max')
// for (let r = 0; r < 256; ++r) {
//   for (let g = 0; g < 256; ++g) {
//     for (let b = 0; b < 256; ++b) {
//       // c = Color.FromArgb(r, g, b);

//       // Lab lab = c.ToLab();

//       const [labL, labA, labB] = colorUtils.rgb2lab([r, g, b])

//       maxL = Math.max(maxL, labL)
//       maxA = Math.max(maxA, labA)
//       maxB = Math.max(maxB, labB)
//       minL = Math.min(minL, labL)
//       minA = Math.min(minA, labA)
//       minB = Math.min(minB, labB)
//     }
//   }
// }
// console.timeEnd('min / max')

// console.log('minL', minL)
// console.log('minA', minA)
// console.log('minB', minB)
// console.log('maxL', maxL)
// console.log('maxA', maxA)
// console.log('maxB', maxB)

// import { ShinyBallDemo } from './demos/ShinyBall'
import { SpikyBallDemo } from './demos/SpikyBall'
// import { IcosahedronAsciiDemo } from './demos/IcosahedronAscii'

// const demo = new ShinyBallDemo()
const demo = new SpikyBallDemo()
// const demo = new IcosahedronAsciiDemo()
