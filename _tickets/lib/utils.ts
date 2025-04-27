import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    Backlog: "#f3f4f6",
    Todo: "#e0f2fe",
    "In Progress": "#dbeafe",
    "In Review": "#e0e7ff",
    Done: "#dcfce7",
    Canceled: "#fef3c7",
  }

  return statusMap[status] || "#f3f4f6"
}

export function getPriorityColor(priority: string): string {
  const priorityMap: Record<string, string> = {
    Urgent: "#fee2e2",
    High: "#fef3c7",
    Medium: "#e0f2fe",
    Low: "#dcfce7",
  }

  return priorityMap[priority] || "#f3f4f6"
}
