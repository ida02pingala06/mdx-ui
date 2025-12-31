import Link from "next/link";
import { Code2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6" />
            <span className="font-bold">MDX UI</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-6 text-sm font-medium">
          <Link
            href="/docs"
            className="transition-colors hover:text-foreground/80"
          >
            Documentation
          </Link>
          <Link
            href="/components"
            className="transition-colors hover:text-foreground/80"
          >
            Components
          </Link>
          <Link
            href="https://github.com/yourusername/mdx-ui"
            className="transition-colors hover:text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
