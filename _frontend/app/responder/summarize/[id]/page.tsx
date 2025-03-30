"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// This would come from an API in a real application
const sampleConversation = {
  id: "s1",
  userPseudonym: "CalmTurtle",
  responderPseudonym: "WiseOwl",
  topic: "Supporting a partner during transition",
  messages: [
    {
      id: "1",
      sender: "user",
      content:
        "My partner recently came out as transgender and is beginning their transition. I'm fully supportive, but I'm not sure how to best help them through this process. What are some ways I can be there for them?",
      timestamp: "2023-06-05T10:30:00Z",
    },
    {
      id: "2",
      sender: "responder",
      content:
        "Thank you for reaching out and for your commitment to supporting your partner. It's wonderful that you want to be there for them during this significant time in their life. Here are some ways you can provide support:\n\n1. Listen actively: Let your partner express their feelings, fears, and hopes without judgment.\n\n2. Educate yourself: Learn about transgender experiences, but don't rely solely on your partner to educate you.\n\n3. Respect their pace: Everyone's transition journey is different. Some aspects may move quickly, others slowly.\n\n4. Use correct name and pronouns: This is crucial for affirming their identity.\n\n5. Offer practical support: This might include accompanying them to appointments or helping research resources.\n\nHow have conversations about their transition been going so far?",
      timestamp: "2023-06-05T11:45:00Z",
    },
    {
      id: "3",
      sender: "user",
      content:
        "Thanks for these suggestions. We've been having good conversations, but sometimes I worry about saying the wrong thing. They've asked me to use they/them pronouns for now, which I'm trying to do consistently. One specific question: they're nervous about coming out to their workplace. Is there anything I can do to help with that?",
      timestamp: "2023-06-06T09:20:00Z",
    },
    {
      id: "4",
      sender: "responder",
      content:
        "It's normal to worry about saying the wrong thing, but your partner likely appreciates your effort even when you make mistakes. For pronouns, practice makes perfect - even talking to yourself about your partner using their pronouns can help make it more natural.\n\nRegarding coming out at work, here are some ways you can help:\n\n1. Help them research their workplace policies on LGBTQ+ inclusion and any relevant legal protections in your area.\n\n2. Offer to role-play potential conversations to help them prepare.\n\n3. Be a sounding board as they decide who to tell first and how (sometimes starting with a trusted colleague or HR representative is helpful).\n\n4. Respect their timeline - they should come out when they feel ready.\n\n5. Create a supportive environment at home, especially if workplace reactions are mixed.\n\nWould any of these approaches be particularly helpful in your situation?",
      timestamp: "2023-06-06T10:15:00Z",
    },
    {
      id: "5",
      sender: "user",
      content:
        "The role-playing idea is really helpful - I hadn't thought of that. I think practicing responses to different reactions could help them feel more prepared. Also, I'm wondering about supporting them emotionally. Some days they seem really confident, and other days they seem overwhelmed. How can I be supportive without being overbearing?",
      timestamp: "2023-06-07T14:30:00Z",
    },
    {
      id: "6",
      sender: "responder",
      content:
        'I\'m glad the role-playing suggestion resonates with you! For providing emotional support while respecting boundaries, consider these approaches:\n\n1. Check in, don\'t check up: Ask "How are you feeling today?" rather than "Are you still feeling bad about..."\n\n2. Validate their emotions: Both the confidence and the overwhelm are valid parts of the process.\n\n3. Offer specific help: Instead of "Let me know if you need anything," try "Would it help if I researched therapists who specialize in gender identity?"\n\n4. Take care of yourself too: Supporting a transitioning partner can be emotionally complex for you as well. Having your own support system is important.\n\n5. Celebrate milestones: Acknowledge and celebrate steps in their transition that feel significant to them.\n\nThe fluctuation in emotions you\'re describing is very common during transition. The process involves both exciting changes and challenging obstacles.',
      timestamp: "2023-06-07T15:45:00Z",
    },
    {
      id: "7",
      sender: "user",
      content:
        "Thank you so much for all this advice. It's really helpful to have specific suggestions. I think I have a better understanding now of  It's really helpful to have specific suggestions. I think I have a better understanding now of how to support my partner through both the good days and the challenging ones. One last question - do you have any recommendations for resources that both of us could look at together?",
      timestamp: "2023-06-08T09:10:00Z",
    },
    {
      id: "8",
      sender: "responder",
      content:
        "You're very welcome! I'm happy to provide some resources you can explore together:\n\n1. Books: 'Transgender 101' by Nicholas Teich and 'Love Lives Here' by Amanda Jetté Knox are both accessible introductions.\n\n2. Online communities: PFLAG (pflag.org) offers resources for both transgender individuals and their partners/families.\n\n3. Videos: The 'Gender Reveal' podcast and YouTube channel has educational content you could watch together.\n\n4. Support groups: Many cities have in-person or virtual groups for transgender people and their partners. Attending together can be very beneficial.\n\n5. Healthcare resources: The World Professional Association for Transgender Health (WPATH) provides guidelines and provider directories.\n\nExploring these resources together can be a bonding experience and help both of you feel more informed and connected during this journey. Is there a particular type of resource that sounds most helpful to you right now?",
      timestamp: "2023-06-08T10:25:00Z",
    },
  ],
  closedAt: "2023-06-10T14:30:00Z",
}

