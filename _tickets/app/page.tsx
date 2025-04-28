import { TicketExplorer } from "@/components/ticket-explorer"

export default function Home() {
  return (
    <main className="min-h-screen bg-synthwave-bg">
      <TicketExplorer csvUrl="/api/tickets" />
    </main>
  )
}
