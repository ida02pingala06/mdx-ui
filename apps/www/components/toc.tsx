"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/toc";

interface TocProps {
  toc: TocEntry[];
}

export function TableOfContents({ toc }: TocProps) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0% 0% -80% 0%",
      }
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  if (!toc || toc.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">On This Page</p>
      <Tree tree={toc} activeId={activeId} />
    </div>
  );
}

function Tree({ tree, activeId }: { tree: TocEntry[]; activeId: string }) {
  return tree?.length ? (
    <div className="flex flex-col space-y-3">
      {tree.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "inline-block text-sm leading-snug no-underline transition-colors hover:text-foreground",
            item.level === 3 && "pl-4",
            activeId === item.id
              ? "font-medium text-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.text}
        </a>
      ))}
    </div>
  ) : null;
}
