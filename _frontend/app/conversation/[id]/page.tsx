"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// This would come from an API in a real application
const sampleConversation = {
  id: "sample-conversation",
  status: "active", // active, closed
  userPseudonym: "CuriousPenguin",
  responderPseudonym: "WiseOwl",
  messages: [
    {
      id: "1",
      sender: "user",
      content:
        "I have a friend who recently came out as non-binary, and I want to be supportive but I'm not sure how to refer to them properly. What pronouns should I use?",
      timestamp: "2023-06-15T14:30:00Z",
    },
    {
      id: "2",
      sender: "responder",
      content:
        'Thank you for your question and for wanting to support your friend! The best way to know which pronouns to use is to ask your friend directly. Many non-binary people use they/them pronouns, but some may use other pronouns like she/her, he/him, or neopronouns like ze/zir or xe/xem. It\'s important not to assume based on appearance or your prior knowledge of them. A simple way to ask could be: "What pronouns do you use?" This shows respect for their identity and willingness to support them.',
      timestamp: "2023-06-15T15:45:00Z",
    },
    {
      id: "3",
      sender: "user",
      content:
        "Thanks for the advice. I'm a bit nervous about asking because I don't want to make them uncomfortable. Is there a good way to bring it up naturally?",
      timestamp: "2023-06-16T09:20:00Z",
    },
    {
      id: "4",
      sender: "responder",
      content:
        "That's a thoughtful concern! One way to make the conversation feel more natural is to share your own pronouns first when you're talking with them. For example, you might say, \"By the way, I use she/her pronouns. What pronouns do you use?\" This normalizes the exchange of pronoun information. Another approach is to find a quiet moment when you're one-on-one and simply say something like, \"I want to make sure I'm respecting your identity. Could you let me know which pronouns you'd like me to use?\" Most people appreciate being asked rather than having others guess or avoid the topic altogether.",
      timestamp: "2023-06-16T10:15:00Z",
    },
  ],
};

export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState(sampleConversation);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    setIsSubmitting(true);

    // In a real application, this would be an API call
    // await fetch(`/api/conversations/${params.id}/messages`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ content: newMessage }),
    // })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Add the new message to the conversation
    const updatedConversation = {
      ...conversation,
      messages: [
        ...conversation.messages,
        {
          id: Date.now().toString(),
          sender: "user",
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    setConversation(updatedConversation);
    setNewMessage("");
    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <main className="flex-1">
      <div className="container max-w-4xl px-4 py-8 md:px-6">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Conversation with {conversation.responderPseudonym}</span>
              <span className="text-sm font-normal text-muted-foreground">
                Your pseudonym: {conversation.userPseudonym}
              </span>
            </CardTitle>
            <CardDescription>
              This conversation is anonymous. Neither you nor the responder can
              see each other's identifying information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar
                      className={message.sender === "user" ? "ml-2" : "mr-2"}
                    >
                      <AvatarFallback>
                        {message.sender === "user"
                          ? conversation.userPseudonym.charAt(0)
                          : conversation.responderPseudonym.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div
                        className={`rounded-lg p-4 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {message.sender === "user"
                          ? conversation.userPseudonym
                          : conversation.responderPseudonym}{" "}
                        • {formatDate(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {conversation.status === "closed" && (
              <Alert className="mt-6">
                <AlertTitle>This conversation has been closed</AlertTitle>
                <AlertDescription>
                  You can no longer send messages in this conversation. If you
                  have more questions, please start a new conversation.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          {conversation.status === "active" && (
            <CardFooter>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex w-full items-center space-x-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isSubmitting || !newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </form>
            </CardFooter>
          )}
        </Card>
      </div>
    </main>
  );
}
