import { useEffect, useRef } from 'react'
import { Pause, Play } from 'lucide-react'

/** Decorative network field. No requests, tracking, or simulated live metrics. */
export function HackerAtmosphere({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const element = canvas.current
    const context = element?.getContext('2d')
    if (!element || !context) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let last = 0
    let width = 0
    let height = 0
    let pointer = { x: -1000, y: -1000 }
    let points: { x: number; y: number; vx: number; vy: number }[] = []
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const scale = Math.min(window.devicePixelRatio || 1, 1.5)
      element.width = width * scale
      element.height = height * scale
      context.setTransform(scale, 0, 0, scale, 0, 0)
      points = Array.from({ length: width < 650 ? 24 : 52 }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
      }))
    }
    const draw = (moving: boolean, step = 1) => {
      context.clearRect(0, 0, width, height)
      points.forEach((point, i) => {
        if (moving) {
          point.x = (point.x + point.vx * step + width) % width
          point.y = (point.y + point.vy * step + height) % height
        }
        context.fillStyle = 'rgba(112,255,165,.38)'
        context.fillRect(point.x, point.y, 2, 2)
        for (let j = i + 1; j < points.length; j++) {
          const other = points[j]
          const distance = Math.hypot(point.x - other.x, point.y - other.y)
          if (distance > 145) continue
          context.strokeStyle = `rgba(112,255,165,${(1 - distance / 145) * .11})`
          context.beginPath(); context.moveTo(point.x, point.y); context.lineTo(other.x, other.y); context.stroke()
        }
        if (moving && Math.hypot(point.x - pointer.x, point.y - pointer.y) < 170) {
          context.strokeStyle = 'rgba(112,255,165,.18)'
          context.beginPath(); context.moveTo(point.x, point.y); context.lineTo(pointer.x, pointer.y); context.stroke()
        }
      })
    }
    const tick = (now: number) => {
      if (now - last > 32) {
        draw(true, Math.min((now - last) / 16.67, 3))
        last = now
      }
      frame = requestAnimationFrame(tick)
    }
    const restart = () => {
      cancelAnimationFrame(frame)
      draw(false)
      if (enabled && !preference.matches && !document.hidden) { last = performance.now(); frame = requestAnimationFrame(tick) }
    }
    const onResize = () => { resize(); restart() }
    const onPointer = (event: PointerEvent) => { pointer = { x: event.clientX, y: event.clientY } }
    const onLeave = () => { pointer = { x: -1000, y: -1000 } }
    resize(); restart()
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', restart)
    preference.addEventListener('change', restart)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', restart)
      preference.removeEventListener('change', restart)
    }
  }, [enabled])
  return <>
    <div className="hacker-atmosphere" aria-hidden="true"><canvas ref={canvas} /><div className="ambient-orb orb-one" /><div className="ambient-orb orb-two" /><div className="code-rain">{['0101', '{ }', '0x17', '</>', '1010', '[ ]'].map((code, index) => <span key={code} style={{ left: `${9 + index * 17}%`, animationDelay: `${index * -3.7}s` }}>{code}</span>)}</div></div>
    <button className="motion-control" type="button" onClick={onToggle} aria-pressed={!enabled} aria-label={enabled ? 'Pause animations' : 'Resume animations'}>{enabled ? <Pause size={13} /> : <Play size={13} />}<span>{enabled ? 'PAUSE FX' : 'RESUME FX'}</span></button>
  </>
}
