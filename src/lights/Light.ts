import { Entity } from 'Entity'
import { Color } from 'math/Color'

type LightParameters = ConstructorParameters<typeof Entity>[0] & {
  color?: Color
  specular?: Color
  intensity?: number
}

export class Light extends Entity {
  type = 'light'

  color: Color
  specular: Color
  intensity: number

  constructor(opts: LightParameters) {
    super(opts)

    this.color = opts.color || Color.WHITE.clone()
    this.specular =
      opts.specular !== undefined ? opts.specular : Color.WHITE.clone()
    this.intensity = opts.intensity !== undefined ? opts.intensity : 1.0
  }
}
