import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Custom fallback. If omitted, a full-page branded message is shown. */
  fallback?: ReactNode
  /** Reset the boundary when this value changes (e.g. route pathname). */
  resetKey?: unknown
}

type State = { hasError: boolean }

/**
 * Catches render-time errors in its subtree so a single broken component
 * (or a failed lazy chunk) doesn't blank the whole app.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface in dev; wire to a real logger in production.
    if (import.meta.env.DEV) console.error('ErrorBoundary caught:', error, info)
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children
    if (this.props.fallback !== undefined) return this.props.fallback

    return (
      <section className="grid min-h-[70vh] place-items-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-brand-grad text-3xl">
            ✦
          </div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">Something glitched</h1>
          <p className="mx-auto mt-3 max-w-md text-white/55">
            A part of the page didn&apos;t load the way it should. Try reloading — it usually sorts
            itself out.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button onClick={() => window.location.reload()} className="btn btn-glow">
              Reload page
            </button>
            <a href="/" className="btn btn-ghost">
              Back home
            </a>
          </div>
        </div>
      </section>
    )
  }
}
