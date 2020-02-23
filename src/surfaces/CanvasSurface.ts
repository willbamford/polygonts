import { Surface } from './Surface'
import { Vector2 } from 'math/Vector2'
import { Color } from 'math/Color'

type CanvasSurfaceParameters = {
  container: string | HTMLElement
  width?: number
  height?: number
}

export class CanvasSurface implements Surface {
  width: number
  height: number
  cx: number
  cy: number

  container: HTMLElement
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  constructor(opts: CanvasSurfaceParameters) {
    this.width = opts.width || 640
    this.height = opts.height || 480
    this.cx = this.width / 2
    this.cy = this.height / 2

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
    throw new Error('Method not implemented.')
  }
  polygon(points: Vector2[], color: Color): void {
    const len = points.length

    const ctx = this.context
    let a = points[0]

    ctx.fillStyle = color.getHexStyle()
    ctx.beginPath()
    ctx.moveTo(a.x + this.cx, -a.y + this.cy)
    for (let i = 1; i < len; i += 1) {
      a = points[i]
      ctx.lineTo(a.x + this.cx, -a.y + this.cy)
    }
    ctx.closePath()
    ctx.fill()
  }

  line(from: Vector2, to: Vector2, color: Color): void {
    const ctx = this.context
    ctx.strokeStyle = color.getHexStyle()
    ctx.beginPath()
    ctx.moveTo(from.x + this.cx, -from.x + this.cy)
    ctx.lineTo(to.x + this.cx, -to.y + this.cy)
    ctx.stroke()
  }

  render() {}
}
