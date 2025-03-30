import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Responder Dashboard | Genderbase",
  description: "Dashboard for Genderbase responders",
}

export default function ResponderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

