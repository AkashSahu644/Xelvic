import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    // Deep link to a section (e.g. /whats-new#sparks). The target may live in a
    // lazy-loaded chunk that has not mounted yet, so keep looking for a moment
    // rather than giving up on the first frame.
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let timer = 0
    const look = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
      if (tries++ < 20) timer = window.setTimeout(look, 50)
    }
    look()
    return () => window.clearTimeout(timer)
  }, [pathname, hash])
  return null
}
