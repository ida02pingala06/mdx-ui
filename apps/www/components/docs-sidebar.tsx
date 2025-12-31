"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsNav, type RouteItem } from "@/lib/docs-nav";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <SidebarRouteTree routes={docsNav.routes} pathname={pathname} />
    </nav>
  );
}

interface SidebarRouteTreeProps {
  routes: RouteItem[];
  pathname: string;
  level?: number;
}

function SidebarRouteTree({ routes, pathname, level = 0 }: SidebarRouteTreeProps) {
  return (
    <div className="space-y-1">
      {routes.map((route, index) => {
        // Render section header
        if (route.hasSectionHeader) {
          return (
            <div
              key={`section-${index}`}
              className={cn(
                "px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                level > 0 && "mt-4"
              )}
            >
              {route.sectionHeader}
            </div>
          );
        }

        // Render route with potential children
        return (
          <SidebarRoute
            key={route.path || index}
            route={route}
            pathname={pathname}
            level={level}
          />
        );
      })}
    </div>
  );
}

interface SidebarRouteProps {
  route: RouteItem;
  pathname: string;
  level: number;
}

function SidebarRoute({ route, pathname, level }: SidebarRouteProps) {
  const hasChildren = route.routes && route.routes.length > 0;
  const isActive = pathname === route.path;
  const isOpen = pathname.startsWith(route.path || "");

  const [isExpanded, setIsExpanded] = useState(isOpen);

  // If route has children, show as expandable group
  if (hasChildren) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            isActive && "bg-accent font-medium text-accent-foreground",
            !isActive && "text-muted-foreground",
            level > 0 && "pl-4"
          )}
        >
          <span>{route.title}</span>
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              isExpanded && "rotate-90"
            )}
          />
        </button>

        {isExpanded && (
          <div className={cn("ml-0 space-y-1", level === 0 && "ml-2")}>
            <SidebarRouteTree
              routes={route.routes}
              pathname={pathname}
              level={level + 1}
            />
          </div>
        )}
      </div>
    );
  }

  // Leaf node - just a link
  return (
    <Link
      href={route.path || "#"}
      className={cn(
        "block rounded-md px-2 py-1.5 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent font-medium text-accent-foreground",
        !isActive && "text-muted-foreground",
        level > 0 && "pl-4"
      )}
    >
      {route.title}
    </Link>
  );
}
