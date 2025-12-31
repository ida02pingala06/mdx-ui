export default function ReferencePage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">API Reference</h1>
          <p className="text-lg text-muted-foreground">
            Complete API documentation for MDX UI components and utilities.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Overview
            </h2>
            <p className="leading-7">
              This reference covers all components, CLI commands, and utilities available in MDX UI.
              Each component includes detailed prop documentation, usage examples, and accessibility notes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Component Categories
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Typography</h3>
                <p className="text-sm text-muted-foreground">
                  Text formatting components like Blockquote, Callout, and Lead.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Code</h3>
                <p className="text-sm text-muted-foreground">
                  Code blocks with syntax highlighting and copy buttons.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Interactive</h3>
                <p className="text-sm text-muted-foreground">
                  Tabs, Accordions, and other interactive elements.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Layout</h3>
                <p className="text-sm text-muted-foreground">
                  Grid, Cards, and other layout components.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