export default function SummarizePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [conversation] = useState(sampleConversation)
  const [summary, setSummary] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("conversation")

  const handleGenerateAI = (type: "summary" | "category" | "tags") => {
    // In a real application, this would call an AI service
    if (type === "summary") {
      setSummary(
        "This conversation covers how to support a transgender partner during their transition. Key points include: actively listening without judgment, educating yourself independently, respecting their transition pace, using correct name and pronouns, offering practical support like accompanying them to appointments, helping them prepare for coming out at work, providing emotional support without being overbearing, and exploring resources together. The advice emphasizes the importance of validating both confident and overwhelmed feelings, offering specific help rather than general statements, and celebrating transition milestones.",
      )
    } else if (type === "category") {
      setCategory("Relationships")
    } else if (type === "tags") {
      setTags("transgender, partner support, transition, emotional support, workplace, resources")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!summary.trim() || !category.trim() || !tags.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      // This would be an API call in a real application
      // await fetch(`/api/conversations/${params.id}/summary`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ summary, category, tags }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to the responder dashboard
      router.push("/responder?tab=summaries")
    } catch (err) {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <main className="flex-1">
      <div className="container max-w-4xl px-4 py-8 md:px-6">
        <Link href="/responder?tab=summaries">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tighter">Summarize Conversation</h1>
          <Badge variant="outline" className="px-3 py-1">
            Closed: {formatDate(conversation.closedAt)}
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="conversation">View Conversation</TabsTrigger>
            <TabsTrigger value="summarize">Create Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="conversation" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Conversation with {conversation.userPseudonym}</span>
                  <span className="text-sm font-normal text-muted-foreground">Topic: {conversation.topic}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "responder" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[80%] ${
                          message.sender === "responder" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <Avatar className={message.sender === "responder" ? "ml-2" : "mr-2"}>
                          <AvatarFallback>
                            {message.sender === "responder"
                              ? conversation.responderPseudonym.charAt(0)
                              : conversation.userPseudonym.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div
                            className={`rounded-lg p-4 ${
                              message.sender === "responder" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p className="whitespace-pre-line text-sm">{message.content}</p>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {message.sender === "responder"
                              ? conversation.responderPseudonym
                              : conversation.userPseudonym}{" "}
                            • {formatDate(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summarize" className="mt-6">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Create Summary</CardTitle>
                  <CardDescription>
                    Summarize this conversation for the knowledge base. The summary should be helpful for others with
                    similar questions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="summary">Summary (Markdown format)</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => handleGenerateAI("summary")}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate with AI
                      </Button>
                    </div>
                    <Textarea
                      id="summary"
                      placeholder="Write a summary of the conversation..."
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="min-h-32"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="category">Category</Label>
                        <Button type="button" variant="outline" size="sm" onClick={() => handleGenerateAI("category")}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          AI
                        </Button>
                      </div>
                      <Input
                        id="category"
                        placeholder="e.g., Relationships, Identity, Workplace"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Button type="button" variant="outline" size="sm" onClick={() => handleGenerateAI("tags")}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          AI
                        </Button>
                      </div>
                      <Input
                        id="tags"
                        placeholder="e.g., pronouns, coming out, family"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Preview</h3>
                    <Separator className="my-2" />
                    {summary ? (
                      <div className="prose dark:prose-invert max-w-none">
                        <p>{summary}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Your summary will appear here...</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !summary.trim() || !category.trim() || !tags.trim()}
                  >
                    {isSubmitting ? "Submitting..." : "Submit for Approval"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

