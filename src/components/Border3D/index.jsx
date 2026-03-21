// src/components/Border3D/index.jsx
import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

const isMobile = () => window.innerWidth < 768
const BORDER_THICKNESS_MIN = isMobile() ? 6 : 30
const BORDER_THICKNESS_MAX = isMobile() ? 20 : 80
const BORDER_RADIUS = 36
const VELOCITY_MAX = 3

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// SDF rounded-rect — pixels à l'intérieur du trou sont discardés
const fragmentShader = `
uniform vec2 uSize;
uniform float uThickness;
uniform float uRadius;
varying vec2 vUv;

void main() {
  vec2 pixel = vUv * uSize;
  vec2 inner = uSize * 0.5 - vec2(uThickness);
  vec2 centered = abs(pixel - uSize * 0.5);
  vec2 q = centered - inner + vec2(uRadius);
  float dist = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
  if (dist < 0.0) discard;
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`

function BorderMesh() {
  const { size } = useThree()
  const meshRef = useRef(null)
  const animated = useRef({ value: BORDER_THICKNESS_MIN })
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const lastScrollTime = useRef(Date.now())
  const stopTimer = useRef(null)

  const uniforms = useMemo(() => ({
    uSize: { value: new THREE.Vector2(size.width, size.height) },
    uThickness: { value: BORDER_THICKNESS_MIN },
    uRadius: { value: BORDER_RADIUS },
  }), [])

  // Mise à jour taille sans recréer le matériau
  useEffect(() => {
    uniforms.uSize.value.set(size.width, size.height)
    if (meshRef.current) {
      meshRef.current.geometry.dispose()
      meshRef.current.geometry = new THREE.PlaneGeometry(size.width, size.height)
    }
  }, [size.width, size.height])

  // Vélocité scroll → épaisseur + retour élastique
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      const deltaY = Math.abs(window.scrollY - lastScrollY.current)
      const deltaTime = Math.max(now - lastScrollTime.current, 1)
      const velocity = deltaY / deltaTime

      lastScrollY.current = window.scrollY
      lastScrollTime.current = now

      const raw = Math.min(velocity / VELOCITY_MAX, 1)
      const target = BORDER_THICKNESS_MIN + (raw * raw) * (BORDER_THICKNESS_MAX - BORDER_THICKNESS_MIN)

      if (target > animated.current.value) {
        gsap.to(animated.current, {
          value: target,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: true,
        })
      }

      clearTimeout(stopTimer.current)
      stopTimer.current = setTimeout(() => {
        gsap.to(animated.current, {
          value: BORDER_THICKNESS_MIN,
          duration: 1,
          ease: 'back.out(3)',
          overwrite: true,
        })
      }, 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(stopTimer.current)
    }
  }, [])

  // Mise à jour uniform — aucun rebuild géométrie
  useFrame(() => {
    uniforms.uThickness.value = animated.current.value
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[size.width, size.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

export default function Border3D() {
  return (
    <Canvas
      orthographic
      flat
      camera={{ zoom: 1, near: 0.1, far: 1000, position: [0, 0, 100] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <BorderMesh />
    </Canvas>
  )
}
