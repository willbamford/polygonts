import { Vector3 } from '../math/Vector3'
import { Color } from '../math/Color'
import { Vector2 } from '../math/Vector2'

type Int = number

export interface Surface {
  width: Int
  height: Int
  clear(): void
  polygon(points: Vector3[], color: Color): void
  line(from: Vector3, to: Vector3, color: Color): void
  render(): void
  destroy(): void
}
