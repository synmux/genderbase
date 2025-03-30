import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would typically come from a database or CMS
const terminologyItems = [
  {
    id: "pronouns",
    category: "pronouns",
    question: "How do I ask someone about their pronouns?",
    answer:
      "You can simply say, 'What pronouns do you use?' or 'Can you remind me of your pronouns?' It's best to normalize this by sharing your own pronouns when introducing yourself.",
    doUse: ["What pronouns do you use?", "My pronouns are...", "Can you remind me of your pronouns?"],
    dontUse: ["What are your preferred pronouns?", "Are you a he or a she?", "What gender are you?"],
  },
  {
    id: "transgender",
    category: "identity",
    question: "What's the correct way to refer to someone who is transgender?",
    answer:
      "Use 'transgender' as an adjective, not a noun. Say 'transgender person' or 'transgender woman/man,' not 'a transgender' or 'transgendered.' Always use the person's current name and pronouns.",
    doUse: ["transgender person", "transgender woman", "transgender man"],
    dontUse: ["transgendered", "a transgender", "transsexual", "tranny"],
  },
  {
    id: "deadname",
    category: "names",
    question: "What is deadnaming and how do I avoid it?",
    answer:
      "Deadnaming is using someone's birth name when they have changed their name as part of their gender transition. Always use a person's current name, not their birth name, even when referring to them in the past.",
    doUse: ["their current name", "the name they use now"],
    dontUse: ["birth name", "real name", "given name", "when they were [deadname]"],
  },
  {
    id: "nonbinary",
    category: "identity",
    question: "How do I refer to someone who is non-binary?",
    answer:
      "Use the pronouns they've told you they use. Many non-binary people use 'they/them' pronouns, but some use other pronouns. If you're unsure, it's okay to respectfully ask.",
    doUse: ["they/them (if that's what they use)", "the person's name", "the pronouns they've told you they use"],
    dontUse: ["it", "he/she", "assuming pronouns based on appearance"],
  },
  {
    id: "misgendering",
    category: "mistakes",
    question: "What should I do if I accidentally misgender someone?",
    answer:
      "Briefly apologize, correct yourself, and move on. Don't make a big deal about it or over-apologize, as this can create more discomfort. For example, 'Sorry, they mentioned...' and continue the conversation.",
    doUse: ["Brief apology", "Correction", "Moving on with the conversation"],
    dontUse: ["Lengthy apologies", "Excuses", "Drawing attention to the mistake"],
  },
  {
    id: "inclusive-language",
    category: "general",
    question: "How can I make my language more gender-inclusive?",
    answer:
      "Use gender-neutral terms like 'everyone' instead of 'ladies and gentlemen,' 'person' instead of 'man/woman,' and 'they' as a singular pronoun when gender is unknown or irrelevant.",
    doUse: ["everyone", "folks", "people", "they (singular)", "person", "partner"],
    dontUse: ["ladies and gentlemen", "guys", "mankind", "he/she", "husband/wife (unless specific)"],
  },
]

export default function HowDoISayPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Do I Say...?</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Quick answers about correct terminology, words to use, words to avoid, and why.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl py-12">
            <div className="flex w-full max-w-sm items-center space-x-2 mb-8 mx-auto">
              <Input type="text" placeholder="Search terminology..." />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pronouns">Pronouns</TabsTrigger>
                <TabsTrigger value="identity">Identity</TabsTrigger>
                <TabsTrigger value="names">Names</TabsTrigger>
                <TabsTrigger value="mistakes">Mistakes</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6 space-y-6">
                {terminologyItems.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <CardTitle>{item.question}</CardTitle>
                      <CardDescription>
                        <Badge>{item.category}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{item.answer}</p>

                      <div>
                        <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Do Use:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {item.doUse.map((term, index) => (
                            <li key={index}>{term}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Don't Use:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {item.dontUse.map((term, index) => (
                            <li key={index}>{term}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {["pronouns", "identity", "names", "mistakes", "general"].map((category) => (
                <TabsContent key={category} value={category} className="mt-6 space-y-6">
                  {terminologyItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <Card key={item.id}>
                        <CardHeader>
                          <CardTitle>{item.question}</CardTitle>
                          <CardDescription>
                            <Badge>{item.category}</Badge>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p>{item.answer}</p>

                          <div>
                            <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Do Use:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {item.doUse.map((term, index) => (
                                <li key={index}>{term}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Don't Use:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {item.dontUse.map((term, index) => (
                                <li key={index}>{term}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
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

