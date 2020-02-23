import { Icosahedron } from './Icosahedron'
import { Vector3 } from '../math/Vector3'
import { Fn } from '../Fn'
import { Mesh, Face } from '../Mesh'

type Int = number

type SphereParameters = {
  levelOfDetail?: Int
  spikiness?: number
}

const key = (i1: Int, i2: Int): string => {
  return i1 < i2 ? i1 + ',' + i2 : i2 + ',' + i1
}

export class Sphere {
  static create(opts: SphereParameters): Mesh {
    const icosahedron = Icosahedron.create()
    const vs = icosahedron.vertices
    let fs = icosahedron.faces
    const vertices = vs
    let faces = fs
    const levelOfDetail = opts.levelOfDetail || 3
    const spikiness = opts.spikiness || 0
    const map = {}

    const faceFn = (face: Face, faceIndex: Int) => {
      const a = vs[face[0]]
      const b = vs[face[1]]
      const c = vs[face[2]]
      const ai = face[0]
      const bi = face[1]
      const ci = face[2]
      const abk = key(ai, bi)
      const bck = key(bi, ci)
      const cak = key(ci, ai)
      let ab: Vector3
      let bc: Vector3
      let ca: Vector3
      let abi: Int
      let bci: Int
      let cai: Int

      if (map[abk]) {
        abi = map[abk]
      } else {
        ab = new Vector3().center([a, b]).normalise()
        if (levelOfDetail === 0 && spikiness !== 0) ab.multiply(1 - spikiness)
        abi = vertices.length
        vertices.push(ab)
        map[abk] = abi
      }

      if (map[bck]) {
        bci = map[bck]
      } else {
        bc = new Vector3().center([b, c]).normalise()
        if (levelOfDetail === 0 && spikiness !== 0) bc.multiply(1 - spikiness)
        bci = vertices.length
        vertices.push(bc)
        map[bck] = bci
      }

      if (map[cak]) {
        cai = map[cak]
      } else {
        ca = new Vector3().center([c, a]).normalise()
        if (levelOfDetail === 0 && spikiness !== 0) ca.multiply(1 - spikiness)
        cai = vertices.length
        vertices.push(ca)
        map[cak] = cai
      }

      faces.push([ai, abi, cai])
      faces.push([abi, bi, bci])
      faces.push([cai, bci, ci])
      faces.push([cai, abi, bci])
    }

    let lod = levelOfDetail
    while (--lod >= 0) {
      faces = []
      Fn.each(fs, faceFn)
      fs = faces
    }

    return new Mesh({
      vertices,
      faces,
    })
  }
}
