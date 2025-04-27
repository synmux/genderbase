"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { Ticket } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Ticket3DProps {
  ticket: Ticket
  onClick: () => void
  isSelected: boolean
}

export function Ticket3D({ ticket, onClick, isSelected }: Ticket3DProps) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smoother animation
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  // Transform mouse position to rotation values
  const rotateX = useTransform(springY, [-100, 100], [10, -10])
  const rotateY = useTransform(springX, [-100, 100], [-10, 10])

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  // Get color for status badge
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "backlog":
        return "neon-badge-purple"
      case "todo":
        return "neon-badge-blue"
      case "in progress":
        return "neon-badge-yellow"
      case "in review":
        return "neon-badge-green"
      case "done":
        return "neon-badge-green"
      case "canceled":
        return "neon-badge-pink"
      default:
        return "neon-badge-purple"
    }
  }

  // Get color for priority badge
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "neon-badge-pink"
      case "high":
        return "neon-badge-yellow"
      case "medium":
        return "neon-badge-blue"
      case "low":
        return "neon-badge-green"
      default:
        return "neon-badge-purple"
    }
  }

  // Get border color based on ticket status
  const getBorderColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "backlog":
        return "neon-border-purple"
      case "todo":
        return "neon-border-blue"
      case "in progress":
        return "neon-border-yellow"
      case "in review":
        return "neon-border-green"
      case "done":
        return "neon-border-green"
      case "canceled":
        return "neon-border-pink"
      default:
        return "neon-border-purple"
    }
  }

  // Random animation delay for floating effect
  const [animDelay, setAnimDelay] = useState("0s")

  useEffect(() => {
    setAnimDelay(`${Math.random() * 2}s`)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-lg bg-synthwave-bg p-1 ${isSelected ? getBorderColor(ticket.Status) : "border border-synthwave-purple"} ${hovered ? "z-10" : "z-0"}`}
      style={{
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        animationDelay: animDelay,
      }}
      whileHover={{ scale: 1.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        y: [0, -10, 0],
        transition: {
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          delay: Number.parseFloat(animDelay),
        },
      }}
    >
      {/* Glowing edge effect */}
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-synthwave-pink via-synthwave-blue to-synthwave-purple opacity-50 blur-sm"></div>

      {/* Card content with 3D effect */}
      <div className="rounded-lg bg-synthwave-bg p-4" style={{ transform: "translateZ(20px)" }}>
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-bold">
            <span className="neon-blue">{ticket.ID}</span>
          </h3>
          <div className="flex space-x-2">
            {ticket.Status && <Badge className={getStatusColor(ticket.Status)}>{ticket.Status}</Badge>}
            {ticket.Priority && <Badge className={getPriorityColor(ticket.Priority)}>{ticket.Priority}</Badge>}
          </div>
        </div>

        <h2 className="mb-2 text-lg font-bold text-white">{ticket.Title}</h2>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          {ticket.Project && (
            <span className="rounded-md bg-synthwave-purple/30 px-2 py-1 text-xs text-synthwave-blue">
              {ticket.Project}
            </span>
          )}

          {ticket["Parent issue"] && (
            <span className="text-xs text-synthwave-pink">Child of: {ticket["Parent issue"]}</span>
          )}

          {ticket.Labels && (
            <div className="flex flex-wrap gap-1">
              {ticket.Labels.split(",").map((label) => (
                <Badge key={label.trim()} className="neon-badge-green">
                  {label.trim()}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 h-3 w-3 border-l-2 border-t-2 border-synthwave-pink"></div>
      <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-synthwave-blue"></div>
      <div className="absolute bottom-0 left-0 h-3 w-3 border-l-2 border-b-2 border-synthwave-blue"></div>
      <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-synthwave-pink"></div>
    </motion.div>
  )
}
