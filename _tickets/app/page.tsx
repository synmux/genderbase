import { TicketExplorer } from "@/components/ticket-explorer"

export default function Home() {
  return (
    <main className="min-h-screen bg-synthwave-bg">
      <TicketExplorer csvUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linear-JmSWVvtcB3MlJMEY3ql5FO3p3iP8cV.csv" />
    </main>
  )
}
