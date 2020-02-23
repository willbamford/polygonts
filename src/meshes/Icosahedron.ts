import { Mesh } from '../Mesh'
import { Vector3 } from '../math/Vector3'

// See: http://gamedev.stackexchange.com/a/31312/31803
const X = 0.525731112119133606
const Z = 0.850650808352039932

export class Icosahedron {
  static create(): Mesh {
    const vertices = Vector3.createFromArrays([
      [-X, 0, Z],
      [X, 0, Z],
      [-X, 0, -Z],
      [X, 0, -Z],
      [0, Z, X],
      [0, Z, -X],
      [0, -Z, X],
      [0, -Z, -X],
      [Z, X, 0],
      [-Z, X, 0],
      [Z, -X, 0],
      [-Z, -X, 0],
    ])
    const instance = new Mesh({
      vertices,
      faces: [
        [1, 4, 0],
        [4, 9, 0],
        [4, 5, 9],
        [8, 5, 4],
        [1, 8, 4],
        [1, 10, 8],
        [10, 3, 8],
        [8, 3, 5],
        [3, 2, 5],
        [3, 7, 2],
        [3, 10, 7],
        [10, 6, 7],
        [6, 11, 7],
        [6, 0, 11],
        [6, 1, 0],
        [10, 1, 6],
        [11, 0, 9],
        [2, 11, 9],
        [5, 2, 9],
        [11, 2, 7],
      ],
    })

    return instance
  }
}
