"use client"

import { useEffect, useState } from "react"
import type { Ticket } from "@/lib/types"
import { buildTicketHierarchy } from "@/lib/data-utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight } from "lucide-react"

interface RelationshipViewProps {
  tickets: Ticket[]
  filteredTickets: Ticket[]
  onTicketSelect: (ticket: Ticket) => void
}

interface TicketNode {
  ticket: Ticket
  children: TicketNode[]
  level: number
}

export function RelationshipView({ tickets, filteredTickets, onTicketSelect }: RelationshipViewProps) {
  const [hierarchyData, setHierarchyData] = useState<TicketNode[]>([])
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

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
        return "bg-monokai-gray text-monokai-fg badge-glow-gray"
      case "todo":
        return "bg-monokai-blue/20 text-monokai-blue badge-glow-blue"
      case "in progress":
        return "bg-monokai-orange/20 text-monokai-orange badge-glow-orange"
      case "in review":
        return "bg-monokai-purple/20 text-monokai-purple badge-glow-purple"
      case "done":
        return "bg-monokai-green/20 text-monokai-green badge-glow-green"
      case "canceled":
        return "bg-monokai-red/20 text-monokai-red badge-glow-red"
      default:
        return "bg-monokai-gray/20 text-monokai-fg"
    }
  }

  // Get color for priority badge
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "bg-monokai-red/20 text-monokai-red badge-glow-red"
      case "high":
        return "bg-monokai-orange/20 text-monokai-orange badge-glow-orange"
      case "medium":
        return "bg-monokai-yellow/20 text-monokai-yellow badge-glow-yellow"
      case "low":
        return "bg-monokai-green/20 text-monokai-green badge-glow-green"
      default:
        return "bg-monokai-gray/20 text-monokai-fg"
    }
  }

  // Get connection line color based on level
  const getConnectionColor = (level: number) => {
    const colors = [
      "border-monokai-blue",
      "border-monokai-green",
      "border-monokai-purple",
      "border-monokai-orange",
      "border-monokai-yellow",
      "border-monokai-red",
    ]
    return colors[level % colors.length]
  }

  const renderNode = (node: TicketNode) => {
    const hasChildren = node.children.length > 0
    const isExpanded = expandedNodes.has(node.ticket.ID)
    const connectionColor = getConnectionColor(node.level)

    return (
      <div key={node.ticket.ID} className="mb-2 animate-float" style={{ animationDelay: `${node.level * 0.1}s` }}>
        <div
          className="relative ml-[calc(24px*var(--level))] flex items-start"
          style={{ "--level": node.level } as any}
        >
          {node.level > 0 && (
            <div
              className={`absolute -left-6 top-4 h-8 w-6 border-b border-l ${connectionColor}`}
              style={{ left: "-24px" }}
            />
          )}

          {hasChildren && (
            <button
              onClick={() => toggleNode(node.ticket.ID)}
              className="mr-2 mt-1.5 flex h-6 w-6 items-center justify-center rounded-sm border border-monokai-lightGray bg-monokai-darkGray text-xs text-monokai-fg hover:bg-monokai-lightGray hover:text-monokai-blue"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
          {!hasChildren && <div className="mr-2 w-6" />}

          <Card
            className="ticket-card flex-1 cursor-pointer border-monokai-lightGray bg-monokai-darkGray p-3 transition-all hover:border-monokai-blue"
            onClick={() => onTicketSelect(node.ticket)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-monokai-fg">
                  <span className="text-monokai-blue">{node.ticket.ID}</span> {node.ticket.Title}
                </div>
                {node.ticket.Project && <div className="mt-1 text-sm text-monokai-purple">{node.ticket.Project}</div>}
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
          </Card>
        </div>

        {isExpanded && node.children.length > 0 && (
          <div className="mt-2 space-y-2">{node.children.map((child) => renderNode(child))}</div>
        )}
      </div>
    )
  }

  if (hierarchyData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-monokai-gray">No tickets match your filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-monokai-green">Relationship View</h2>
      </div>

      <div className="space-y-2">{hierarchyData.map((node) => renderNode(node))}</div>
    </div>
  )
}
