/**
 * Sidebar configurations for different sections
 * Following react.dev pattern with separate JSON files per section
 */

import sidebarDocs from "./sidebar-docs.json";
import sidebarLearn from "./sidebar-learn.json";
import sidebarReference from "./sidebar-reference.json";
import sidebarBlog from "./sidebar-blog.json";
import sidebarCommunity from "./sidebar-community.json";

export interface RouteItem {
  title?: string;
  path?: string;
  hasSectionHeader?: boolean;
  sectionHeader?: string;
  routes?: RouteItem[];
  external?: boolean;
  date?: string;
  author?: string;
}

export interface SidebarConfig {
  title: string;
  path?: string;
  routes: RouteItem[];
}

// Export all sidebars
export { sidebarDocs, sidebarLearn, sidebarReference, sidebarBlog, sidebarCommunity };

// Get sidebar by path
export function getSidebarByPath(pathname: string): SidebarConfig {
  if (pathname.startsWith("/learn")) {
    return sidebarLearn as SidebarConfig;
  }
  if (pathname.startsWith("/reference")) {
    return sidebarReference as SidebarConfig;
  }
  if (pathname.startsWith("/blog")) {
    return sidebarBlog as SidebarConfig;
  }
  if (pathname.startsWith("/community")) {
    return sidebarCommunity as SidebarConfig;
  }
  // /components should use the docs sidebar (same as /docs)
  if (pathname.startsWith("/components")) {
    return sidebarDocs as SidebarConfig;
  }
  // Default to docs
  return sidebarDocs as SidebarConfig;
}

// Helper to get all routes flattened
export function getAllRoutes(routes: RouteItem[] = []): RouteItem[] {
  const flatRoutes: RouteItem[] = [];

  for (const route of routes) {
    if (route.hasSectionHeader) {
      continue;
    }

    if (route.path && !route.external) {
      flatRoutes.push(route);
    }

    if (route.routes) {
      flatRoutes.push(...getAllRoutes(route.routes));
    }
  }

  return flatRoutes;
}

// Helper to find route by path
export function findRouteByPath(path: string, routes: RouteItem[]): RouteItem | null {
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
