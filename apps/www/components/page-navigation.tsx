import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAdjacentRoutes, type RouteItem } from "@/lib/docs-nav";

interface PageNavigationProps {
  currentPath: string;
}

export function PageNavigation({ currentPath }: PageNavigationProps) {
  const { prev, next } = getAdjacentRoutes(currentPath);

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="mt-12 flex items-center justify-between border-t pt-8">
      <div className="flex-1">
        {prev && (
          <Link
            href={prev.path!}
            className="group flex flex-col items-start gap-1 rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <span className="flex items-center text-sm text-muted-foreground">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </span>
            <span className="font-medium group-hover:underline">{prev.title}</span>
          </Link>
        )}
      </div>
      <div className="flex-1 text-right">
        {next && (
          <Link
            href={next.path!}
            className="group inline-flex flex-col items-end gap-1 rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <span className="flex items-center text-sm text-muted-foreground">
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </span>
            <span className="font-medium group-hover:underline">{next.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
