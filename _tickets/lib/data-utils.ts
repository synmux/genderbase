import type { Ticket } from "./types"

// Modify the parseCSV function to include the project name fix
export function parseCSV(csvText: string): Ticket[] {
  const lines = csvText.split("\n")
  const headers = lines[0].split(",").map((header) => header.trim().replace(/^"(.*)"$/, "$1"))

  const tickets: Ticket[] = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue

    // Handle commas within quoted fields
    const values: string[] = []
    let currentValue = ""
    let insideQuotes = false

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j]

      if (char === '"') {
        insideQuotes = !insideQuotes
      } else if (char === "," && !insideQuotes) {
        values.push(currentValue.replace(/^"(.*)"$/, "$1"))
        currentValue = ""
      } else {
        currentValue += char
      }
    }

    values.push(currentValue.replace(/^"(.*)"$/, "$1"))

    const ticket: any = {}
    headers.forEach((header, index) => {
      ticket[header] = values[index] || ""
    })

    // Fix the "Gendcm erbase Content" project name
    if (ticket.Project === "Gendcm erbase Content") {
      ticket.Project = "Genderbase Content"
    }

    tickets.push(ticket as Ticket)
  }

  return tickets
}

interface TicketNode {
  ticket: Ticket
  children: TicketNode[]
  level: number
}

export function buildTicketHierarchy(allTickets: Ticket[], filteredTickets: Ticket[]): TicketNode[] {
  // Create a map of all tickets by ID for quick lookup
  const ticketMap = new Map<string, Ticket>()
  allTickets.forEach((ticket) => {
    ticketMap.set(ticket.ID, ticket)
  })

  // Create a set of filtered ticket IDs for quick lookup
  const filteredTicketIds = new Set(filteredTickets.map((ticket) => ticket.ID))

  // Find all parent tickets that need to be included
  const requiredParentIds = new Set<string>()
  filteredTickets.forEach((ticket) => {
    if (ticket["Parent issue"]) {
      let currentParentId = ticket["Parent issue"]
      while (currentParentId) {
        requiredParentIds.add(currentParentId)
        const parentTicket = ticketMap.get(currentParentId)
        currentParentId = parentTicket?.["Parent issue"] || ""
      }
    }
  })

  // Create a map to track which tickets are children
  const childTickets = new Set<string>()
  allTickets.forEach((ticket) => {
    if (ticket["Parent issue"]) {
      childTickets.add(ticket.ID)
    }
  })

  // Build the hierarchy
  const rootNodes: TicketNode[] = []

  // Helper function to build a node and its children recursively
  function buildNode(ticket: Ticket, level: number): TicketNode {
    const node: TicketNode = {
      ticket,
      children: [],
      level,
    }

    // Find all children of this ticket
    allTickets.forEach((potentialChild) => {
      if (potentialChild["Parent issue"] === ticket.ID) {
        // Only include the child if it's in the filtered set or if it has descendants in the filtered set
        if (filteredTicketIds.has(potentialChild.ID) || hasFilteredDescendant(potentialChild.ID)) {
          node.children.push(buildNode(potentialChild, level + 1))
        }
      }
    })

    // Sort children by ID
    node.children.sort((a, b) => a.ticket.ID.localeCompare(b.ticket.ID))

    return node
  }

  // Helper function to check if a ticket has any descendants in the filtered set
  function hasFilteredDescendant(ticketId: string): boolean {
    for (const ticket of allTickets) {
      if (ticket["Parent issue"] === ticketId) {
        if (filteredTicketIds.has(ticket.ID) || hasFilteredDescendant(ticket.ID)) {
          return true
        }
      }
    }
    return false
  }

  // Start with root tickets (those without parents or whose parents are not in the dataset)
  allTickets.forEach((ticket) => {
    if (!ticket["Parent issue"] || !ticketMap.has(ticket["Parent issue"])) {
      // Only include if it's in the filtered set, is a required parent, or has descendants in the filtered set
      if (filteredTicketIds.has(ticket.ID) || requiredParentIds.has(ticket.ID) || hasFilteredDescendant(ticket.ID)) {
        rootNodes.push(buildNode(ticket, 0))
      }
    }
  })

  // Sort root nodes by ID
  rootNodes.sort((a, b) => a.ticket.ID.localeCompare(b.ticket.ID))

  return rootNodes
}
