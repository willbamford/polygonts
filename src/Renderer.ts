import { Surface } from 'surfaces/Surface'
import { Scene } from 'Scene'
import { Vector3 } from 'math/Vector3'
import { Polygon } from 'entities/Polygon'
import { Camera } from 'cameras/Camera'
import { Light } from 'lights/Light'
import { Model } from 'entities/Model'
import { Color } from 'math/Color'

type RendererParameters = {
  surface: Surface
  scene: Scene
  showAxes?: boolean
}

export class Renderer {
  surface: Surface
  scene: Scene
  axes: {
    show: boolean
    len: number
    o: Vector3
    x: Vector3
    y: Vector3
    z: Vector3
  }
  showAxes: boolean

  constructor(opts: RendererParameters) {
    this.surface = opts.surface
    this.scene = opts.scene
    this.axes = {
      show: Boolean(opts.showAxes),
      len: 1,
      o: new Vector3(0, 0, 0),
      x: new Vector3(0, 0, 0),
      y: new Vector3(0, 0, 0),
      z: new Vector3(0, 0, 0),
    }
  }

  render(): void {
    const scene = this.scene
    const camera = scene.mainCamera
    const lights = scene.lights
    const models = scene.models
    const polygons = scene.polygons
    const surface = this.surface

    surface.clear()

    this.cull(polygons, camera)
    this.depthSort(polygons)
    this.light(polygons, lights, camera)
    // this.project(models, camera, surface)
    // this.draw(polygons, surface)

    surface.render()
  }

  cull(polygons: readonly Polygon[], camera: Camera): void {
    const len = polygons.length
    const cameraPosition = camera.worldPosition
    for (let i = 0; i < len; i += 1) {
      const polygon = polygons[i]
      const dotProduct = polygon.worldNormal.dotProduct(camera.forward)
      polygon.isCulled = dotProduct < 0
      polygon.distanceToCamera = polygon.worldPosition.distanceTo(
        cameraPosition,
      )
    }
  }

  depthSort(polygons: Polygon[]): void {
    const sorter = (a: Polygon, b: Polygon) => {
      return b.distanceToCamera - a.distanceToCamera
    }
    polygons.sort(sorter)
  }

  light(polygons: Polygon[], lights: Light[], camera: Camera): void {
    let i = polygons.length
    while (--i >= 0) {
      const polygon = polygons[i]
      if (!polygon.isCulled) {
        const material = polygon.material
        const polygonColor = polygon.color
        const polygonNormal = polygon.worldNormal

        const materialColor = material.color
        const materialEmissive = material.emissive
        const materialSpecular = material.specular
        const materialShininess = material.shininess

        polygonColor.setRGB(0, 0, 0)

        let j = lights.length
        while (--j >= 0) {
          const light = lights[j]
          const lightColor = light.color
          let lightIntensity = light.intensity
          const lightSpecular = light.specular

          // Diffuse
          let dp = light.forward.dotProduct(polygonNormal)

          if (dp < 0) dp = 0

          lightIntensity *= dp

          polygonColor.r += materialColor.r * lightColor.r * lightIntensity
          polygonColor.g += materialColor.g * lightColor.g * lightIntensity
          polygonColor.b += materialColor.b * lightColor.b * lightIntensity

          // Specular
          if (dp > 0 && lightSpecular && materialSpecular) {
            const reflect = new Vector3(0, 0, 0)
            dp = -camera.forward.dotProduct(
              reflect.copy(light.forward).reflect(polygonNormal),
            )
            if (dp > 0) {
              const specularK = Math.max(Math.pow(dp, materialShininess), 0)
              polygonColor.r += specularK * lightSpecular.r * materialSpecular.r
              polygonColor.g += specularK * lightSpecular.g * materialSpecular.g
              polygonColor.b += specularK * lightSpecular.b * materialSpecular.b
            }
          }
        }

        polygonColor.add(materialEmissive)
        polygonColor.clamp()
      }
    }
  }

  project(models: Model[], camera: Camera, surface: Surface): void {
    const ilen = models.length
    const viewTransform = camera.viewTransform
    const projectionTransform = camera.projectionTransform
    const surfaceWidth = surface.width
    const surfaceHeight = surface.height

    for (let i = 0; i < ilen; i += 1) {
      const model = models[i]
      const worldVertices = model.worldVertices
      const viewVertices = model.viewVertices
      const screenVertices = model.screenVertices

      const jlen = worldVertices.length
      for (let j = 0; j < jlen; j += 1) {
        const worldVertex = worldVertices[j]
        const viewVertex = viewVertices[j]
        const screenVertex = screenVertices[j]

        viewVertex.copy(worldVertex).applyProjection(viewTransform)
        screenVertex.copy(viewVertex).applyProjection(projectionTransform)

        screenVertex.x *= surfaceWidth
        screenVertex.y *= surfaceHeight
      }
    }

    const axes = this.axes
    if (axes.show) {
      axes.o
        .set(0, 0, 0)
        .applyProjection(viewTransform)
        .applyProjection(projectionTransform)
      axes.x
        .set(axes.len, 0, 0)
        .applyProjection(viewTransform)
        .applyProjection(projectionTransform)
      axes.y
        .set(0, axes.len, 0)
        .applyProjection(viewTransform)
        .applyProjection(projectionTransform)
      axes.z
        .set(0, 0, axes.len)
        .applyProjection(viewTransform)
        .applyProjection(projectionTransform)
      axes.x.x *= surfaceWidth
      axes.x.y *= surfaceHeight
      axes.y.x *= surfaceWidth
      axes.y.y *= surfaceHeight
      axes.z.x *= surfaceWidth
      axes.z.y *= surfaceHeight
    }
  }

  draw(polygons: Polygon[], surface: Surface): void {
    const len = polygons.length
    for (let i = 0; i < len; i += 1) {
      const polygon = polygons[i]
      if (!polygon.isCulled)
        surface.polygon(polygon.screenVertices, polygon.color)
    }

    const axes = this.axes
    if (axes.show) {
      surface.line(axes.o, axes.x, Color.RED)
      surface.line(axes.o, axes.y, Color.GREEN)
      surface.line(axes.o, axes.z, Color.BLUE)
    }
  }
}
