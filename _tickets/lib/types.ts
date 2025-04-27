export interface Ticket {
  ID: string
  Team: string
  Title: string
  Description: string
  Status: string
  Estimate: any
  Priority: string
  "Project ID": string
  Project: string
  Creator: string
  Assignee: string
  Labels: string
  "Cycle Number": any
  "Cycle Name": any
  "Cycle Start": any
  "Cycle End": any
  Created: any
  Updated: any
  Started: any
  Triaged: any
  Completed: any
  Canceled: any
  Archived: any
  "Due Date": any
  "Parent issue": string
  Initiatives: any
  "Project Milestone ID": any
  "Project Milestone": any
  "SLA Status": any
  Roadmaps: any
}

export interface FilterState {
  projects: string[]
  statuses: string[]
  priorities: string[]
  labels: string[]
  searchTerm: string
  showOnlyParents: boolean
  showOnlyChildren: boolean
}
