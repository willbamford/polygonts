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

export class SpikyBallDemo {
  constructor() {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const mesh = SphereMesh.create({
      levelOfDetail: 3,
      spikiness: 0.1,
    })
    const model = Model.createFromMesh(mesh)

    const sceneWidth = 320
    const sceneHeight = 320
    const aspectRatio = sceneWidth / sceneHeight

    const surface = new SvgSurface({
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
      // .addChild(greenLight)
      .addChild(blueLight)
    scene.root = root
    scene.revalidate()

    const renderer = new Renderer({
      surface,
      scene,
    })

    const eye = new Vector3(5, 5, 5)
    const target = new Vector3(0, 0, 0)
    let angle = 0
    let scale = 4

    camera.position = eye

    const frame = delta => {
      angle += delta / 2000
      if (angle > 360) angle -= 360

      // scale = Math.max(1, scale - 0.0005 * delta)

      // model.rotation.setRotationY(angle)
      model.rotation.setRotation(-angle, angle * 0.5, 0)
      model.scale.setScalar(scale)

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
