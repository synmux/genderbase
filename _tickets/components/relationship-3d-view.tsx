"use client"

import { useEffect, useState, useRef } from "react"
import type { Ticket } from "@/lib/types"
import { buildTicketHierarchy } from "@/lib/data-utils"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Relationship3DViewProps {
  tickets: Ticket[]
  filteredTickets: Ticket[]
  onTicketSelect: (ticket: Ticket) => void
}

interface TicketNode {
  ticket: Ticket
  children: TicketNode[]
  level: number
}

export function Relationship3DView({ tickets, filteredTickets, onTicketSelect }: Relationship3DViewProps) {
  const [hierarchyData, setHierarchyData] = useState<TicketNode[]>([])
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Build hierarchy from filtered tickets, but include necessary parents
    const hierarchy = buildTicketHierarchy(tickets, filteredTickets)
    setHierarchyData(hierarchy)

    // Auto-expand all nodes initially
    const nodeIds = new Set<string>()
    const collectIds = (nodes: TicketNode[]) => {
      nodes.forEach((node) => {
        nodeIds.add(node.ticket.ID)
        if (node.children.length > 0) {
          collectIds(node.children)
        }
      })
    }
    collectIds(hierarchy)
    setExpandedNodes(nodeIds)
  }, [tickets, filteredTickets])

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
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

  // Get connection line color based on level
  const getConnectionColor = (level: number) => {
    const colors = [
      "from-synthwave-pink to-synthwave-blue",
      "from-synthwave-blue to-synthwave-green",
      "from-synthwave-green to-synthwave-yellow",
      "from-synthwave-yellow to-synthwave-purple",
      "from-synthwave-purple to-synthwave-pink",
    ]
    return colors[level % colors.length]
  }

  const renderNode = (node: TicketNode) => {
    const hasChildren = node.children.length > 0
    const isExpanded = expandedNodes.has(node.ticket.ID)
    const connectionColor = getConnectionColor(node.level)
    const delay = node.level * 0.1

    return (
      <motion.div
        key={node.ticket.ID}
        className="mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
      >
        <div
          className="relative ml-[calc(24px*var(--level))] flex items-start"
          style={{ "--level": node.level } as any}
        >
          {node.level > 0 && (
            <div className="absolute left-[-24px] top-4 h-8 w-6">
              <div
                className={`absolute h-full w-full border-b border-l bg-gradient-to-r ${connectionColor} opacity-70`}
              ></div>
              <div className="absolute h-full w-full border-b border-l border-white/20"></div>
            </div>
          )}

          {hasChildren && (
            <button
              onClick={() => toggleNode(node.ticket.ID)}
              className="mr-2 mt-1.5 flex h-6 w-6 items-center justify-center rounded-sm border border-synthwave-blue bg-synthwave-darkPurple text-xs text-white hover:bg-synthwave-blue/20 hover:text-synthwave-blue"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
          {!hasChildren && <div className="mr-2 w-6" />}

          <motion.div
            className="card-3d w-full cursor-pointer rounded-lg border border-synthwave-purple bg-synthwave-darkPurple p-4"
            whileHover={{ scale: 1.02 }}
            onClick={() => onTicketSelect(node.ticket)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-white">
                  <span className="neon-blue">{node.ticket.ID}</span> {node.ticket.Title}
                </div>
                {node.ticket.Project && <div className="mt-1 text-sm text-synthwave-purple">{node.ticket.Project}</div>}
              </div>
              <div className="flex space-x-2">
                {node.ticket.Status && (
                  <Badge className={getStatusColor(node.ticket.Status)}>{node.ticket.Status}</Badge>
                )}
                {node.ticket.Priority && (
                  <Badge className={getPriorityColor(node.ticket.Priority)}>{node.ticket.Priority}</Badge>
                )}
              </div>
            </div>

            {/* Animated corner accents */}
            <div className="absolute top-0 left-0 h-3 w-3 border-l-2 border-t-2 border-synthwave-pink"></div>
            <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-synthwave-blue"></div>
            <div className="absolute bottom-0 left-0 h-3 w-3 border-l-2 border-b-2 border-synthwave-blue"></div>
            <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-synthwave-pink"></div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && node.children.length > 0 && (
            <motion.div
              className="mt-2 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {node.children.map((child) => renderNode(child))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  if (hierarchyData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-synthwave-blue">No tickets match your filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold uppercase tracking-wider text-synthwave-green font-orbitron">
          <span className="neon-green">RELATIONSHIP VIEW</span>
        </h2>
      </div>

      <div className="space-y-2">{hierarchyData.map((node) => renderNode(node))}</div>
    </div>
  )
}
