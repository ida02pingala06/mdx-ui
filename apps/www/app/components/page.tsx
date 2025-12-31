import Link from "next/link";
import { allComponents } from "contentlayer/generated";
import { ArrowRight } from "lucide-react";

export default function ComponentsPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-[980px]">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl">
            Browse Components
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            {allComponents.length} beautifully designed MDX components for your documentation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allComponents.map((component) => (
            <Link
              key={component.slug}
              href={component.slug}
              className="group relative rounded-lg border bg-card p-6 transition-all hover:border-foreground/50 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold group-hover:underline">
                    {component.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {component.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              {component.registryDependencies && component.registryDependencies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {component.registryDependencies.map((dep) => (
                    <span
                      key={dep}
                      className="rounded-md bg-muted px-2 py-1 text-xs"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-lg border bg-muted/50 p-6">
          <h2 className="mb-2 text-lg font-semibold">Need a specific component?</h2>
          <p className="text-sm text-muted-foreground">
            All components are available via the CLI. Install any component directly into your project:
          </p>
          <div className="mt-4 rounded-md bg-background p-4">
            <code className="text-sm">npx mdx-ui add blockquote callout steps</code>
          </div>
        </div>
      </div>
    </div>
  );
}
