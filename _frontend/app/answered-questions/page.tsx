import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would typically come from a database or CMS
const answeredQuestions = [
  {
    id: "aq1",
    title: "Supporting a Partner During Transition",
    preview:
      "Advice on how to be supportive of a transgender partner throughout their transition journey, including emotional support, practical help, and resources.",
    category: "Relationships",
    tags: ["transgender", "partner support", "transition", "emotional support", "resources"],
    date: "June 10, 2023",
  },
  {
    id: "aq2",
    title: "Coming Out as Non-Binary at Work",
    preview:
      "Guidance on how to come out as non-binary in a professional setting, including preparation, conversations with HR, and handling various reactions from colleagues.",
    category: "Workplace",
    tags: ["non-binary", "coming out", "workplace", "professional", "colleagues"],
    date: "June 5, 2023",
  },
  {
    id: "aq3",
    title: "Explaining Gender Identity to Children",
    preview:
      "Age-appropriate ways to discuss gender identity and diversity with children, with specific language suggestions and recommended resources.",
    category: "Parenting",
    tags: ["children", "education", "gender identity", "parenting", "age-appropriate"],
    date: "May 28, 2023",
  },
  {
    id: "aq4",
    title: "Navigating Gender-Affirming Healthcare",
    preview:
      "Information about accessing gender-affirming healthcare, including finding supportive providers, understanding insurance coverage, and preparing for appointments.",
    category: "Healthcare",
    tags: ["healthcare", "medical", "insurance", "providers", "gender-affirming care"],
    date: "May 20, 2023",
  },
  {
    id: "aq5",
    title: "Supporting a Friend Who Is Questioning Their Gender",
    preview:
      "How to be a supportive friend to someone who is questioning or exploring their gender identity, with emphasis on listening, respecting privacy, and helpful resources.",
    category: "Relationships",
    tags: ["questioning", "friendship", "support", "resources", "listening"],
    date: "May 15, 2023",
  },
  {
    id: "aq6",
    title: "Understanding Gender Pronouns",
    preview:
      "A comprehensive guide to gender pronouns, including how to use them correctly, what to do if you make a mistake, and how to create more inclusive environments.",
    category: "Communication",
    tags: ["pronouns", "they/them", "language", "inclusion", "respect"],
    date: "May 8, 2023",
  },
]

const categories = ["All", "Relationships", "Workplace", "Parenting", "Healthcare", "Communication"]

export default function AnsweredQuestionsPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Answered Questions</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Browse through previously answered questions to find information that might help you.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl py-12">
            <div className="flex w-full max-w-sm items-center space-x-2 mb-8 mx-auto">
              <Input type="text" placeholder="Search answered questions..." />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            <Tabs defaultValue="All" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-6 space-y-6">
                  {answeredQuestions
                    .filter((q) => category === "All" || q.category === category)
                    .map((question) => (
                      <Card key={question.id}>
                        <CardHeader>
                          <CardTitle>{question.title}</CardTitle>
                          <CardDescription>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="secondary">{question.category}</Badge>
                              {question.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{question.preview}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{question.date}</span>
                          <Link href={`/answered-questions/${question.id}`}>
                            <Button variant="outline">Read More</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  )
}

