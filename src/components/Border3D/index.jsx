// src/components/Border3D/index.jsx
import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function buildBorderShape(w, h, thickness, radius) {
  const ow = w / 2, oh = h / 2
  const iw = ow - thickness, ih = oh - thickness
  const r = Math.min(radius, iw, ih)

  const shape = new THREE.Shape()
  shape.moveTo(-ow, -oh)
  shape.lineTo( ow, -oh)
  shape.lineTo( ow,  oh)
  shape.lineTo(-ow,  oh)
  shape.closePath()

  const hole = new THREE.Path()
  hole.moveTo(-iw + r, -ih)
  hole.lineTo( iw - r, -ih)
  hole.absarc( iw - r, -ih + r, r, -Math.PI / 2, 0, false)
  hole.lineTo( iw,  ih - r)
  hole.absarc( iw - r,  ih - r, r, 0, Math.PI / 2, false)
  hole.lineTo(-iw + r,  ih)
  hole.absarc(-iw + r,  ih - r, r, Math.PI / 2, Math.PI, false)
  hole.lineTo(-iw, -ih + r)
  hole.absarc(-iw + r, -ih + r, r, Math.PI, Math.PI * 1.5, false)
  hole.closePath()

  shape.holes.push(hole)
  return new THREE.ShapeGeometry(shape)
}

function BorderMesh() {
  const { size } = useThree()
  const meshRef = useRef(null)
  const [geometry, setGeometry] = useState(null)

  // Rebuild geometry on resize, dispose old one
  useEffect(() => {
    const geo = buildBorderShape(size.width, size.height, 20, 36)
    setGeometry(geo)
    return () => geo.dispose()
  }, [size.width, size.height])

  // Scroll animation — runs once on mount
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return

    mesh.rotation.x = THREE.MathUtils.degToRad(-8)
    mesh.rotation.y = THREE.MathUtils.degToRad(-3)

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        mesh.rotation.x = THREE.MathUtils.degToRad(-8 + self.progress * 20)
      },
    })

    return () => trigger.kill()
  }, [])

  if (!geometry) return null

  return (
    <mesh ref={meshRef}>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function Border3D() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 1, near: 0.1, far: 1000, position: [0, 0, 100] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <BorderMesh />
    </Canvas>
  )
}
