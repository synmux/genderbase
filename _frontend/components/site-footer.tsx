import Link from "next/link";
import { Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Heart className="h-5 w-5 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built with care for the gender-diverse community.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/about"
            className="text-sm font-medium underline underline-offset-4"
          >
            About
          </Link>
          <Link
            href="/volunteer"
            className="text-sm font-medium underline underline-offset-4"
          >
            Volunteer
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium underline underline-offset-4"
          >
            Privacy
          </Link>
          <Link
            href="/responder"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
            aria-label="Responder Dashboard"
          >
            Responder
          </Link>
        </div>
      </div>
    </footer>
  );
}
