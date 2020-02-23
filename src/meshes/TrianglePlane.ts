import { Mesh, Face } from '../Mesh'
import { Vector3 } from '../math/Vector3'

type Int = number

type TrianglePlaneParameters = {
  triangleHeight?: number
  numWidthSegments?: Int
  numHeightSegments?: Int
}

export class TrianglePlane {
  static create(opts: TrianglePlaneParameters): Mesh {
    const triangleHeight = opts.triangleHeight || 1
    const numWidthSegments = opts.numWidthSegments || 4
    const numHeightSegments = opts.numHeightSegments || 4

    const vertices = []
    const faces: Face[] = []
    const cx = (-triangleHeight * numWidthSegments) / 2
    const cz = (-triangleHeight * numHeightSegments) / 2

    let isOdd = false
    let z = 0

    for (let i = 0; i < numHeightSegments + 1; i += 1) {
      isOdd = i % 2 === 1
      let jlen: Int
      let offsetX: number

      if (isOdd) {
        jlen = numWidthSegments + 1
        offsetX = 0
      } else {
        jlen = numWidthSegments
        offsetX = triangleHeight / 2
      }

      let x = 0
      for (let j = 0; j < jlen; j++) {
        x = j * triangleHeight + offsetX
        const v = new Vector3(x + cx, 0, z + cz)
        vertices.push(v)
      }

      z += triangleHeight
    }

    isOdd = false
    let startOfNextStrip = numWidthSegments
    for (let i = numWidthSegments; i < vertices.length; i += 1) {
      if (i === startOfNextStrip) {
        if (isOdd) startOfNextStrip += numWidthSegments
        else startOfNextStrip += numWidthSegments + 1
        isOdd = !isOdd
      }
      if (isOdd) {
        if (i < startOfNextStrip - 1)
          faces.push([i, i + 1, i - numWidthSegments])
        if (i < startOfNextStrip - 2)
          faces.push([i + 1, i - numWidthSegments + 1, i - numWidthSegments])
      } else {
        if (i < startOfNextStrip)
          faces.push([i, i - numWidthSegments, i - numWidthSegments - 1])
        if (i < startOfNextStrip - 1)
          faces.push([i, i + 1, i - numWidthSegments])
      }
    }

    const instance = new Mesh({
      vertices,
      faces,
    })

    return instance
  }
}
