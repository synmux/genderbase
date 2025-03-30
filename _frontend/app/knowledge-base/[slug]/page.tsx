import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// This would typically come from a database or CMS
const articles = {
  "understanding-gender-identity": {
    title: "Understanding Gender Identity",
    author: "Dr. Jane Smith",
    date: "January 15, 2023",
    content: `
      <h2>What is Gender Identity?</h2>
      <p>Gender identity refers to a person's internal, deeply felt sense of their own gender. This can be male, female, a blend of both, or neither. It's important to understand that gender identity is different from biological sex, which refers to physical characteristics like chromosomes, hormone levels, and reproductive anatomy.</p>
      
      <h2>Key Concepts</h2>
      <p>Here are some important concepts to understand:</p>
      <ul>
        <li><strong>Cisgender</strong>: When a person's gender identity aligns with the sex they were assigned at birth.</li>
        <li><strong>Transgender</strong>: When a person's gender identity differs from the sex they were assigned at birth.</li>
        <li><strong>Non-binary</strong>: Gender identities that don't fit within the traditional male/female binary.</li>
        <li><strong>Gender expression</strong>: How a person presents their gender through behavior, clothing, hairstyle, voice, etc.</li>
      </ul>
      
      <h2>The Gender Spectrum</h2>
      <p>Rather than being a binary (male/female), gender is better understood as a spectrum with many possible identities and expressions. Some people identify strongly as male or female, while others may identify as both, neither, or somewhere in between.</p>
      
      <h2>Gender Development</h2>
      <p>Research suggests that gender identity development begins very early in life, often by age 3-4. By this age, many children have a strong sense of their gender identity. For transgender individuals, there may be a persistent feeling that their gender identity doesn't match their assigned sex.</p>
      
      <h2>Supporting Gender Diversity</h2>
      <p>Creating supportive environments for people of all gender identities involves:</p>
      <ul>
        <li>Using people's correct names and pronouns</li>
        <li>Avoiding assumptions about gender based on appearance</li>
        <li>Respecting privacy and confidentiality</li>
        <li>Educating yourself about gender diversity</li>
        <li>Advocating for inclusive policies and practices</li>
      </ul>
      
      <h2>Further Resources</h2>
      <p>If you're looking to learn more about gender identity, here are some recommended resources:</p>
      <ul>
        <li>GLAAD's <a href="https://www.glaad.org/reference/transgender">Transgender Resources</a></li>
        <li>The Trevor Project's <a href="https://www.thetrevorproject.org/resources/guide/understanding-gender-identities/">Guide to Understanding Gender Identity</a></li>
        <li>National Center for Transgender Equality's <a href="https://transequality.org/issues/resources/understanding-transgender-people-the-basics">Understanding Transgender People: The Basics</a></li>
      </ul>
    `,
  },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug as keyof typeof articles]

  if (!article) {
    return (
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6">
          <h1 className="text-3xl font-bold">Article not found</h1>
          <p className="mt-4">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/knowledge-base">
            <Button className="mt-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Knowledge Base
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1">
      <article className="container max-w-3xl px-4 py-12 md:px-6">
        <Link href="/knowledge-base">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Knowledge Base
          </Button>
        </Link>

        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{article.title}</h1>

        <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <User className="mr-1 h-4 w-4" />
            {article.author}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {article.date}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </main>
  )
}

