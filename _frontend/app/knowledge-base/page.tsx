import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This would typically come from a database or CMS
const articles = [
  {
    id: "understanding-gender-identity",
    category: "basics",
    title: "Understanding Gender Identity",
    description: "An introduction to gender identity concepts and terminology.",
    author: "Dr. Jane Smith",
  },
  {
    id: "supporting-transgender-loved-ones",
    category: "support",
    title: "Supporting Transgender Loved Ones",
    description: "How to be an ally to transgender friends and family members.",
    author: "Alex Johnson",
  },
  {
    id: "gender-affirming-language",
    category: "communication",
    title: "Gender-Affirming Language",
    description: "A guide to using respectful and affirming language.",
    author: "Sam Rivera",
  },
  {
    id: "gender-expression-vs-identity",
    category: "basics",
    title: "Gender Expression vs. Gender Identity",
    description:
      "Understanding the difference between how people express their gender and how they identify.",
    author: "Dr. Taylor Williams",
  },
  {
    id: "workplace-inclusion",
    category: "workplace",
    title: "Gender Inclusion in the Workplace",
    description:
      "Best practices for creating inclusive workplace environments.",
    author: "Jordan Lee",
  },
  {
    id: "parenting-gender-diverse-children",
    category: "parenting",
    title: "Parenting Gender-Diverse Children",
    description:
      "Guidance for parents of gender-diverse and transgender children.",
    author: "Dr. Morgan Chen",
  },
];

export default function KnowledgeBasePage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Knowledge Base
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Educational resources about gender topics that you can share
                with partners, friends, parents, or coworkers.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-5xl py-12">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="basics">Basics</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
                <TabsTrigger value="workplace">Workplace</TabsTrigger>
                <TabsTrigger value="parenting">Parenting</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <Card key={article.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl">
                          {article.title}
                        </CardTitle>
                        <CardDescription>{article.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          By {article.author}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/knowledge-base/${article.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Read Article <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              {[
                "basics",
                "support",
                "communication",
                "workplace",
                "parenting",
              ].map((category) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles
                      .filter((article) => article.category === category)
                      .map((article) => (
                        <Card key={article.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl">
                              {article.title}
                            </CardTitle>
                            <CardDescription>
                              {article.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              By {article.author}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Link href={`/knowledge-base/${article.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                Read Article{" "}
                                <ArrowRight className="ml-1 h-4 w-4" />
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  );
}
