"use client"

import { useState, useEffect } from "react"
import type { Ticket } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ArrowUpRight, ArrowDownRight, Tag, User, Users, Calendar, FileText, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface FuturisticTicketDetailProps {
  ticket: Ticket
  allTickets: Ticket[]
  onTicketSelect: (ticket: Ticket) => void
  onClose: () => void
}

export function FuturisticTicketDetail({ ticket, allTickets, onTicketSelect, onClose }: FuturisticTicketDetailProps) {
  // Find parent ticket
  const parentTicket = ticket["Parent issue"] ? allTickets.find((t) => t.ID === ticket["Parent issue"]) : null

  // Find child tickets
  const childTickets = allTickets.filter((t) => t["Parent issue"] === ticket.ID)

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

  // Animated text reveal
  const [textRevealed, setTextRevealed] = useState(false)

  useEffect(() => {
    setTextRevealed(false)
    const timer = setTimeout(() => {
      setTextRevealed(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [ticket.ID])

  return (
    <motion.div
      className="h-full overflow-auto bg-synthwave-bg p-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <motion.h2
          className="text-xl font-bold uppercase tracking-wider text-synthwave-blue font-orbitron"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="neon-blue font-orbitron">TICKET DETAILS</span>
        </motion.h2>
        <Button variant="ghost" size="icon" className="neon-btn neon-btn-pink" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-synthwave-orange">
              <span className="neon-pink font-orbitron">{ticket.ID}</span>
            </h3>
            <div className="flex space-x-2">
              {ticket.Status && <Badge className={getStatusColor(ticket.Status)}>{ticket.Status}</Badge>}
              {ticket.Priority && <Badge className={getPriorityColor(ticket.Priority)}>{ticket.Priority}</Badge>}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">
            {textRevealed ? ticket.Title : <span className="terminal-text">{ticket.Title}</span>}
          </h1>
        </motion.div>

        {ticket.Project && (
          <motion.div
            className="rounded-md border border-synthwave-purple/30 bg-synthwave-purple/10 p-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-1 flex items-center text-sm font-medium text-synthwave-purple">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="neon-purple font-orbitron">PROJECT</span>
            </h3>
            <p className="text-white">{ticket.Project}</p>
          </motion.div>
        )}

        {ticket.Description && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3 className="mb-1 flex items-center text-sm font-medium text-synthwave-blue">
              <FileText className="mr-2 h-4 w-4" />
              <span className="neon-blue font-orbitron">DESCRIPTION</span>
            </h3>
            <div className="rounded-md border border-synthwave-blue/30 bg-synthwave-darkPurple p-3">
              <p className="whitespace-pre-wrap text-white">
                {textRevealed ? ticket.Description : <span className="terminal-text">{ticket.Description}</span>}
              </p>
            </div>
          </motion.div>
        )}

        {(ticket.Assignee || ticket.Creator) && (
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {ticket.Assignee && (
              <div className="rounded-md border border-synthwave-green/30 bg-synthwave-green/10 p-3">
                <h3 className="mb-1 flex items-center text-sm font-medium text-synthwave-green">
                  <User className="mr-2 h-4 w-4" />
                  <span className="neon-green font-orbitron">ASSIGNEE</span>
                </h3>
                <p className="text-white">{ticket.Assignee}</p>
              </div>
            )}
            {ticket.Creator && (
              <div className="rounded-md border border-synthwave-yellow/30 bg-synthwave-yellow/10 p-3">
                <h3 className="mb-1 flex items-center text-sm font-medium text-synthwave-yellow">
                  <Users className="mr-2 h-4 w-4" />
                  <span className="neon-yellow font-orbitron">CREATOR</span>
                </h3>
                <p className="text-white">{ticket.Creator}</p>
              </div>
            )}
          </motion.div>
        )}

        {ticket.Labels && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h3 className="mb-1 flex items-center text-sm font-medium text-synthwave-yellow">
              <Tag className="mr-2 h-4 w-4" />
              <span className="neon-yellow font-orbitron">LABELS</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {ticket.Labels.split(",").map((label) => (
                <Badge key={label.trim()} className="neon-badge-green">
                  {label.trim()}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {parentTicket && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <h3 className="mb-1 flex items-center text-sm font-medium text-synthwave-orange">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              <span className="neon-pink font-orbitron">PARENT ISSUE</span>
            </h3>
            <div
              className="cursor-pointer rounded-md border border-synthwave-pink/30 bg-synthwave-pink/10 p-3 transition-all hover:bg-synthwave-pink/20"
              onClick={() => onTicketSelect(parentTicket)}
            >
              <div className="flex items-center">
                <Zap className="mr-2 h-4 w-4 text-synthwave-pink" />
                <div>
                  <span className="font-medium text-synthwave-pink">{parentTicket.ID}</span> - {parentTicket.Title}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {childTickets.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <h3 className="mb-1 flex items-center text-sm font-medium text-synthwave-green">
              <ArrowDownRight className="mr-2 h-4 w-4" />
              <span className="neon-green font-orbitron">CHILD ISSUES ({childTickets.length})</span>
            </h3>
            <div className="space-y-2">
              {childTickets.map((childTicket, index) => (
                <motion.div
                  key={childTicket.ID}
                  className="cursor-pointer rounded-md border border-synthwave-green/30 bg-synthwave-green/10 p-3 transition-all hover:bg-synthwave-green/20"
                  onClick={() => onTicketSelect(childTicket)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center">
                    <Zap className="mr-2 h-4 w-4 text-synthwave-green" />
                    <div>
                      <span className="font-medium text-synthwave-green">{childTicket.ID}</span> - {childTicket.Title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
