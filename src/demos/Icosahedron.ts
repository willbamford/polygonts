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
import { CubeMesh } from '../meshes'

export class IcosahedronDemo {
  constructor() {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const mesh = CubeMesh.create()
    const model = Model.createFromMesh(mesh)

    const sceneWidth = 320
    const sceneHeight = 320
    const aspectRatio = sceneWidth / sceneHeight

    const surface = new CanvasSurface({
      container,
      width: sceneWidth,
      height: sceneHeight,
    })
    const scene = new Scene()
    const camera = new PerspectiveCamera({
      aspectRatio,
    })

    const redLight = new Light({
      color: Color.RED.clone(),
      specular: null,
      forward: new Vector3(0, 1, 0),
    })

    const greenLight = new Light({
      color: Color.GREEN.clone(),
      specular: null,
      forward: new Vector3(1, 0, 0),
    })

    const blueLight = new Light({
      color: Color.BLUE.clone(),
      specular: null,
      forward: new Vector3(0, 0, 1),
    })

    const root = new Entity()
    root.addChild(model).addChild(camera)
    root
      .addChild(redLight)
      .addChild(greenLight)
      .addChild(blueLight)
    scene.root = root
    scene.revalidate()

    const renderer = new Renderer({
      surface,
      scene,
    })

    const eye = new Vector3(3, 3, 3)
    const target = new Vector3(0, 0, 0)
    let angle = 0

    camera.position = eye

    const frame = delta => {
      angle += delta / 1000
      if (angle > 360) angle -= 360

      model.rotation.setRotation(angle, angle * 0.5, 0)

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
