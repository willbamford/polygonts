type Time = number
type Int = number

type FpsCounterParameters = {
  sampleSize?: Int
  callback: (fps: Int) => void
}

export class FpsCounter {
  time: number
  frame: Int
  framesPerSecond: Int
  sampleSize?: Int
  callback: (fps: Int) => void

  constructor(opts: FpsCounterParameters) {
    this.time = 0
    this.frame = 0
    this.framesPerSecond = 0
    this.sampleSize = opts.sampleSize || 100
    this.callback = opts.callback
  }

  tick(delta: Time) {
    this.frame += 1
    this.time += delta

    if (this.frame === this.sampleSize) {
      this.framesPerSecond = Number.parseInt(
        ((this.frame / this.time) * 1000).toFixed(2),
      )
      if (this.callback) {
        this.callback(this.framesPerSecond)
      }
      this.time = 0
      this.frame = 0
    }
  }
}
