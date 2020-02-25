import { Mesh } from '../Mesh'
import { Fn } from '../Fn'
import { Vector3 } from '../math/Vector3'

const line = (s: string): string => {
  return s + '\n'
}

export class ObjectFileFormat {
  static loadMesh(data) {
    const lines: string[] = data.split('\n')
    let counts: string[]
    let vertexCount: number
    let faceCount: number
    let edgeCount: number
    let verticesRemaining: number
    let facesRemaining: number
    // let vertex: string[]
    let vertices = []
    let faces = []
    let faceVertexCount: number
    let faceIndices: number[]
    let i: number

    lines.forEach(value => {
      const line = Fn.trim(value).replace(/\s{2,}/g, ' ')
      if (
        !line ||
        line.length === 0 || // Empty line
        line === 'OFF' || // Format header
        line[0] === '#'
      ) {
        // Comment
        console.log('Found comment')
      } else {
        if (!counts) {
          counts = line.split(' ')
          vertexCount = parseFloat(counts[0])
          verticesRemaining = vertexCount
          faceCount = parseFloat(counts[1])
          facesRemaining = faceCount
          edgeCount = counts.length > 2 ? parseFloat(counts[2]) : -1
        } else if (verticesRemaining > 0) {
          const vertex = line.split(' ')
          vertices.push(
            new Vector3(
              parseFloat(vertex[0]),
              parseFloat(vertex[1]),
              parseFloat(vertex[2]),
            ),
          )
          verticesRemaining -= 1
        } else if (facesRemaining > 0) {
          const face = line.split(' ')
          faceVertexCount = parseInt(face[0])
          faceIndices = []
          for (i = 1; i < faceVertexCount + 1; i += 1)
            faceIndices.push(parseInt(face[i]))
          faces.push(faceIndices)
          facesRemaining -= 1
        }
      }
    })
    return new Mesh({
      vertices: vertices,
      faces: faces,
    })
  }

  static saveMesh(mesh: Mesh): string {
    let s = ''
    s += line('OFF')
    s += line(mesh.vertices.length + ' ' + mesh.faces.length + ' 0')
    mesh.vertices.forEach(vertex => {
      s += line(vertex.x + ' ' + vertex.y + ' ' + vertex.z)
    })
    mesh.faces.forEach(face => {
      let ln = face.length + ' '
      face.forEach(index => {
        ln += index + ' '
      })
      s += line(ln)
    })
    return s
  }
}
