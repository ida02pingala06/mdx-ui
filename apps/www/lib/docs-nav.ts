/**
 * Navigation system following react.dev pattern
 * Based on their sidebar structure with section headers and nested routes
 */

import { sidebarDocs } from "@/config/sidebars";

export interface RouteItem {
  title?: string;
  path?: string;
  hasSectionHeader?: boolean;
  sectionHeader?: string;
  routes?: RouteItem[];
}

export interface DocsNavigation {
  title: string;
  path?: string;
  routes: RouteItem[];
}

export const docsNav = sidebarDocs as DocsNavigation;

/**
 * Get all routes flattened (for searching, breadcrumbs, next/prev navigation)
 * Only includes routes with paths (excludes section headers)
 */
export function getAllRoutes(routes: RouteItem[] = docsNav.routes): RouteItem[] {
  const flatRoutes: RouteItem[] = [];

  for (const route of routes) {
    // Skip section headers
    if (route.hasSectionHeader) {
      continue;
    }

    if (route.path) {
      flatRoutes.push(route);
    }

    if (route.routes) {
      flatRoutes.push(...getAllRoutes(route.routes));
    }
  }

  return flatRoutes;
}

/**
 * Find a route by path using depth-first search
 */
export function findRouteByPath(
  path: string,
  routes: RouteItem[] = docsNav.routes
): RouteItem | null {
  for (const route of routes) {
    if (route.path === path) {
      return route;
    }
    if (route.routes) {
      const found = findRouteByPath(path, route.routes);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Get breadcrumb trail for a path
 * Returns array of routes from root to current page
 */
export function getBreadcrumbs(
  path: string,
  routes: RouteItem[] = docsNav.routes
): RouteItem[] {
  const breadcrumbs: RouteItem[] = [];

  function search(items: RouteItem[], parents: RouteItem[] = []): boolean {
    for (const item of items) {
      // Skip section headers in breadcrumbs
      if (item.hasSectionHeader) {
        continue;
      }

      if (item.path === path) {
        breadcrumbs.push(...parents, item);
        return true;
      }

      if (item.routes) {
        // Only add to parents if it has a path
        const newParents = item.path ? [...parents, item] : parents;
        if (search(item.routes, newParents)) {
          return true;
        }
      }
    }
    return false;
  }

  search(routes);
  return breadcrumbs;
}

/**
 * Get next and previous routes for navigation
 * Useful for "Previous" and "Next" page links
 */
export function getAdjacentRoutes(path: string): {
  prev: RouteItem | null;
  next: RouteItem | null;
} {
  const allRoutes = getAllRoutes();
  const currentIndex = allRoutes.findIndex((route) => route.path === path);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? allRoutes[currentIndex - 1] : null,
    next: currentIndex < allRoutes.length - 1 ? allRoutes[currentIndex + 1] : null,
  };
}

/**
 * Check if a route is active (current or ancestor of current)
 */
export function isRouteActive(routePath: string, currentPath: string): boolean {
  return currentPath === routePath || currentPath.startsWith(routePath + "/");
}

/**
 * Get the section header that precedes a route
 */
export function getSectionHeader(path: string, routes: RouteItem[] = docsNav.routes): string | null {
  let lastHeader: string | null = null;

  for (const route of routes) {
    if (route.hasSectionHeader && route.sectionHeader) {
      lastHeader = route.sectionHeader;
    } else if (route.path === path) {
      return lastHeader;
    } else if (route.routes) {
      const found = getSectionHeader(path, route.routes);
      if (found !== null) {
        return found;
      }
    }
  }

  return null;
}
