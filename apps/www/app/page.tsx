import Link from "next/link";
import { ArrowRight, Palette, Code2, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="container flex flex-col items-center gap-4 py-24 md:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Beautiful MDX Components <br className="hidden sm:inline" />
            for your documentation
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Beautifully designed, accessible components for your MDX content.
            Copy, paste, and customize to your needs.
          </p>
          <div className="flex gap-4">
            <Link
              href="/docs"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/components"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Browse Components
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-24">
        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Beautiful by Default</h3>
            <p className="text-sm text-muted-foreground">
              Every component is thoughtfully designed with attention to detail
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Copy & Paste</h3>
            <p className="text-sm text-muted-foreground">
              Install components directly into your project with a single command
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Fully Customizable</h3>
            <p className="text-sm text-muted-foreground">
              Built with Tailwind CSS. Customize colors, spacing, and more
            </p>
          </div>
        </div>
      </section>

      <section className="container border-t py-12 md:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Start building beautiful docs today
          </h2>
          <p className="max-w-[750px] text-lg text-muted-foreground">
            Get started with MDX UI and build amazing documentation sites
          </p>
          <div className="flex gap-4">
            <Link
              href="/docs/installation"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Installation Guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
