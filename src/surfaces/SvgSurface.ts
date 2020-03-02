import { Surface } from './Surface'
import { Vector3 } from '../math/Vector3'
import { Color } from '../math/Color'
import { Fn } from '..'

type SvgSurfaceParameters = {
  container: HTMLElement
  width?: number
  height?: number
}

const SVG_NS = 'http://www.w3.org/2000/svg'
const XML_NS = 'http://www.w3.org/2000/xmlns/'

export class SvgSurface implements Surface {
  width: number
  height: number

  container: HTMLElement
  svg: SVGSVGElement

  static lastId = 0

  constructor(opts: SvgSurfaceParameters) {
    this.width = opts.width || 640
    this.height = opts.height || 480

    this.svg = this.createEl('svg', {
      style: 'background: white;', // border: 1px solid #eee;', //  shape-rendering: crispedges',
      width: `${this.width}`,
      height: `${this.height}`,
    })
    this.setAttrNS(
      this.svg,
      XML_NS,
      'xmlns:xlink',
      'http://www.w3.org/1999/xlink',
    )

    this.container = opts.container

    this.container.appendChild(this.svg)
  }

  destroy() {
    this.container.removeChild(this.svg)
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
    const cx = this.width * 0.5
    const cy = this.height * 0.5
    let encodedPoints = ''
    points.forEach(point => {
      const x = point.x + cx
      const y = -point.y + cy
      encodedPoints += `${x},${y} `
    })

    const style = [
      // 'fill: white',
      `fill: white`, //  ${color.getHexStyle()}`,
      `stroke: rgb(0, 0, 0)`,
      'stroke-width: 5',
      'stroke-linejoin: bevel',
    ].join(';')

    const polygon = this.createEl('polygon', {
      points: encodedPoints,
      style,
      // style: `fill: ${color.getHexStyle()}`,
      // style: `stroke: white; stroke-width: 5`,
    })
    this.svg.appendChild(polygon)
  }

  line(from: Vector3, to: Vector3, color: Color): void {}

  render() {}
}
