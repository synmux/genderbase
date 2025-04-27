import type { Ticket } from "./types"

interface LinearTeam {
  id: string
  name: string
  key: string
}

interface LinearProject {
  id: string
  name: string
}

interface LinearIssueCreateResponse {
  success: boolean
  issue: {
    id: string
    identifier: string
    url: string
  }
}

export async function fetchLinearTeams(apiKey: string): Promise<LinearTeam[]> {
  const query = `
    query {
      teams {
        nodes {
          id
          name
          key
        }
      }
    }
  `

  const response = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ query }),
  })

  const data = await response.json()
  return data.data.teams.nodes
}

export async function fetchLinearProjects(apiKey: string, teamId: string): Promise<LinearProject[]> {
  const query = `
    query($teamId: String!) {
      team(id: $teamId) {
        projects {
          nodes {
            id
            name
          }
        }
      }
    }
  `

  const response = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query,
      variables: { teamId },
    }),
  })

  const data = await response.json()
  return data.data.team.projects.nodes
}

export async function createLinearIssue(
  apiKey: string,
  {
    title,
    description,
    teamId,
    projectId,
    parentId,
    priority,
    labels,
  }: {
    title: string
    description?: string
    teamId: string
    projectId?: string
    parentId?: string
    priority?: number
    labels?: string[]
  },
): Promise<LinearIssueCreateResponse> {
  const mutation = `
    mutation CreateIssue(
      $title: String!
      $description: String
      $teamId: String!
      $projectId: String
      $parentId: String
      $priority: Int
      $labelIds: [String!]
    ) {
      issueCreate(
        input: {
          title: $title
          description: $description
          teamId: $teamId
          projectId: $projectId
          parentId: $parentId
          priority: $priority
          labelIds: $labelIds
        }
      ) {
        success
        issue {
          id
          identifier
          url
        }
      }
    }
  `

  const response = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        title,
        description,
        teamId,
        projectId,
        parentId,
        priority,
        labelIds: labels,
      },
    }),
  })

  const data = await response.json()
  return data.data.issueCreate
}

export function mapPriorityToLinear(priority: string): number {
  const priorityMap: Record<string, number> = {
    Urgent: 1,
    High: 2,
    Medium: 3,
    Low: 4,
  }

  return priorityMap[priority] || 0
}

export async function fetchLinearLabels(apiKey: string, teamId: string): Promise<{ id: string; name: string }[]> {
  const query = `
    query($teamId: String!) {
      team(id: $teamId) {
        labels {
          nodes {
            id
            name
          }
        }
      }
    }
  `

  const response = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query,
      variables: { teamId },
    }),
  })

  const data = await response.json()
  return data.data.team.labels.nodes
}

export async function createLinearIssueFromTicket(
  apiKey: string,
  ticket: Ticket,
  teamId: string,
  projectId?: string,
  parentId?: string,
  labelIds?: string[],
): Promise<LinearIssueCreateResponse> {
  return createLinearIssue(apiKey, {
    title: ticket.Title,
    description: ticket.Description,
    teamId,
    projectId,
    parentId,
    priority: ticket.Priority ? mapPriorityToLinear(ticket.Priority) : undefined,
    labels: labelIds,
  })
}
