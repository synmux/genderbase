"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Key, Check, AlertCircle } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface LinearApiKeyFormProps {
  onApiKeySet: (apiKey: string) => void
}

export function LinearApiKeyForm({ onApiKeySet }: LinearApiKeyFormProps) {
  const [apiKey, setApiKey] = useLocalStorage<string>("linear-api-key", "")
  const [inputApiKey, setInputApiKey] = useState("")
  const [showForm, setShowForm] = useState(!apiKey)
  const [validating, setValidating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateAndSaveApiKey = async () => {
    if (!inputApiKey.trim()) {
      setError("API key cannot be empty")
      return
    }

    setValidating(true)
    setError(null)

    try {
      // Test the API key with a simple query
      const response = await fetch("https://api.linear.app/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${inputApiKey}`,
        },
        body: JSON.stringify({
          query: `
            query {
              viewer {
                id
                name
              }
            }
          `,
        }),
      })

      const data = await response.json()

      if (data.errors) {
        setError("Invalid API key. Please check and try again.")
      } else {
        setApiKey(inputApiKey)
        onApiKeySet(inputApiKey)
        setShowForm(false)
      }
    } catch (err) {
      setError("Failed to validate API key. Please check your connection.")
    } finally {
      setValidating(false)
    }
  }

  const handleReset = () => {
    setApiKey("")
    setShowForm(true)
  }

  if (!showForm) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 rounded-md bg-green-50 px-3 py-1 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <Check className="h-4 w-4" />
          <span>API key set</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Key className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium">Linear API Key</span>
      </div>
      <div className="flex space-x-2">
        <Input
          type="password"
          placeholder="Enter your Linear API key"
          value={inputApiKey}
          onChange={(e) => setInputApiKey(e.target.value)}
          className="flex-1"
        />
        <Button onClick={validateAndSaveApiKey} disabled={validating}>
          {validating ? "Validating..." : "Save"}
        </Button>
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
