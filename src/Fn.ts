export class Fn {
  static reverseEach = <T>(
    arr: T[],
    fn: (element: T, index: number) => void,
  ): void => {
    if (arr && arr.length > 0) {
      let i = arr.length
      while (--i >= 0) {
        fn(arr[i], i)
      }
    }
  }

  static eachPair = <T>(
    obj: { [p: string]: T },
    fn: (prop: string, value: T) => void,
  ): void => {
    if (obj) {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          fn(prop, obj[prop])
        }
      }
    }
  }

  static contains = <T>(arr: T[], el: T): boolean => {
    return arr ? arr.indexOf(el) !== -1 : false
  }

  static remove = <T>(arr: T[], el: T): T | null => {
    const i = arr ? arr.indexOf(el) : -1
    return i !== -1 ? arr.splice(i, 1)[0] : null
  }

  static last = <T>(arr: T[]): T | null => {
    if (arr && arr.length > 0) {
      return arr[arr.length - 1]
    }
    return null
  }

  static until = <T>(arr: T[], fn: (element: T) => boolean): void => {
    if (arr && arr.length > 0) {
      let i = 0
      const len = arr.length
      while (i < len) {
        if (fn(arr[i])) break
        i += 1
      }
    }
  }

  static reverseUntil = <T>(arr: T[], fn: (element: T) => boolean): void => {
    if (arr && arr.length > 0) {
      let i = arr.length
      while (--i >= 0) {
        if (fn(arr[i])) break
      }
    }
  }

  static merge = <First, Second>(
    first: First,
    second: Second,
  ): First & Second => {
    const result: Partial<First & Second> = {}
    for (const prop in first) {
      if (first.hasOwnProperty(prop)) {
        ;(result as First)[prop] = first[prop]
      }
    }
    for (const prop in second) {
      if (second.hasOwnProperty(prop)) {
        ;(result as Second)[prop] = second[prop]
      }
    }
    return result as First & Second
  }
}
