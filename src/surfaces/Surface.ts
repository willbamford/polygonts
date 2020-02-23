import { Vector3 } from '../math/Vector3'
import { Color } from '../math/Color'
import { Vector2 } from '../math/Vector2'

export interface Surface {
  clear(): void

  polygon(points: Vector2[], color: Color): void

  line(from: Vector2, to: Vector2, color: Color): void

  render(): void
}
