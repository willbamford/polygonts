import { Surface } from './Surface'
import { Vector3 } from '../math/Vector3'
import { Color } from '../math/Color'

type CanvasSurfaceParameters = {
  container: string | HTMLElement
  width?: number
  height?: number
}

export class CanvasSurface implements Surface {
  width: number
  height: number
  // cx: number
  // cy: number

  container: HTMLElement
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  constructor(opts: CanvasSurfaceParameters) {
    this.width = opts.width || 640
    this.height = opts.height || 480

    const canvas = this.createEl('canvas', {
      style: 'background: black',
      width: `${this.width}px`,
      height: `${this.height}px`,
    }) as HTMLCanvasElement

    const container =
      typeof opts.container === 'string'
        ? document.getElementById(opts.container)
        : opts.container

    container.appendChild(canvas)
    this.container = container
    this.canvas = canvas
    this.context = canvas.getContext('2d')
  }

  destroy() {
    this.container.removeChild(this.canvas)
  }

  createEl(name: string, attrs: { [id: string]: string }): HTMLElement {
    const el = document.createElement(name)
    attrs = attrs || {}
    for (let attr in attrs) this.setAttr(el, attr, attrs[attr])
    return el
  }

  setAttr(el: HTMLElement, name: string, value: string): void {
    el.setAttribute(name, value)
  }

  setAttrNS(
    el: HTMLElement | SVGElement,
    namespace: string,
    name: string,
    value: string,
  ): void {
    el.setAttributeNS(namespace, name, value)
  }

  clear(): void {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  polygon(points: Vector3[], color: Color): void {
    const cx = this.width * 0.5
    const cy = this.height * 0.5
    const len = points.length

    const ctx = this.context
    let a = points[0]

    ctx.fillStyle = color.getHexStyle()
    ctx.beginPath()
    ctx.moveTo(a.x + cx, -a.y + cy)
    for (let i = 1; i < len; i += 1) {
      a = points[i]
      ctx.lineTo(a.x + cx, -a.y + cy)
    }
    ctx.closePath()
    ctx.fill()
  }

  line(from: Vector3, to: Vector3, color: Color): void {
    const cx = this.width * 0.5
    const cy = this.height * 0.5
    const ctx = this.context
    ctx.strokeStyle = color.getHexStyle()
    ctx.beginPath()
    ctx.moveTo(from.x + cx, -from.x + cy)
    ctx.lineTo(to.x + cx, -to.y + cy)
    ctx.stroke()
  }

  render() {}

  getImageData() {
    return this.context.getImageData(0, 0, this.width, this.height)
  }
}
