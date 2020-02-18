import { Color } from './math/Color'

type MaterialParameters = {
  color?: Color
  emissive?: Color
  specular?: Color
  shininess?: number
}

export class Material {
  color: Color
  emissive: Color
  specular: Color
  shininess: number

  constructor(opts: MaterialParameters = {}) {
    this.color = opts.color || Color.WHITE.clone()
    this.emissive = opts.emissive || Color.BLACK.clone()

    this.specular = opts.specular || new Color({ r: 1, g: 0.1, b: 0.1 })
    this.shininess = opts.shininess !== undefined ? opts.shininess : 5.0
  }
}
