import { Surface } from './Surface'
import { Vector3 } from '../math/Vector3'
import { Color } from '../math/Color'
import { Fn } from '..'

type SvgSurfaceParameters = {
  container: string | HTMLElement
  width?: number
  height?: number
}

const SVG_NS = 'http://www.w3.org/2000/svg'
const XML_NS = 'http://www.w3.org/2000/xmlns/'

export class SvgSurface implements Surface {
  width: number
  height: number
  cx: number
  cy: number

  container: HTMLElement
  svg: SVGSVGElement

  static lastId = 0

  constructor(opts: SvgSurfaceParameters) {
    this.width = opts.width || 640
    this.height = opts.height || 480

    this.cx = this.width / 2
    this.cy = this.height / 2
    const svg = this.createEl('svg', {
      style:
        'background: black; border: 1px solid #eee; shape-rendering: crispedges',
      width: `${this.width}`,
      height: `${this.height}`,
    })
    this.setAttrNS(svg, XML_NS, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')

    const container =
      typeof opts.container === 'string'
        ? document.getElementById(opts.container)
        : opts.container

    container.appendChild(svg)
    this.container = container
    this.svg = svg
  }

  createEl(name: string, attrs: { [id: string]: string }): SVGSVGElement {
    const el = document.createElementNS(SVG_NS, name) as SVGSVGElement
    attrs = attrs || {}
    for (let attr in attrs) this.setAttr(el, attr, attrs[attr])
    return el
  }

  setAttr(el: SVGElement, name: string, value: string): void {
    el.setAttribute(name, value)
  }

  setAttrNS(
    el: SVGElement,
    namespace: string,
    name: string,
    value: string,
  ): void {
    el.setAttributeNS(namespace, name, value)
  }

  clear(): void {
    while (this.svg.lastChild) {
      this.svg.removeChild(this.svg.lastChild)
    }
  }

  polygon(points: Vector3[], color: Color): void {
    let encodedPoints = ''
    points.forEach(point => {
      const x = point.x + this.cx
      const y = -point.y + this.cy
      encodedPoints += `${x},${y} `
    })
    const polygon = this.createEl('polygon', {
      points: encodedPoints,
      style: `fill: ${color.getHexStyle()}`,
    })
    this.svg.appendChild(polygon)
  }

  line(from: Vector3, to: Vector3, color: Color): void {}

  render() {}
}
