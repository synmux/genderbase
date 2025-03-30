import type React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Heart className="h-6 w-6 text-primary" />
        <span className="inline-block font-bold">Genderbase</span>
      </Link>
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link
          href="/knowledge-base"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Knowledge Base
        </Link>
        <Link
          href="/how-do-i-say"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          How Do I Say...?
        </Link>
        <Link
          href="/answered-questions"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Answered Questions
        </Link>
      </nav>
    </div>
  );
}
