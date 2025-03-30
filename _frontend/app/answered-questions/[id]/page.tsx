import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// This would typically come from a database or CMS
const answeredQuestions = {
  aq1: {
    title: "Supporting a Partner During Transition",
    category: "Relationships",
    tags: [
      "transgender",
      "partner support",
      "transition",
      "emotional support",
      "resources",
    ],
    date: "June 10, 2023",
    content: `
      ## Supporting a Partner During Transition

      Supporting a transgender partner through their transition is a journey that requires understanding, patience, and open communication. Here are key ways to provide meaningful support:

      ### Active Listening and Communication

      - **Listen without judgment**: Create space for your partner to express their feelings, fears, and hopes.
      - **Ask thoughtful questions**: Show interest in their experience while respecting boundaries.
      - **Share your own feelings**: Be honest about your own process while centering their needs.

      ### Practical Support

      - **Help with research**: Look into healthcare providers, legal name changes, or other transition-related processes.
      - **Accompany them to appointments**: Offer to attend medical appointments or consultations if they want company.
      - **Assist with workplace transitions**: Help them prepare for coming out at work through role-playing conversations or researching company policies.

      ### Emotional Support

      - **Validate fluctuating emotions**: Recognize that both confidence and overwhelm are normal parts of the transition process.
      - **Offer specific help**: Rather than general statements like "let me know if you need anything," make concrete offers of support.
      - **Celebrate milestones**: Acknowledge and celebrate steps in their transition that feel significant to them.

      ### Self-Care for Partners

      - **Develop your own support system**: Find friends, support groups, or therapists who understand your experience.
      - **Educate yourself independently**: Don't rely solely on your partner to educate you about transgender experiences.
      - **Process your own emotions**: It's normal to have your own complex feelings about the changes in your relationship.

      ### Recommended Resources

      - **Books**: "Transgender 101" by Nicholas Teich and "Love Lives Here" by Amanda Jetté Knox
      - **Online communities**: PFLAG (pflag.org) offers resources for both transgender individuals and their partners/families.
      - **Support groups**: Many cities have in-person or virtual groups for transgender people and their partners.
      - **Healthcare resources**: The World Professional Association for Transgender Health (WPATH) provides guidelines and provider directories.

      Remember that every transition journey is unique, and the best support comes from understanding your specific partner's needs and preferences. Regular check-ins about how you can best support each other will strengthen your relationship throughout this significant life change.
    `,
  },
};

export default function AnsweredQuestionPage({
  params,
}: {
  params: { id: string };
}) {
  const question =
    answeredQuestions[params.id as keyof typeof answeredQuestions];

  if (!question) {
    return (
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6">
          <h1 className="text-3xl font-bold">Question not found</h1>
          <p className="mt-4">
            The question you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/answered-questions">
            <Button className="mt-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Answered Questions
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <article className="container max-w-3xl px-4 py-12 md:px-6">
        <Link href="/answered-questions">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Answered Questions
          </Button>
        </Link>

        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {question.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{question.category}</Badge>
          {question.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
          <span className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            {question.date}
          </span>
        </div>

        <Separator className="my-6" />

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: question.content.replace(/\n/g, "<br>"),
          }}
        />

        <div className="mt-12 rounded-lg border p-4">
          <h3 className="text-lg font-medium">Was this helpful?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            If you have more questions about this topic, you can always ask a
            new question.
          </p>
          <div className="mt-4 flex gap-4">
            <Link href="/ask">
              <Button>Ask a Question</Button>
            </Link>
            <Link href="/knowledge-base">
              <Button variant="outline">Explore Knowledge Base</Button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
