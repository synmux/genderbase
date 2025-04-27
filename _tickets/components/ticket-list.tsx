"use client"

import type { Ticket } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitMerge, GitBranch } from "lucide-react"

interface TicketListProps {
  tickets: Ticket[]
  selectedTicket: Ticket | null
  onTicketSelect: (ticket: Ticket) => void
}

export function TicketList({ tickets, selectedTicket, onTicketSelect }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-monokai-gray">No tickets match your filters.</p>
      </div>
    )
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

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-monokai-fg">
          Tickets{" "}
          <span className="rounded-full bg-monokai-blue/20 px-2 py-1 text-sm text-monokai-blue">{tickets.length}</span>
        </h2>
      </div>

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <Card
            key={ticket.ID}
            className={`ticket-card cursor-pointer border-monokai-lightGray bg-monokai-darkGray transition-all hover:border-monokai-blue ${
              selectedTicket?.ID === ticket.ID ? "animate-pulse-glow border-monokai-blue" : ""
            }`}
            onClick={() => onTicketSelect(ticket)}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base font-medium text-monokai-fg">
                  <span className="text-monokai-blue">{ticket.ID}</span> {ticket.Title}
                </CardTitle>
                <div className="flex space-x-2">
                  {ticket.Status && <Badge className={getStatusColor(ticket.Status)}>{ticket.Status}</Badge>}
                  {ticket.Priority && <Badge className={getPriorityColor(ticket.Priority)}>{ticket.Priority}</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {ticket.Project && (
                  <span className="rounded-md bg-monokai-purple/20 px-2 py-1 text-xs text-monokai-purple">
                    {ticket.Project}
                  </span>
                )}
                {ticket["Parent issue"] && (
                  <span className="flex items-center text-xs text-monokai-orange">
                    <GitMerge className="mr-1 h-3 w-3" />
                    Child of: {ticket["Parent issue"]}
                  </span>
                )}
                {!ticket["Parent issue"] && tickets.some((t) => t["Parent issue"] === ticket.ID) && (
                  <span className="flex items-center text-xs text-monokai-green">
                    <GitBranch className="mr-1 h-3 w-3" />
                    Parent
                  </span>
                )}
                {ticket.Labels && (
                  <div className="flex flex-wrap gap-1">
                    {ticket.Labels.split(",").map((label) => (
                      <Badge
                        key={label.trim()}
                        variant="outline"
                        className="border-monokai-yellow bg-monokai-yellow/10 text-xs text-monokai-yellow"
                      >
                        {label.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
