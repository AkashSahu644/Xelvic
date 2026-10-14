import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * The hero's ambient layer: a slow field of dust and a few very thin orbits,
 * with nothing in the middle of them. The phone stands there; this is the depth
 * behind it rather than a second thing competing for the eye.
 *
 * It used to sculpt a large distorted icosahedron at the centre. Against a
 * product shot that read as decoration the phone had to fight through, and it
 * is a shape with nothing to do with the app. Orbits say the same thing about
 * motion — this is a product about people in motion — without ever becoming
 * the subject.
 *
 * Nothing here is lit, so the scene carries no lights: every material is
 * unlit and every colour is a brand pink.
 */

function OrbitRing({
  radius,
  speed,
  tilt,
  color,
  opacity,
}: {
  radius: number
  speed: number
  tilt: [number, number, number]
  color: string
  opacity: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.006, 12, 220]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function Starfield() {
  const positions = useMemo(() => {
    const n = 900
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 4 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])
  const ref = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03
  })
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#ffb3d5" size={0.035} sizeAttenuation depthWrite={false} />
    </Points>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      /* Pulled back from 6 so the rings clear the phone and read as orbits
         passing behind it rather than as circles drawn around it. */
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Starfield />
        {/* Three rings, each on its own plane and its own speed, so they cross
            the frame at different angles instead of pulsing as one shape. */}
        <OrbitRing radius={2.6} speed={0.06} tilt={[Math.PI / 2.15, 0.22, 0]} color="#ff8fc4" opacity={0.34} />
        <OrbitRing radius={3.2} speed={-0.045} tilt={[Math.PI / 2.6, -0.3, 0]} color="#ec4899" opacity={0.24} />
        <OrbitRing radius={3.9} speed={0.03} tilt={[Math.PI / 1.9, 0.1, 0]} color="#ffb3d5" opacity={0.15} />
      </Suspense>
    </Canvas>
  )
}
