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
import { motion, AnimatePresence } from "framer-motion"

interface FuturisticSidebarProps {
  tickets: Ticket[]
  filters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
}

export function FuturisticSidebar({ tickets, filters, onFilterChange }: FuturisticSidebarProps) {
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
        return "neon-badge-purple"
      case "todo":
        return "neon-badge-blue"
      case "in progress":
        return "neon-badge-yellow"
      case "in review":
        return "neon-badge-green"
      case "done":
        return "neon-badge-green"
      case "canceled":
        return "neon-badge-pink"
      default:
        return "neon-badge-purple"
    }
  }

  // Get color for priority badge
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "neon-badge-pink"
      case "high":
        return "neon-badge-yellow"
      case "medium":
        return "neon-badge-blue"
      case "low":
        return "neon-badge-green"
      default:
        return "neon-badge-purple"
    }
  }

  return (
    <motion.div
      className={`relative border-r border-synthwave-purple bg-synthwave-bg transition-all duration-300 ${
        isOpen ? "w-full md:w-80" : "w-12"
      }`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-14 items-center justify-between border-b border-synthwave-purple px-4">
        {isOpen && (
          <motion.h2
            className="text-lg font-bold uppercase tracking-wider text-synthwave-blue font-orbitron"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="neon-blue font-orbitron">FILTERS</span>
          </motion.h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={`ml-auto neon-btn neon-btn-blue ${isOpen ? "" : "w-full"}`}
        >
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-synthwave-blue" />
                <Input
                  placeholder="Search tickets..."
                  value={filters.searchTerm}
                  onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
                  className="neon-border-blue bg-synthwave-darkPurple pl-8 text-white placeholder:text-synthwave-blue/70 focus-visible:ring-synthwave-blue"
                />
                {filters.searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1.5 h-6 w-6 hover:bg-synthwave-pink/20 hover:text-synthwave-pink"
                    onClick={() => onFilterChange({ searchTerm: "" })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <Accordion type="multiple" defaultValue={["projects", "relationships"]} className="space-y-2">
              <AccordionItem value="projects" className="border-synthwave-purple">
                <AccordionTrigger className="py-2 text-white hover:text-synthwave-blue">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4 text-synthwave-blue" />
                    <span className="neon-blue font-orbitron">PROJECTS</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2">
                    {uniqueProjects.map((project, index) => (
                      <motion.div
                        key={project}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Checkbox
                          id={`project-${project}`}
                          checked={filters.projects.includes(project)}
                          onCheckedChange={() => toggleFilter("projects", project)}
                          className="border-synthwave-blue data-[state=checked]:border-synthwave-green data-[state=checked]:bg-synthwave-green"
                        />
                        <Label htmlFor={`project-${project}`} className="text-sm text-white">
                          {project}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="status" className="border-synthwave-purple">
                <AccordionTrigger className="py-2 text-white hover:text-synthwave-blue">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-synthwave-green" />
                    <span className="neon-green font-orbitron">STATUS</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2">
                    {uniqueStatuses.map((status, index) => (
                      <motion.div
                        key={status}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Checkbox
                          id={`status-${status}`}
                          checked={filters.statuses.includes(status)}
                          onCheckedChange={() => toggleFilter("statuses", status)}
                          className="border-synthwave-blue data-[state=checked]:border-synthwave-green data-[state=checked]:bg-synthwave-green"
                        />
                        <Label htmlFor={`status-${status}`} className="flex items-center text-sm text-white">
                          <Badge className={`mr-2 ${getStatusColor(status)}`}>{status}</Badge>
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="priority" className="border-synthwave-purple">
                <AccordionTrigger className="py-2 text-white hover:text-synthwave-blue">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-synthwave-yellow" />
                    <span className="neon-yellow font-orbitron">PRIORITY</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2">
                    {uniquePriorities.map((priority, index) => (
                      <motion.div
                        key={priority}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Checkbox
                          id={`priority-${priority}`}
                          checked={filters.priorities.includes(priority)}
                          onCheckedChange={() => toggleFilter("priorities", priority)}
                          className="border-synthwave-blue data-[state=checked]:border-synthwave-green data-[state=checked]:bg-synthwave-green"
                        />
                        <Label htmlFor={`priority-${priority}`} className="flex items-center text-sm text-white">
                          <Badge className={`mr-2 ${getPriorityColor(priority)}`}>{priority}</Badge>
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="labels" className="border-synthwave-purple">
                <AccordionTrigger className="py-2 text-white hover:text-synthwave-blue">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-4 w-4 text-synthwave-yellow" />
                    <span className="neon-yellow font-orbitron">LABELS</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="max-h-40 space-y-2 overflow-y-auto rounded-md border border-synthwave-purple bg-synthwave-darkPurple p-2">
                    {uniqueLabels.map((label, index) => (
                      <motion.div
                        key={label}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Checkbox
                          id={`label-${label}`}
                          checked={filters.labels.includes(label)}
                          onCheckedChange={() => toggleFilter("labels", label)}
                          className="border-synthwave-blue data-[state=checked]:border-synthwave-green data-[state=checked]:bg-synthwave-green"
                        />
                        <Label htmlFor={`label-${label}`} className="text-sm text-white">
                          {label}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="relationships" className="border-synthwave-purple">
                <AccordionTrigger className="py-2 text-white hover:text-synthwave-blue">
                  <div className="flex items-center">
                    <GitBranch className="mr-2 h-4 w-4 text-synthwave-purple" />
                    <span className="neon-purple font-orbitron">RELATIONSHIPS</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-parents"
                        checked={filters.showOnlyParents}
                        onCheckedChange={(checked) => onFilterChange({ showOnlyParents: !!checked })}
                        className="border-synthwave-blue data-[state=checked]:border-synthwave-green data-[state=checked]:bg-synthwave-green"
                      />
                      <Label htmlFor="show-parents" className="text-sm text-white">
                        Show only parent tickets
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-children"
                        checked={filters.showOnlyChildren}
                        onCheckedChange={(checked) => onFilterChange({ showOnlyChildren: !!checked })}
                        className="border-synthwave-blue data-[state=checked]:border-synthwave-green data-[state=checked]:bg-synthwave-green"
                      />
                      <Label htmlFor="show-children" className="text-sm text-white">
                        Show only child tickets
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button variant="outline" size="sm" onClick={resetFilters} className="mt-4 w-full neon-btn neon-btn-pink">
              RESET FILTERS
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
