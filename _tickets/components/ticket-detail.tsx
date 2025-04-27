"use client"

import type { Ticket } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, ArrowUpRight, ArrowDownRight, Tag, User, Users, Calendar, FileText } from "lucide-react"

interface TicketDetailProps {
  ticket: Ticket
  allTickets: Ticket[]
  onTicketSelect: (ticket: Ticket) => void
}

export function TicketDetail({ ticket, allTickets, onTicketSelect }: TicketDetailProps) {
  // Find parent ticket
  const parentTicket = ticket["Parent issue"] ? allTickets.find((t) => t.ID === ticket["Parent issue"]) : null

  // Find child tickets
  const childTickets = allTickets.filter((t) => t["Parent issue"] === ticket.ID)

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
    <div className="h-full overflow-auto bg-monokai-bg p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-monokai-blue">Ticket Details</h2>
        <Button variant="ghost" size="icon" className="text-monokai-fg hover:bg-monokai-red/20 hover:text-monokai-red">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-monokai-orange">{ticket.ID}</h3>
            <div className="flex space-x-2">
              {ticket.Status && <Badge className={getStatusColor(ticket.Status)}>{ticket.Status}</Badge>}
              {ticket.Priority && <Badge className={getPriorityColor(ticket.Priority)}>{ticket.Priority}</Badge>}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-monokai-fg">{ticket.Title}</h1>
        </div>

        {ticket.Project && (
          <div className="rounded-md border border-monokai-purple/30 bg-monokai-purple/10 p-3">
            <h3 className="mb-1 flex items-center text-sm font-medium text-monokai-purple">
              <Calendar className="mr-2 h-4 w-4" />
              Project
            </h3>
            <p className="text-monokai-fg">{ticket.Project}</p>
          </div>
        )}

        {ticket.Description && (
          <div>
            <h3 className="mb-1 flex items-center text-sm font-medium text-monokai-blue">
              <FileText className="mr-2 h-4 w-4" />
              Description
            </h3>
            <div className="rounded-md border border-monokai-lightGray bg-monokai-darkGray p-3">
              <p className="whitespace-pre-wrap text-monokai-fg">{ticket.Description}</p>
            </div>
          </div>
        )}

        {(ticket.Assignee || ticket.Creator) && (
          <div className="grid grid-cols-2 gap-4">
            {ticket.Assignee && (
              <div className="rounded-md border border-monokai-green/30 bg-monokai-green/10 p-3">
                <h3 className="mb-1 flex items-center text-sm font-medium text-monokai-green">
                  <User className="mr-2 h-4 w-4" />
                  Assignee
                </h3>
                <p className="text-monokai-fg">{ticket.Assignee}</p>
              </div>
            )}
            {ticket.Creator && (
              <div className="rounded-md border border-monokai-yellow/30 bg-monokai-yellow/10 p-3">
                <h3 className="mb-1 flex items-center text-sm font-medium text-monokai-yellow">
                  <Users className="mr-2 h-4 w-4" />
                  Creator
                </h3>
                <p className="text-monokai-fg">{ticket.Creator}</p>
              </div>
            )}
          </div>
        )}

        {ticket.Labels && (
          <div>
            <h3 className="mb-1 flex items-center text-sm font-medium text-monokai-yellow">
              <Tag className="mr-2 h-4 w-4" />
              Labels
            </h3>
            <div className="flex flex-wrap gap-2">
              {ticket.Labels.split(",").map((label) => (
                <Badge key={label.trim()} className="border-monokai-yellow bg-monokai-yellow/10 text-monokai-yellow">
                  {label.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {parentTicket && (
          <div>
            <h3 className="mb-1 flex items-center text-sm font-medium text-monokai-orange">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Parent Issue
            </h3>
            <Card
              className="cursor-pointer border-monokai-orange/30 bg-monokai-orange/10 p-3 hover:bg-monokai-orange/20"
              onClick={() => onTicketSelect(parentTicket)}
            >
              <div className="flex items-center">
                <div>
                  <span className="font-medium text-monokai-orange">{parentTicket.ID}</span> - {parentTicket.Title}
                </div>
              </div>
            </Card>
          </div>
        )}

        {childTickets.length > 0 && (
          <div>
            <h3 className="mb-1 flex items-center text-sm font-medium text-monokai-green">
              <ArrowDownRight className="mr-2 h-4 w-4" />
              Child Issues ({childTickets.length})
            </h3>
            <div className="space-y-2">
              {childTickets.map((childTicket) => (
                <Card
                  key={childTicket.ID}
                  className="cursor-pointer border-monokai-green/30 bg-monokai-green/10 p-3 hover:bg-monokai-green/20"
                  onClick={() => onTicketSelect(childTicket)}
                >
                  <div className="flex items-center">
                    <div>
                      <span className="font-medium text-monokai-green">{childTicket.ID}</span> - {childTicket.Title}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
