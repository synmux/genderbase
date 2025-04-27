"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LinearApiKeyForm } from "./linear-api-key-form"
import { Loader2, X, Plus, ArrowUpRight } from "lucide-react"
import type { Ticket } from "@/lib/types"
import { fetchLinearTeams, fetchLinearProjects, fetchLinearLabels, createLinearIssueFromTicket } from "@/lib/linear-api"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface LinearCreationPanelProps {
  tickets: Ticket[]
  selectedTicket: Ticket | null
  onTicketCreated: (ticketId: string, linearId: string, linearUrl: string) => void
}

export function LinearCreationPanel({ tickets, selectedTicket, onTicketCreated }: LinearCreationPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [teams, setTeams] = useState<{ id: string; name: string; key: string }[]>([])
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([])
  const [labels, setLabels] = useState<{ id: string; name: string }[]>([])
  const [selectedTeamId, setSelectedTeamId] = useState("")
  const [selectedProjectId, setSelectedProjectId] = useState("")
  const [selectedParentId, setSelectedParentId] = useState("")
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ id: string; url: string } | null>(null)
  const [customTitle, setCustomTitle] = useState("")
  const [customDescription, setCustomDescription] = useState("")
  const [useCustomValues, setUseCustomValues] = useState(false)
  const [recentlyCreated, setRecentlyCreated] = useState<{ id: string; title: string; url: string }[]>([])

  // Load teams when API key is set
  useEffect(() => {
    if (!apiKey) return

    const loadTeams = async () => {
      try {
        setLoading(true)
        const teamsData = await fetchLinearTeams(apiKey)
        setTeams(teamsData)
        if (teamsData.length > 0) {
          setSelectedTeamId(teamsData[0].id)
        }
      } catch (err) {
        setError("Failed to load teams from Linear")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [apiKey])

  // Load projects when team is selected
  useEffect(() => {
    if (!apiKey || !selectedTeamId) return

    const loadProjects = async () => {
      try {
        setLoading(true)
        const projectsData = await fetchLinearProjects(apiKey, selectedTeamId)
        setProjects(projectsData)
      } catch (err) {
        setError("Failed to load projects from Linear")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    const loadLabels = async () => {
      try {
        const labelsData = await fetchLinearLabels(apiKey, selectedTeamId)
        setLabels(labelsData)
      } catch (err) {
        console.error("Failed to load labels:", err)
      }
    }

    loadProjects()
    loadLabels()
  }, [apiKey, selectedTeamId])

  // Update custom values when selected ticket changes
  useEffect(() => {
    if (selectedTicket) {
      setCustomTitle(selectedTicket.Title)
      setCustomDescription(selectedTicket.Description || "")
    } else {
      setCustomTitle("")
      setCustomDescription("")
    }
  }, [selectedTicket])

  const handleCreateIssue = async () => {
    if (!apiKey || !selectedTeamId || !selectedTicket) {
      setError("Missing required information")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const title = useCustomValues ? customTitle : selectedTicket.Title
      const description = useCustomValues ? customDescription : selectedTicket.Description

      const customTicket: Ticket = {
        ...selectedTicket,
        Title: title,
        Description: description,
      }

      const result = await createLinearIssueFromTicket(
        apiKey,
        customTicket,
        selectedTeamId,
        selectedProjectId || undefined,
        selectedParentId || undefined,
        selectedLabelIds.length > 0 ? selectedLabelIds : undefined,
      )

      if (result.success) {
        setSuccess({
          id: result.issue.identifier,
          url: result.issue.url,
        })
        onTicketCreated(selectedTicket.ID, result.issue.identifier, result.issue.url)

        // Add to recently created
        setRecentlyCreated((prev) => [
          { id: result.issue.identifier, title, url: result.issue.url },
          ...prev.slice(0, 4), // Keep only the 5 most recent
        ])
      } else {
        setError("Failed to create issue in Linear")
      }
    } catch (err) {
      setError("An error occurred while creating the issue")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Find potential parent tickets
  const potentialParents = tickets.filter((ticket) => ticket.ID !== selectedTicket?.ID)

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg transition-all duration-300 dark:bg-gray-800 ${
        isExpanded ? "h-96" : "h-12"
      }`}
    >
      <div className="flex h-12 items-center justify-between border-b px-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1"
            aria-label={isExpanded ? "Collapse panel" : "Expand panel"}
          >
            {isExpanded ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
          <h3 className="text-sm font-medium">Linear Integration</h3>
        </div>
        {!isExpanded && selectedTicket && (
          <Button size="sm" onClick={() => setIsExpanded(true)}>
            Create in Linear
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="h-[calc(100%-3rem)] overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <LinearApiKeyForm onApiKeySet={setApiKey} />

              {apiKey && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Team</label>
                    <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a team" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name} ({team.key})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project (Optional)</label>
                    <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Parent Issue (Optional)</label>
                    <Select value={selectedParentId} onValueChange={setSelectedParentId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent issue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {potentialParents.map((ticket) => (
                          <SelectItem key={ticket.ID} value={ticket.ID}>
                            {ticket.ID} - {ticket.Title.substring(0, 30)}
                            {ticket.Title.length > 30 ? "..." : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {labels.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Labels</label>
                      <div className="max-h-32 space-y-2 overflow-y-auto rounded-md border p-2">
                        {labels.map((label) => (
                          <div key={label.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`label-${label.id}`}
                              checked={selectedLabelIds.includes(label.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedLabelIds([...selectedLabelIds, label.id])
                                } else {
                                  setSelectedLabelIds(selectedLabelIds.filter((id) => id !== label.id))
                                }
                              }}
                            />
                            <Label htmlFor={`label-${label.id}`} className="text-sm">
                              {label.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="space-y-4">
              <Tabs defaultValue="create">
                <TabsList className="w-full">
                  <TabsTrigger value="create" className="flex-1">
                    Create Issue
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="flex-1">
                    Recently Created
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="space-y-4 pt-2">
                  {selectedTicket ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="use-custom"
                          checked={useCustomValues}
                          onCheckedChange={(checked) => setUseCustomValues(!!checked)}
                        />
                        <Label htmlFor="use-custom">Edit before creating</Label>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={useCustomValues ? customTitle : selectedTicket.Title}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          disabled={!useCustomValues}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={useCustomValues ? customDescription : selectedTicket.Description || ""}
                          onChange={(e) => setCustomDescription(e.target.value)}
                          disabled={!useCustomValues}
                          rows={5}
                        />
                      </div>

                      <Button onClick={handleCreateIssue} disabled={loading || !apiKey || !selectedTeamId}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Create in Linear"
                        )}
                      </Button>

                      {error && (
                        <div className="mt-2 rounded-md bg-red-50 p-2 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                          {error}
                        </div>
                      )}

                      {success && (
                        <div className="mt-2 flex items-center justify-between rounded-md bg-green-50 p-2 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          <span>
                            Created issue <strong>{success.id}</strong> successfully!
                          </span>
                          <a
                            href={success.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 underline"
                          >
                            <span>View in Linear</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-md border border-dashed p-4 text-center text-gray-500">
                      <p>Select a ticket to create it in Linear</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="recent">
                  {recentlyCreated.length > 0 ? (
                    <div className="space-y-2">
                      {recentlyCreated.map((issue) => (
                        <Card key={issue.id} className="overflow-hidden">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium">
                                  <span className="text-gray-500">{issue.id}</span> {issue.title}
                                </div>
                              </div>
                              <a
                                href={issue.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 flex items-center text-sm text-blue-600 hover:underline"
                              >
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-md border border-dashed p-4 text-center text-gray-500">
                      <p>No issues created yet</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
