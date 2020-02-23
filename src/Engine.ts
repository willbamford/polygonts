import { FpsCounter } from './FpsCounter'

type Time = number

type EngineParameters = {
  onTick: (delta: Time) => void
}

export class Engine {
  onTick: (delta: Time) => void
  requestId: number
  isRunning: boolean
  lastTime: number | null
  fpsCounter: FpsCounter

  constructor(opts: EngineParameters) {
    this.onTick = opts.onTick
    this.requestId = null
    this.isRunning = false
    this.lastTime = null
    this.fpsCounter = new FpsCounter({
      sampleSize: 100,
      callback: framesPerSecond => {
        console.log('FPS: ' + framesPerSecond)
      },
    })
  }

  start(): void {
    if (!this.isRunning) {
      this.lastTime = null
      this.requestId = window.requestAnimationFrame(this.tick.bind(this))
      this.isRunning = true
    }
  }

  stop(): void {
    if (this.isRunning) {
      window.cancelAnimationFrame(this.requestId)
      this.isRunning = false
    }
  }

  tick(): void {
    const currentTime = Date.now()
    let delta = 0

    if (this.lastTime) {
      delta = currentTime - this.lastTime
    }

    this.onTick(delta)

    this.lastTime = currentTime
    this.requestId = window.requestAnimationFrame(this.tick.bind(this))
    this.fpsCounter.tick(delta)
  }
}
