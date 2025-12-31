import * as React from "react";

interface HeadingsProps {
  children?: React.ReactNode;
}

export function Headings({ children }: HeadingsProps) {
  return (
    <div className="not-prose space-y-8 rounded-lg border bg-card p-6 text-card-foreground">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Heading level 1
        </h1>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs"># Heading level 1</code>
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          Heading level 2
        </h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">## Heading level 2</code>
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Heading level 3
        </h3>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">### Heading level 3</code>
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Heading level 4
        </h4>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">#### Heading level 4</code>
        </p>
      </div>

      <div className="space-y-4">
        <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Heading level 5
        </h5>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">##### Heading level 5</code>
        </p>
      </div>

      <div className="space-y-4">
        <h6 className="scroll-m-20 text-base font-semibold tracking-tight">
          Heading level 6
        </h6>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">###### Heading level 6</code>
        </p>
      </div>

      {children}
    </div>
  );
}
