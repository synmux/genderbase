"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AskPage() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [noEmail, setNoEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!question.trim()) {
      setError("Please enter your question");
      return;
    }

    if (!email.trim() && !noEmail) {
      setError("Please enter your email or check the 'No email' option");
      return;
    }

    setIsSubmitting(true);

    try {
      // This would be an API call in a real application
      // await fetch("/api/questions", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ question, email: noEmail ? null : email }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a random conversation ID
      const conversationId = Math.random().toString(36).substring(2, 15);

      // Redirect to the conversation page
      router.push(`/conversation/${conversationId}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ask a Question
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Submit your question anonymously to our vetted team of
                responders.
              </p>
            </div>
          </div>

          <Card className="mx-auto max-w-2xl mt-12">
            <CardHeader>
              <CardTitle>Your Question</CardTitle>
              <CardDescription>
                Feel free to ask anything about gender topics. We're here to
                help, and your identity will remain anonymous.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Textarea
                    id="question"
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="min-h-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={noEmail}
                  />
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="no-email"
                      checked={noEmail}
                      onCheckedChange={(checked) => {
                        setNoEmail(checked as boolean);
                        if (checked) {
                          setEmail("");
                        }
                      }}
                    />
                    <Label
                      htmlFor="no-email"
                      className="text-sm text-muted-foreground"
                    >
                      I don't want to provide an email (you won't receive
                      notifications about responses)
                    </Label>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>By submitting a question, you agree to our terms:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      Your question will be answered anonymously by a vetted
                      responder
                    </li>
                    <li>Your identity will never be shared with responders</li>
                    <li>
                      Summarized conversations may be published to help others
                      (without identifying details)
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Question <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </section>
    </main>
  );
}
