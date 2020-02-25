import {
  SphereMesh,
  Model,
  Fn,
  Material,
  Color,
  Vector3,
  Scene,
  PerspectiveCamera,
  Light,
  Entity,
  Renderer,
  Engine,
  CanvasSurface,
  SvgSurface,
} from '..'
import { CubeMesh, IcosahedronMesh } from '../meshes'

export class IcosahedronDemo {
  constructor() {
    const container = document.createElement('div')
    document.body.appendChild(container)

    // const mesh = IcosahedronMesh.create()
    const mesh = SphereMesh.create({ levelOfDetail: 0 })
    const model = Model.createFromMesh(mesh)
    model.polygons.forEach(polygon => {
      polygon.material = new Material({
        specular: new Color({ r: 1, g: 1, b: 1 }),
        shininess: 0,
        emissive: new Color({ r: 0.1, g: 0.1, b: 0.1 }),
      })
    })

    const width = 64
    const height = 64
    const aspectRatio = width / height

    const Surface = SvgSurface // CanvasSurface
    const surface = new Surface({
      container,
      width,
      height,
    })
    const scene = new Scene()
    const camera = new PerspectiveCamera({
      aspectRatio,
    })

    const light = new Light({
      color: new Color({ r: 1, g: 1, b: 1 }), // Color.RED.clone(),
      specular: null,
      forward: new Vector3(1, 0.5, 0),
    })

    const root = new Entity()
    root
      .addChild(model)
      .addChild(camera)
      .addChild(light)

    scene.root = root
    scene.revalidate()

    const renderer = new Renderer({
      surface,
      scene,
    })

    const eye = new Vector3(0, 2, 2)
    const target = new Vector3(0, 0, 0)
    let angle = 0

    camera.position = eye

    const frame = (delta: number) => {
      angle += delta / 1000
      if (angle > 360) angle -= 360

      model.rotation.setRotation(0, angle, 0) //  angle * 0.5, 0)

      camera.lookAt(target)
      scene.update(delta)
      renderer.render()
    }

    scene.update(0)
    frame(0)

    const engine = new Engine({
      onTick: function(delta) {
        frame(delta)
      },
    })

    const toggleEngine = function() {
      if (!engine.isRunning) engine.start()
      else engine.stop()
    }

    surface.container.addEventListener('click', toggleEngine)
    surface.container.addEventListener('touchend', toggleEngine)
  }
}
