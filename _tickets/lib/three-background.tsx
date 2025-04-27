"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Grid setup
    const gridSize = 20
    const gridDivisions = 20
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0xff00ff, 0x00ffff)
    gridHelper.position.y = -3
    gridHelper.rotation.x = Math.PI / 8
    scene.add(gridHelper)

    // Sun setup
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32)
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0066,
      transparent: true,
      opacity: 0.8,
    })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    sun.position.set(-5, 2, -10)
    scene.add(sun)

    // Glow effect for sun
    const sunGlowGeometry = new THREE.SphereGeometry(1.5, 32, 32)
    const sunGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0066,
      transparent: true,
      opacity: 0.2,
    })
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial)
    sun.add(sunGlow)

    // Stars
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
    })

    const starsVertices = []
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 100
      starsVertices.push(x, y, z)
    }

    starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Mountains
    const mountainGeometry = new THREE.BufferGeometry()
    const mountainMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      linewidth: 1,
    })

    const mountainPoints = []
    const mountainSegments = 50
    const mountainWidth = 30
    const mountainHeight = 3

    for (let i = 0; i <= mountainSegments; i++) {
      const x = (i / mountainSegments) * mountainWidth - mountainWidth / 2
      const y = Math.sin(i * 0.5) * Math.random() * mountainHeight - 2
      const z = -15
      mountainPoints.push(new THREE.Vector3(x, y, z))
    }

    mountainGeometry.setFromPoints(mountainPoints)
    const mountains = new THREE.Line(mountainGeometry, mountainMaterial)
    scene.add(mountains)

    // Second mountain range
    const mountainGeometry2 = new THREE.BufferGeometry()
    const mountainMaterial2 = new THREE.LineBasicMaterial({
      color: 0xff00ff,
      linewidth: 1,
    })

    const mountainPoints2 = []

    for (let i = 0; i <= mountainSegments; i++) {
      const x = (i / mountainSegments) * mountainWidth - mountainWidth / 2
      const y = Math.sin(i * 0.3) * Math.random() * mountainHeight - 2.5
      const z = -10
      mountainPoints2.push(new THREE.Vector3(x, y, z))
    }

    mountainGeometry2.setFromPoints(mountainPoints2)
    const mountains2 = new THREE.Line(mountainGeometry2, mountainMaterial2)
    scene.add(mountains2)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate grid
      gridHelper.rotation.z += 0.002

      // Animate stars
      stars.rotation.y += 0.0005
      stars.rotation.x += 0.0002

      // Pulse sun
      const time = Date.now() * 0.001
      const scale = 1 + Math.sin(time) * 0.1
      sun.scale.set(scale, scale, scale)

      // Render
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose resources
      gridHelper.geometry.dispose()
      sunGeometry.dispose()
      sunMaterial.dispose()
      sunGlowGeometry.dispose()
      sunGlowMaterial.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
      mountainGeometry.dispose()
      mountainMaterial.dispose()
      mountainGeometry2.dispose()
      mountainMaterial2.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10" />
}
