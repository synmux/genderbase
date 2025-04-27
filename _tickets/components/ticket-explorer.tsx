"use client"

import { useState, useEffect } from "react"
import { FuturisticSidebar } from "./futuristic-sidebar"
import { TicketGrid } from "./ticket-grid"
import { FuturisticTicketDetail } from "./futuristic-ticket-detail"
import { Relationship3DView } from "./relationship-3d-view"
import { parseCSV } from "@/lib/data-utils"
import type { Ticket, FilterState } from "@/lib/types"
import { Loader2 } from "lucide-react"
import { CyberpunkHeader } from "./cyberpunk-header"
import { ThreeBackground } from "@/lib/three-background"
import { ParticleEffect } from "./particle-effect"

export function TicketExplorer({ csvUrl }: { csvUrl: string }) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "relationships">("list")
  const [filters, setFilters] = useState<FilterState>({
    projects: [],
    statuses: [],
    priorities: [],
    labels: [],
    searchTerm: "",
    showOnlyParents: false,
    showOnlyChildren: false,
  })

  // Load and parse CSV data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const response = await fetch(csvUrl)
        const csvText = await response.text()
        const parsedTickets = parseCSV(csvText)
        setTickets(parsedTickets)
        setFilteredTickets(parsedTickets)
      } catch (err) {
        setError("Failed to load ticket data. Please try again.")
        console.error("Error loading CSV:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [csvUrl])

  // Apply filters when they change
  useEffect(() => {
    if (tickets.length === 0) return

    let result = [...tickets]

    // Filter by project
    if (filters.projects.length > 0) {
      result = result.filter((ticket) => filters.projects.includes(ticket.Project))
    }

    // Filter by status
    if (filters.statuses.length > 0) {
      result = result.filter((ticket) => filters.statuses.includes(ticket.Status))
    }

    // Filter by priority
    if (filters.priorities.length > 0) {
      result = result.filter((ticket) => filters.priorities.includes(ticket.Priority))
    }

    // Filter by labels
    if (filters.labels.length > 0) {
      result = result.filter((ticket) => {
        if (!ticket.Labels) return false
        const ticketLabels = ticket.Labels.split(",").map((label) => label.trim())
        return filters.labels.some((label) => ticketLabels.includes(label))
      })
    }

    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      result = result.filter(
        (ticket) =>
          ticket.Title.toLowerCase().includes(term) ||
          (ticket.Description && ticket.Description.toLowerCase().includes(term)),
      )
    }

    // Filter by parent/child relationship
    if (filters.showOnlyParents) {
      result = result.filter((ticket) => tickets.some((t) => t["Parent issue"] === ticket.ID))
    }

    if (filters.showOnlyChildren) {
      result = result.filter((ticket) => ticket["Parent issue"])
    }

    setFilteredTickets(result)
  }, [tickets, filters])

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // Handle ticket selection
  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket)
  }

  // Handle ticket detail close
  const handleTicketDetailClose = () => {
    setSelectedTicket(null)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-synthwave-bg">
        <ThreeBackground />
        <div className="relative z-10 flex flex-col items-center space-y-8">
          <div className="text-5xl font-black uppercase tracking-wider">
            <span className="neon-pink">LOADING</span> <span className="neon-blue">TICKETS</span>
          </div>
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full border-4 border-t-synthwave-pink border-r-synthwave-blue border-b-synthwave-green border-l-synthwave-yellow animate-spin"></div>
            <Loader2 className="absolute inset-0 h-full w-full animate-pulse text-white" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-synthwave-bg">
        <ThreeBackground />
        <div className="relative z-10 rounded-lg border-2 border-synthwave-pink bg-synthwave-darkPurple p-6 text-center shadow-lg">
          <h2 className="mb-2 text-xl font-bold text-synthwave-pink">ERROR</h2>
          <p className="text-white">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-synthwave-bg md:flex-row">
      <ThreeBackground />
      <ParticleEffect />

      <div className="relative z-10 flex h-full w-full flex-col md:flex-row">
        <FuturisticSidebar tickets={tickets} filters={filters} onFilterChange={handleFilterChange} />

        <div className="flex flex-1 flex-col overflow-hidden">
          <CyberpunkHeader
            viewMode={viewMode}
            onViewModeChange={(mode) => setViewMode(mode as "list" | "relationships")}
            ticketCount={filteredTickets.length}
          />

          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto p-4">
              {viewMode === "list" ? (
                <TicketGrid
                  tickets={filteredTickets}
                  onTicketSelect={handleTicketSelect}
                  selectedTicket={selectedTicket}
                />
              ) : (
                <Relationship3DView
                  tickets={tickets}
                  filteredTickets={filteredTickets}
                  onTicketSelect={handleTicketSelect}
                />
              )}
            </div>

            {selectedTicket && (
              <div className="w-full border-l border-synthwave-purple md:w-1/3 lg:w-2/5">
                <FuturisticTicketDetail
                  ticket={selectedTicket}
                  allTickets={tickets}
                  onTicketSelect={handleTicketSelect}
                  onClose={handleTicketDetailClose}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
