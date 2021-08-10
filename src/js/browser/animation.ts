type Style = { [P in keyof CSSStyleDeclaration]?: string | number }

type Options = {
  time?: number
  delay?: number
}

type PromiseFn = (resolve: (value: number | PromiseLike<number>) => void, reject: (reason?: any) => void) => void

type Queue = Array<{ pf: PromiseFn, delay: number }>

type StartFn = {
  (queue: Queue): void
  isRun?: boolean
}

const start:StartFn = (queue: Queue) => {
  if (start.isRun) return
  start.isRun = Boolean(queue.length)
  const fn = () => {
    if (!queue.length) return
    const { pf, delay } = queue.shift()!
    const timer = setTimeout(() => {
      new Promise(pf).then(() => fn())
      clearTimeout(timer)
    }, delay)
  }
  fn()
}

export const animation = (ele: HTMLElement) => {
  const map = new WeakMap<HTMLElement, Queue>()
  if (!map.has(ele)) map.set(ele, [])

  const run = (style: Style, options?: Options) => {
    const queue = map.get(ele)

    options = Object.assign({ time: 200, delay: 0 } , options)

    queue?.push({
      pf: (resolve: (value?: any) => void, reject: (reason?: any) => void) => {
        const eleStyle = getComputedStyle(ele)
        const startValue:Style = {}
        const changeValue:Style = {}
        const startTime = Date.now()
        for (const key in style) {
          if (!Object.prototype.hasOwnProperty.call(style, key)) return
          const value = parseFloat(eleStyle[key])
          startValue[key] = isNaN(value) ? 0 : value
          changeValue[key] = parseFloat(style[key] as string) - (startValue[key] as number)
        }
        
        const execute = () => {
          const nowTime = Date.now() - startTime
          let proportion = nowTime / options?.time!
          proportion >= 1 ? (proportion = 1) : requestAnimationFrame(execute)
          for (const key in changeValue) {
            if (!Object.prototype.hasOwnProperty.call(changeValue, key)) return
            const val = proportion * (changeValue[key] as number) + (startValue[key] as number)
            if (key.toLowerCase() === "opacity") {
              ele.style[key] = val.toString()
              if (val === 0) ele.style.display = `none`;
            } else {
              ele.style[key] = `${val}px`;
            }
          }
          if (proportion === 1) resolve()
        }
        execute()
      },
      delay: options?.delay!
    })

    start(queue!)

    return { run }
  }

  return { run }
}