export interface CrashRound {
  history: number[]
  current: number
  crashedAt: number
}

type UpdateFn = (round: CrashRound) => void
type CrashFn = () => void

export class CrashService {
  private history: number[] = []
  private updateFns = new Set<UpdateFn>()
  private crashFns = new Set<CrashFn>()
  private intervalId: number | null = null
  private round: CrashRound = {
    history: [],
    current: 1.0,
    crashedAt: 1.0,
  }

  constructor(
    private tickMs = 100,
    private crashMax = 10,
  ) {}

  start() {
    this.resetRound()
    this.intervalId = window.setInterval(() => this.tick(), this.tickMs)
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  onUpdate(fn: UpdateFn) {
    this.updateFns.add(fn)
  }
  offUpdate(fn: UpdateFn) {
    this.updateFns.delete(fn)
  }

  onCrash(fn: CrashFn) {
    this.crashFns.add(fn)
  }
  offCrash(fn: CrashFn) {
    this.crashFns.delete(fn)
  }

  private resetRound() {
    this.round.history = [...this.history]
    this.round.current = 1.0
    this.round.crashedAt = parseFloat((1 + Math.random() * (this.crashMax - 1)).toFixed(2))
    this.notify()
  }

  private tick() {
    if (this.round.current >= this.round.crashedAt) {
      // Сохраняем результат и вызываем коллбэки краша
      this.history.unshift(this.round.crashedAt)
      this.crashFns.forEach((fn) => fn())

      this.stop()
      // Новый раунд через 5 секунд
      setTimeout(() => this.start(), 5000)
      return
    }

    this.round.current = parseFloat((this.round.current * 1.01).toFixed(2))
    this.notify()
  }

  private notify() {
    const snapshot = { ...this.round }
    this.updateFns.forEach((fn) => fn(snapshot))
  }
}
