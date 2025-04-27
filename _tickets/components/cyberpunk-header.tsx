"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, GitBranch, Zap } from "lucide-react"

interface CyberpunkHeaderProps {
  viewMode: "list" | "relationships"
  onViewModeChange: (mode: "list" | "relationships") => void
  ticketCount: number
}

export function CyberpunkHeader({ viewMode, onViewModeChange, ticketCount }: CyberpunkHeaderProps) {
  const [glitchActive, setGlitchActive] = useState(false)

  // Randomly trigger glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="relative overflow-hidden border-b border-synthwave-purple bg-synthwave-bg p-4">
      {/* Animated grid background */}
      <div className="absolute inset-0 retro-grid opacity-20"></div>

      {/* Scanlines effect */}
      <div className="absolute inset-0 scanlines"></div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="rotating text-synthwave-pink">
            <Zap size={32} className="text-synthwave-pink" />
          </div>

          <div>
            <h1
              className={`text-3xl font-black uppercase tracking-wider font-orbitron ${glitchActive ? "glitch" : ""}`}
              data-text="TICKET EXPLORER"
            >
              <span className="neon-pink">TICKET</span> <span className="neon-blue">EXPLORER</span>
            </h1>

            <div className="mt-1 flex items-center">
              <div className="h-1 w-20 bg-gradient-to-r from-synthwave-pink to-synthwave-blue"></div>
              <span className="ml-2 text-sm text-synthwave-green">
                <span className="terminal-text">SYSTEM v2.0.77</span>
              </span>
              <div className="ml-4 rounded-full bg-synthwave-pink/20 px-3 py-1 text-sm">
                <span className="neon-pink pulse">{ticketCount}</span> tickets
              </div>
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="list"
          value={viewMode}
          onValueChange={(value) => onViewModeChange(value as "list" | "relationships")}
          className="relative"
        >
          <TabsList className="bg-synthwave-darkPurple p-1">
            <TabsTrigger
              value="list"
              className="relative data-[state=active]:bg-synthwave-purple data-[state=active]:text-white"
            >
              <Database className="mr-2 h-4 w-4" />
              <span>LIST VIEW</span>
              {viewMode === "list" && (
                <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-synthwave-pink to-synthwave-blue"></div>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="relationships"
              className="relative data-[state=active]:bg-synthwave-purple data-[state=active]:text-white"
            >
              <GitBranch className="mr-2 h-4 w-4" />
              <span>RELATIONSHIP VIEW</span>
              {viewMode === "relationships" && (
                <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-synthwave-blue to-synthwave-pink"></div>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Laser beam effect */}
      <div className="laser-beam"></div>
    </div>
  )
}
