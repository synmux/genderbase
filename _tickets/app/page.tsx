import { TicketExplorer } from "@/components/ticket-explorer"

export default function Home() {
  return (
    <main className="min-h-screen bg-synthwave-bg">
      <TicketExplorer csvUrl="https://data.dave.io/TICKETS.csv" />
    </main>
  )
}
