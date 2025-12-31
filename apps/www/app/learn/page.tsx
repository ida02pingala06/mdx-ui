export default function LearnPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Quick Start</h1>
          <p className="text-lg text-muted-foreground">
            Get started with MDX UI in minutes.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              What is MDX UI?
            </h2>
            <p className="leading-7">
              MDX UI is a collection of beautifully designed, accessible, and customizable components
              for MDX-based documentation sites. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </section>

          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Installation
            </h2>
            <p className="leading-7">
              Install MDX UI components with a single command:
            </p>
            <div className="my-4 rounded-lg border bg-muted p-4">
              <code className="text-sm">npx mdx-ui add [component-name]</code>
            </div>
          </section>

          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Next Steps
            </h2>
            <ul className="ml-6 list-disc space-y-2">
              <li>Choose your framework (Next.js, Vite, Remix)</li>
              <li>Install your first component</li>
              <li>Customize the theme to match your brand</li>
              <li>Build your documentation site</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
