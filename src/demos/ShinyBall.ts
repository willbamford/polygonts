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
} from '../'

export class ShinyBallDemo {
  constructor() {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const mesh = SphereMesh.create({
      levelOfDetail: 3,
      spikiness: 0.0,
    })
    const model = Model.createFromMesh(mesh)
    model.polygons.forEach(polygon => {
      polygon.material = new Material({
        specular: new Color({ r: 1, g: 1, b: 1 }),
        shininess: 10,
      })
    })

    const width = 480
    const height = 480
    const aspectRatio = width / height

    // const surface = new SvgSurface({
    //   container,
    //   width,
    //   height,
    // })
    const surface = new CanvasSurface({
      container,
      width,
      height,
    })
    const scene = new Scene()
    const camera = new PerspectiveCamera({
      aspectRatio,
    })

    const redLight = new Light({
      color: Color.RED.clone(),
      specular: new Color({ r: 0.7, g: 0.7, b: 0.7 }),
      forward: new Vector3(0, 1, 0),
    })

    const greenLight = new Light({
      color: Color.GREEN.clone(),
      specular: new Color({ r: 0.7, g: 0.7, b: 0.7 }),
      forward: new Vector3(1, 0, 0),
    })

    const blueLight = new Light({
      color: Color.BLUE.clone(),
      specular: new Color({ r: 0.7, g: 0.7, b: 0.7 }),
      forward: new Vector3(0, 0, 1),
    })

    const root = new Entity()
    root
      .addChild(model)
      .addChild(camera)
      .addChild(redLight)
      .addChild(greenLight)
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
    const scale = 4
    model.scale.setScalar(scale)

    camera.position = eye

    const frame = (delta: number) => {
      angle += delta / 1000
      if (angle > 360) angle -= 360

      model.rotation.setRotationY(angle)
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
