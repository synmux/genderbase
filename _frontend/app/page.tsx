import Link from "next/link";
import { ArrowRight, BookOpen, HelpCircle, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to Genderbase
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Educational resources about topics of gender for you and the
                people in your life.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/knowledge-base">
                <Button>Explore Knowledge Base</Button>
              </Link>
              <Link href="/ask">
                <Button variant="outline">Ask a Question</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How We Can Help
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Resources designed to support understanding and communication
                about gender.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  Knowledge Base
                </CardTitle>
                <BookOpen className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Educational resources about gender topics that you can share
                  with partners, friends, parents, or coworkers.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/knowledge-base"
                  className="flex items-center text-sm text-primary"
                >
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  How Do I Say...?
                </CardTitle>
                <HelpCircle className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Quick answers about correct terminology, words to use, words
                  to avoid, and why.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/how-do-i-say"
                  className="flex items-center text-sm text-primary"
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  Ask a Question
                </CardTitle>
                <MessageSquare className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Submit anonymous questions to a vetted team of responders. All
                  topics are welcome.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/ask"
                  className="flex items-center text-sm text-primary"
                >
                  Ask Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
