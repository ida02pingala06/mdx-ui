export default function BlogPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Latest updates, tutorials, and announcements from the MDX UI team.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          <article className="rounded-lg border p-6">
            <div className="mb-4">
              <h2 className="mb-2 text-2xl font-semibold">Announcing MDX UI v1.0</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time>January 31, 2025</time>
                <span>•</span>
                <span>MDX UI Team</span>
              </div>
            </div>
            <p className="leading-7 text-muted-foreground">
              We're excited to announce the first stable release of MDX UI. This release includes
              12 production-ready components, a powerful CLI tool, and comprehensive documentation.
            </p>
          </article>

          <article className="rounded-lg border p-6">
            <div className="mb-4">
              <h2 className="mb-2 text-2xl font-semibold">Building Better Documentation</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time>January 15, 2025</time>
                <span>•</span>
                <span>MDX UI Team</span>
              </div>
            </div>
            <p className="leading-7 text-muted-foreground">
              Learn best practices for creating engaging documentation with MDX UI components.
              We'll cover navigation patterns, content structure, and accessibility considerations.
            </p>
          </article>

          <article className="rounded-lg border p-6">
            <div className="mb-4">
              <h2 className="mb-2 text-2xl font-semibold">Introducing MDX UI</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time>December 15, 2024</time>
                <span>•</span>
                <span>MDX UI Team</span>
              </div>
            </div>
            <p className="leading-7 text-muted-foreground">
              MDX UI is a new project aimed at making it easier to build beautiful, accessible
              documentation sites with MDX. Here's what makes it different.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
