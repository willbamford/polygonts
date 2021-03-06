import { Vector3 } from './math/Vector3'
import { Fn } from './Fn'

type Int = number

export type Face = Int[]

type MeshParameters = {
  vertices?: Vector3[]
  faces?: Face[]
}

export class Mesh {
  vertices: Vector3[]
  faces: Face[]

  constructor(opts: MeshParameters) {
    this.vertices = opts.vertices || []
    this.faces = opts.faces || []
  }

  eachFace(fn: (vertices: Vector3[], face: Face) => void): void {
    this.faces.forEach(face => {
      const vertices = this.getVerticesForFace(face)
      fn(vertices, face)
    })
  }

  getVerticesForFace(face: Face): Vector3[] {
    return face.map(i => this.vertices[i])
  }

  normalise(): void {
    if (this.vertices && this.vertices.length > 0) {
      let minX = Number.MAX_VALUE
      let maxX = Number.MIN_VALUE
      let minY = Number.MAX_VALUE
      let maxY = Number.MIN_VALUE
      let minZ = Number.MAX_VALUE
      let maxZ = Number.MIN_VALUE

      this.vertices.forEach(vertex => {
        if (vertex.x < minX) minX = vertex.x
        if (vertex.x > maxX) maxX = vertex.x
        if (vertex.y < minY) minY = vertex.y
        if (vertex.y > maxY) maxY = vertex.y
        if (vertex.z < minZ) minZ = vertex.z
        if (vertex.z > maxZ) maxZ = vertex.z
      })

      const dx = maxX - minX
      const dy = maxY - minY
      const dz = maxZ - minZ
      const dmax = Math.max(dx, Math.max(dy, dz))
      const tx = 0.5 * (minX + maxX)
      const ty = 0.5 * (minY + maxY)
      const tz = 0.5 * (minZ + maxZ)
      const scale = 2 / dmax

      this.vertices.forEach(vertex => {
        vertex.x -= tx
        vertex.y -= ty
        vertex.z -= tz
        vertex.x *= scale
        vertex.y *= scale
        vertex.z *= scale
      })
    }
  }
}
