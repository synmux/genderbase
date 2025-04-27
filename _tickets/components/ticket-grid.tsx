"use client"
import type { Ticket } from "@/lib/types"
import { Ticket3D } from "./ticket-3d"
import { motion } from "framer-motion"

interface TicketGridProps {
  tickets: Ticket[]
  selectedTicket: Ticket | null
  onTicketSelect: (ticket: Ticket) => void
}

export function TicketGrid({ tickets, selectedTicket, onTicketSelect }: TicketGridProps) {
  if (tickets.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-synthwave-blue">No tickets match your filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold uppercase tracking-wider font-orbitron">
          <span className="neon-blue">TICKETS</span>{" "}
          <motion.span
            className="inline-block rounded-full bg-synthwave-blue/20 px-2 py-1 text-sm text-synthwave-blue"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
          >
            {tickets.length}
          </motion.span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket, index) => (
          <motion.div
            key={ticket.ID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Ticket3D
              ticket={ticket}
              onClick={() => onTicketSelect(ticket)}
              isSelected={selectedTicket?.ID === ticket.ID}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
