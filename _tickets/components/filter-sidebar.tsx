"use client"

import { useState, useEffect } from "react"
import type { Ticket, FilterState } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search, X, Filter, ChevronUp, Tag, CheckCircle, AlertTriangle, GitBranch } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

interface FilterSidebarProps {
  tickets: Ticket[]
  filters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
}

export function FilterSidebar({ tickets, filters, onFilterChange }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [uniqueProjects, setUniqueProjects] = useState<string[]>([])
  const [uniqueStatuses, setUniqueStatuses] = useState<string[]>([])
  const [uniquePriorities, setUniquePriorities] = useState<string[]>([])
  const [uniqueLabels, setUniqueLabels] = useState<string[]>([])

  // Extract unique values for filters
  useEffect(() => {
    if (tickets.length === 0) return

    // Extract unique projects
    const projects = [...new Set(tickets.map((t) => t.Project).filter(Boolean))]
    setUniqueProjects(projects)

    // Extract unique statuses
    const statuses = [...new Set(tickets.map((t) => t.Status).filter(Boolean))]
    setUniqueStatuses(statuses)

    // Extract unique priorities
    const priorities = [...new Set(tickets.map((t) => t.Priority).filter(Boolean))]
    setUniquePriorities(priorities)

    // Extract unique labels
    const allLabels = tickets
      .map((t) => t.Labels)
      .filter(Boolean)
      .flatMap((labels) => labels.split(",").map((label) => label.trim()))
      .filter(Boolean)

    const labels = [...new Set(allLabels)]
    setUniqueLabels(labels)
  }, [tickets])

  const toggleFilter = (filterType: keyof FilterState, value: string) => {
    const currentValues = filters[filterType] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    onFilterChange({ [filterType]: newValues })
  }

  const resetFilters = () => {
    onFilterChange({
      projects: [],
      statuses: [],
      priorities: [],
      labels: [],
      searchTerm: "",
      showOnlyParents: false,
      showOnlyChildren: false,
    })
  }

  // Get color for status badge
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "backlog":
        return "bg-monokai-gray text-monokai-fg badge-glow-gray"
      case "todo":
        return "bg-monokai-blue/20 text-monokai-blue badge-glow-blue"
      case "in progress":
        return "bg-monokai-orange/20 text-monokai-orange badge-glow-orange"
      case "in review":
        return "bg-monokai-purple/20 text-monokai-purple badge-glow-purple"
      case "done":
        return "bg-monokai-green/20 text-monokai-green badge-glow-green"
      case "canceled":
        return "bg-monokai-red/20 text-monokai-red badge-glow-red"
      default:
        return "bg-monokai-gray/20 text-monokai-fg"
    }
  }

  // Get color for priority badge
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "bg-monokai-red/20 text-monokai-red badge-glow-red"
      case "high":
        return "bg-monokai-orange/20 text-monokai-orange badge-glow-orange"
      case "medium":
        return "bg-monokai-yellow/20 text-monokai-yellow badge-glow-yellow"
      case "low":
        return "bg-monokai-green/20 text-monokai-green badge-glow-green"
      default:
        return "bg-monokai-gray/20 text-monokai-fg"
    }
  }

  return (
    <div
      className={`relative border-r border-monokai-lightGray bg-monokai-darkGray transition-all duration-300 ${
        isOpen ? "w-full md:w-72" : "w-12"
      }`}
    >
      <div className="flex h-14 items-center justify-between border-b border-monokai-lightGray px-4">
        {isOpen && <h2 className="text-lg font-semibold text-monokai-blue">Filters</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto text-monokai-fg hover:bg-monokai-lightGray hover:text-monokai-blue"
        >
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
        </Button>
      </div>

      {isOpen && (
        <div className="p-4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-monokai-gray" />
              <Input
                placeholder="Search tickets..."
                value={filters.searchTerm}
                onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
                className="border-monokai-lightGray bg-monokai-bg pl-8 text-monokai-fg placeholder:text-monokai-gray focus-visible:ring-monokai-blue"
              />
              {filters.searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1.5 h-6 w-6 hover:bg-monokai-red/20 hover:text-monokai-red"
                  onClick={() => onFilterChange({ searchTerm: "" })}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <Accordion type="multiple" defaultValue={["projects", "relationships"]} className="space-y-2">
            <AccordionItem value="projects" className="border-monokai-lightGray">
              <AccordionTrigger className="py-2 text-monokai-fg hover:text-monokai-blue">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-monokai-blue" />
                  Projects
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-2">
                  {uniqueProjects.map((project) => (
                    <div key={project} className="flex items-center space-x-2">
                      <Checkbox
                        id={`project-${project}`}
                        checked={filters.projects.includes(project)}
                        onCheckedChange={() => toggleFilter("projects", project)}
                        className="border-monokai-lightGray data-[state=checked]:border-monokai-green data-[state=checked]:bg-monokai-green"
                      />
                      <Label htmlFor={`project-${project}`} className="text-sm text-monokai-fg">
                        {project}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="status" className="border-monokai-lightGray">
              <AccordionTrigger className="py-2 text-monokai-fg hover:text-monokai-blue">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-monokai-green" />
                  Status
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-2">
                  {uniqueStatuses.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={filters.statuses.includes(status)}
                        onCheckedChange={() => toggleFilter("statuses", status)}
                        className="border-monokai-lightGray data-[state=checked]:border-monokai-green data-[state=checked]:bg-monokai-green"
                      />
                      <Label htmlFor={`status-${status}`} className="flex items-center text-sm text-monokai-fg">
                        <Badge className={`mr-2 ${getStatusColor(status)}`}>{status}</Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="priority" className="border-monokai-lightGray">
              <AccordionTrigger className="py-2 text-monokai-fg hover:text-monokai-blue">
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-monokai-orange" />
                  Priority
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-2">
                  {uniquePriorities.map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox
                        id={`priority-${priority}`}
                        checked={filters.priorities.includes(priority)}
                        onCheckedChange={() => toggleFilter("priorities", priority)}
                        className="border-monokai-lightGray data-[state=checked]:border-monokai-green data-[state=checked]:bg-monokai-green"
                      />
                      <Label htmlFor={`priority-${priority}`} className="flex items-center text-sm text-monokai-fg">
                        <Badge className={`mr-2 ${getPriorityColor(priority)}`}>{priority}</Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="labels" className="border-monokai-lightGray">
              <AccordionTrigger className="py-2 text-monokai-fg hover:text-monokai-blue">
                <div className="flex items-center">
                  <Tag className="mr-2 h-4 w-4 text-monokai-yellow" />
                  Labels
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="max-h-40 space-y-2 overflow-y-auto rounded-md border border-monokai-lightGray p-2">
                  {uniqueLabels.map((label) => (
                    <div key={label} className="flex items-center space-x-2">
                      <Checkbox
                        id={`label-${label}`}
                        checked={filters.labels.includes(label)}
                        onCheckedChange={() => toggleFilter("labels", label)}
                        className="border-monokai-lightGray data-[state=checked]:border-monokai-green data-[state=checked]:bg-monokai-green"
                      />
                      <Label htmlFor={`label-${label}`} className="text-sm text-monokai-fg">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="relationships" className="border-monokai-lightGray">
              <AccordionTrigger className="py-2 text-monokai-fg hover:text-monokai-blue">
                <div className="flex items-center">
                  <GitBranch className="mr-2 h-4 w-4 text-monokai-purple" />
                  Relationships
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="show-parents"
                      checked={filters.showOnlyParents}
                      onCheckedChange={(checked) => onFilterChange({ showOnlyParents: !!checked })}
                      className="border-monokai-lightGray data-[state=checked]:border-monokai-green data-[state=checked]:bg-monokai-green"
                    />
                    <Label htmlFor="show-parents" className="text-sm text-monokai-fg">
                      Show only parent tickets
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="show-children"
                      checked={filters.showOnlyChildren}
                      onCheckedChange={(checked) => onFilterChange({ showOnlyChildren: !!checked })}
                      className="border-monokai-lightGray data-[state=checked]:border-monokai-green data-[state=checked]:bg-monokai-green"
                    />
                    <Label htmlFor="show-children" className="text-sm text-monokai-fg">
                      Show only child tickets
                    </Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="mt-4 w-full border-monokai-red bg-monokai-red/10 text-monokai-red hover:bg-monokai-red/20 hover:text-monokai-red"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}
