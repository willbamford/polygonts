import { Entity } from '../Entity'
import { Fn } from '../Fn'
import { Vector3 } from '../math/Vector3'
import { Polygon } from './Polygon'
import { Mesh } from '../Mesh'

type Time = number

type ModelParameters = ConstructorParameters<typeof Entity>[0] & {
  vertices?: Vector3[]
  worldVertices?: Vector3[]
  viewVertices?: Vector3[]
  screenVertices?: Vector3[]
  polygons?: Polygon[]
}

export class Model extends Entity {
  type = 'model'

  vertices: Vector3[]
  worldVertices: Vector3[]
  viewVertices: Vector3[]
  screenVertices: Vector3[]
  polygons: Polygon[]

  constructor(opts: ModelParameters = {}) {
    super(opts)

    this.vertices = opts.vertices || [] // Object space
    this.worldVertices = opts.worldVertices || [] // World space
    this.viewVertices = opts.viewVertices || [] // View space
    this.screenVertices = opts.screenVertices || [] // Clip space

    const self = this
    this.polygons = opts.polygons || []

    // todo: replace .each with Array.forEach
    Fn.each(this.polygons, polygon => {
      self.addChild(polygon)
    })
  }

  update(delta: Time) {
    super.update(delta)

    const vertices = this.vertices
    const worldVertices = this.worldVertices
    const worldTransform = this.worldTransform

    let i = this.vertices.length
    while (--i >= 0) {
      worldVertices[i].copy(vertices[i]).applyProjection(worldTransform)
    }
  }

  static getOptsForMesh(mesh: Mesh): ModelParameters {
    const faces = mesh.faces
    const vertices = mesh.vertices
    const worldVertices = []
    const viewVertices = []
    const screenVertices = []

    Fn.each(vertices, () => {
      worldVertices.push(new Vector3(0, 0, 0))
      viewVertices.push(new Vector3(0, 0, 0))
      screenVertices.push(new Vector3(0, 0, 0))
    })

    const polygons: Polygon[] = []

    // todo: replace with map
    mesh.eachFace((_vertices, vertexIndices) => {
      const vs = []
      const wvs = []
      const vvs = []
      const svs = []
      Fn.each(vertexIndices, index => {
        vs.push(vertices[index])
        wvs.push(worldVertices[index])
        vvs.push(viewVertices[index])
        svs.push(screenVertices[index])
      })
      const polygon = new Polygon({
        vertices: vs,
        worldVertices: wvs,
        viewVertices: vvs,
        screenVertices: svs,
      })
      polygons.push(polygon)
    })

    return {
      vertices: mesh.vertices,
      worldVertices: worldVertices,
      viewVertices: viewVertices,
      screenVertices: screenVertices,
      polygons: polygons,
    }
  }

  static createFromMesh(mesh: Mesh, opts: ModelParameters): Model {
    const mergedOpts = Fn.merge(opts, this.getOptsForMesh(mesh))
    return new Model(mergedOpts)
  }
}
