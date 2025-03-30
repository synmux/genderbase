"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageSquare, CheckCircle, Clock, AlertCircle, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// This would come from an API in a real application
const pendingQuestions = [
  {
    id: "q1",
    userPseudonym: "CuriousPenguin",
    preview:
      "I have a friend who recently came out as non-binary, and I want to be supportive but I'm not sure how to refer to them properly...",
    timestamp: "2023-06-15T14:30:00Z",
  },
  {
    id: "q2",
    userPseudonym: "ThoughtfulElephant",
    preview:
      "My teenage child just told me they might be transgender. I want to be supportive, but I don't know where to start...",
    timestamp: "2023-06-14T09:45:00Z",
  },
  {
    id: "q3",
    userPseudonym: "InquisitiveFox",
    preview:
      "I'm organizing an event and want to make it inclusive for people of all genders. What's the best way to ask about pronouns...",
    timestamp: "2023-06-13T16:20:00Z",
  },
]

const activeConversations = [
  {
    id: "c1",
    userPseudonym: "ReflectiveDeer",
    preview:
      "Thanks for explaining that. I have a follow-up question about how to handle situations where others misgender my friend...",
    lastUpdated: "2023-06-16T11:30:00Z",
    messageCount: 4,
  },
  {
    id: "c2",
    userPseudonym: "ThoughtfulElephant",
    preview:
      "I appreciate your advice about finding a therapist. Do you have any recommendations for books that might help me understand...",
    lastUpdated: "2023-06-15T15:45:00Z",
    messageCount: 6,
  },
]

const pendingSummaries = [
  {
    id: "s1",
    userPseudonym: "CalmTurtle",
    topic: "Supporting a partner during transition",
    messageCount: 8,
    closedAt: "2023-06-10T14:30:00Z",
  },
  {
    id: "s2",
    userPseudonym: "GentleGiraffe",
    topic: "Explaining non-binary identity to colleagues",
    messageCount: 5,
    closedAt: "2023-06-09T09:15:00Z",
  },
]

export default function ResponderDashboardPage() {
  const [activeTab, setActiveTab] = useState("pending")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <main className="flex-1">
      <div className="container px-4 py-8 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tighter">Responder Dashboard</h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              Responder: WiseOwl
            </Badge>
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Pending Questions
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Active Conversations
            </TabsTrigger>
            <TabsTrigger value="summaries" className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" />
              Pending Summaries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6 space-y-4">
            {pendingQuestions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-center text-muted-foreground">No pending questions at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              pendingQuestions.map((question) => (
                <Card key={question.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarFallback>{question.userPseudonym.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg">{question.userPseudonym}</CardTitle>
                      </div>
                      <CardDescription>{formatDate(question.timestamp)}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">{question.preview}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/responder/question/${question.id}`} className="w-full">
                      <Button className="w-full">Respond to Question</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-6 space-y-4">
            {activeConversations.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-center text-muted-foreground">No active conversations at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              activeConversations.map((conversation) => (
                <Card key={conversation.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarFallback>{conversation.userPseudonym.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg">{conversation.userPseudonym}</CardTitle>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {conversation.messageCount} messages
                        </Badge>
                        <CardDescription>{formatDate(conversation.lastUpdated)}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">{conversation.preview}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/responder/conversation/${conversation.id}`} className="w-full">
                      <Button className="w-full">Continue Conversation</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="summaries" className="mt-6 space-y-4">
            {pendingSummaries.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-center text-muted-foreground">No conversations pending summarization.</p>
                </CardContent>
              </Card>
            ) : (
              pendingSummaries.map((summary) => (
                <Card key={summary.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarFallback>{summary.userPseudonym.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg">{summary.topic}</CardTitle>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {summary.messageCount} messages
                        </Badge>
                        <CardDescription>Closed: {formatDate(summary.closedAt)}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      This conversation with {summary.userPseudonym} needs to be summarized for the knowledge base.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/responder/summarize/${summary.id}`} className="w-full">
                      <Button className="w-full">Create Summary</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

