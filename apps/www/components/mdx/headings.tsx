import * as React from "react";

interface HeadingsProps {
  children?: React.ReactNode;
}

export function Headings({ children }: HeadingsProps) {
  return (
    <div className="space-y-8 rounded-lg border bg-card p-6 text-card-foreground">
      <div className="space-y-2">
        <div className="scroll-m-20 text-4xl font-bold tracking-tight">
          Heading level 1
        </div>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs"># Heading level 1</code>
        </p>
      </div>

      <div className="space-y-2">
        <div className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Heading level 2
        </div>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">## Heading level 2</code>
        </p>
      </div>

      <div className="space-y-2">
        <div className="scroll-m-20 text-xl font-semibold tracking-tight">
          Heading level 3
        </div>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">### Heading level 3</code>
        </p>
      </div>

      <div className="space-y-2">
        <div className="scroll-m-20 text-base font-medium tracking-tight">
          Heading level 4
        </div>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">#### Heading level 4</code>
        </p>
      </div>

      <div className="space-y-2">
        <div className="scroll-m-20 text-base font-medium tracking-tight">
          Heading level 5
        </div>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">##### Heading level 5</code>
        </p>
      </div>

      <div className="space-y-2">
        <div className="scroll-m-20 text-sm font-medium tracking-tight">
          Heading level 6
        </div>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">###### Heading level 6</code>
        </p>
      </div>

      {children}
    </div>
  );
}
