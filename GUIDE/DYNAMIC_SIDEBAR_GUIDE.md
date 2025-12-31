# Dynamic Sidebar System Guide

## Overview

The dynamic sidebar system automatically selects and adapts navigation based on the current URL path. It supports multiple sections while sharing the same sidebar configuration through intelligent path transformation.

## Key Features

1. **Automatic Sidebar Selection** - Different sidebars for different sections
2. **Path Transformation** - Same sidebar config works for both `/docs` and `/components`
3. **Clickable Parent Items** - Parent items navigate AND expand/collapse
4. **Active State Tracking** - Highlights current page and expands parent sections

## How It Works

### 1. Path-Based Sidebar Selection

The `getSidebarByPath()` function in [config/sidebars.ts](apps/www/config/sidebars.ts) determines which sidebar to use:

```typescript
export function getSidebarByPath(pathname: string): SidebarConfig {
  if (pathname.startsWith("/learn")) return sidebarLearn;
  if (pathname.startsWith("/reference")) return sidebarReference;
  if (pathname.startsWith("/blog")) return sidebarBlog;
  if (pathname.startsWith("/community")) return sidebarCommunity;
  if (pathname.startsWith("/components")) return sidebarDocs; // Shares docs sidebar
  return sidebarDocs; // Default
}
```

### 2. Path Transformation

When viewing `/components/*`, the sidebar automatically transforms all `/docs/*` paths to `/components/*`:

```typescript
// In DynamicSidebar component
const isComponentsSection = pathname.startsWith("/components");
const pathPrefix = isComponentsSection ? "/components" : "/docs";

// In SidebarRoute component
const transformPath = (originalPath: string | undefined) => {
  if (!originalPath) return "#";
  return originalPath.replace(/^\/docs/, pathPrefix);
};
```

**Example:**
- Sidebar JSON has: `"/docs/components/blockquote"`
- When viewing `/components/*`, transforms to: `"/components/blockquote"`
- When viewing `/docs/*`, stays as: `"/docs/components/blockquote"`

### 3. Dual Route Support

Both routes work for the same content:
- `/docs/components/blockquote` - Uses docs layout
- `/components/blockquote` - Uses components layout
- Both show the same MDX content, just different URL structure

## File Structure

```
apps/www/
├── app/
│   ├── docs/
│   │   ├── layout.tsx                    # Docs section layout
│   │   ├── page.tsx                      # /docs
│   │   └── components/[...slug]/page.tsx # /docs/components/*
│   ├── components/
│   │   ├── layout.tsx                    # Components section layout
│   │   ├── page.tsx                      # /components (gallery)
│   │   └── [...slug]/page.tsx            # /components/* (mirror of docs)
│   ├── learn/
│   │   ├── layout.tsx                    # Learn section layout
│   │   └── page.tsx                      # /learn
│   ├── reference/
│   │   ├── layout.tsx                    # Reference section layout
│   │   └── page.tsx                      # /reference
│   ├── blog/
│   │   ├── layout.tsx                    # Blog section layout
│   │   └── page.tsx                      # /blog
│   └── community/
│       ├── layout.tsx                    # Community section layout
│       └── page.tsx                      # /community
├── components/
│   └── dynamic-sidebar.tsx               # Auto-selecting sidebar component
└── config/
    ├── sidebars.ts                       # Central sidebar management
    ├── sidebar-docs.json                 # Docs/Components navigation
    ├── sidebar-learn.json                # Learn section navigation
    ├── sidebar-reference.json            # API reference navigation
    ├── sidebar-blog.json                 # Blog navigation
    └── sidebar-community.json            # Community navigation
```

## Usage Examples

### Example 1: Navigation in /components Section

When user visits `/components/blockquote`:
1. Layout detects pathname starts with `/components`
2. `getSidebarByPath()` returns `sidebarDocs`
3. `DynamicSidebar` sets `pathPrefix="/components"`
4. All sidebar links are transformed:
   - `"/docs"` → `"/components"`
   - `"/docs/components/blockquote"` → `"/components/blockquote"`
   - `"/docs/components/callout"` → `"/components/callout"`

### Example 2: Navigation in /docs Section

When user visits `/docs/components/blockquote`:
1. Layout detects pathname starts with `/docs`
2. `getSidebarByPath()` returns `sidebarDocs`
3. `DynamicSidebar` sets `pathPrefix="/docs"`
4. Sidebar links remain unchanged:
   - `"/docs"` stays as `"/docs"`
   - `"/docs/components/blockquote"` stays as `"/docs/components/blockquote"`

### Example 3: Clickable Parent Items

Parent items with children now support both navigation and expansion:

```tsx
// In sidebar JSON
{
  "title": "Components",
  "path": "/docs/components",  // Parent has a path
  "routes": [
    { "title": "Blockquote", "path": "/docs/components/blockquote" },
    { "title": "Callout", "path": "/docs/components/callout" }
  ]
}
```

**Behavior:**
- Click on "Components" text → Navigates to `/docs/components` (or `/components` if path is transformed)
- Click on chevron icon → Toggles expansion of child routes
- Auto-expands when navigating to a child route

## Sidebar JSON Schema

### Route Types

#### 1. Section Header
```json
{
  "hasSectionHeader": true,
  "sectionHeader": "GETTING STARTED"
}
```

#### 2. Parent with Children (Expandable)
```json
{
  "title": "Components",
  "path": "/docs/components",
  "routes": [
    { "title": "Blockquote", "path": "/docs/components/blockquote" }
  ]
}
```

#### 3. Simple Link
```json
{
  "title": "Introduction",
  "path": "/docs"
}
```

#### 4. External Link
```json
{
  "title": "GitHub",
  "path": "https://github.com/...",
  "external": true
}
```

#### 5. Blog Post with Metadata
```json
{
  "title": "Announcing v1.0",
  "path": "/blog/2025/01/announcing-v1",
  "date": "January 31, 2025",
  "author": "MDX UI Team"
}
```

## Adding New Sections

### Step 1: Create Sidebar JSON

Create `apps/www/config/sidebar-examples.json`:

```json
{
  "title": "Examples",
  "path": "/examples",
  "routes": [
    {
      "hasSectionHeader": true,
      "sectionHeader": "Templates"
    },
    {
      "title": "Documentation Site",
      "path": "/examples/docs-site"
    }
  ]
}
```

### Step 2: Export from sidebars.ts

```typescript
import sidebarExamples from "./sidebar-examples.json";

export { sidebarExamples };

export function getSidebarByPath(pathname: string): SidebarConfig {
  if (pathname.startsWith("/examples")) {
    return sidebarExamples as SidebarConfig;
  }
  // ... existing code
}
```

### Step 3: Create Layout

Create `apps/www/app/examples/layout.tsx`:

```tsx
import { DynamicSidebar } from "@/components/dynamic-sidebar";

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="h-full py-6 pr-6 lg:py-8">
          <DynamicSidebar />
        </div>
      </aside>
      {children}
    </div>
  );
}
```

## Benefits

1. **DRY Principle** - One sidebar config serves multiple URL structures
2. **Flexibility** - Easy to add new sections with unique sidebars
3. **Maintainability** - Update navigation in one place (JSON files)
4. **Type Safety** - TypeScript interfaces ensure correctness
5. **User Experience** - Parent items are clickable AND expandable
6. **SEO Friendly** - Different URL structures for different contexts

## Current Active Sections

- ✅ `/docs` - Documentation (using sidebar-docs.json)
- ✅ `/components` - Component gallery (using sidebar-docs.json with path transformation)
- ⏳ `/learn` - Tutorial content (sidebar-learn.json ready, needs content)
- ⏳ `/reference` - API reference (sidebar-reference.json ready, needs content)
- ⏳ `/blog` - Blog posts (sidebar-blog.json ready, needs content)
- ⏳ `/community` - Community resources (sidebar-community.json ready, needs content)

## Related Files

- [components/dynamic-sidebar.tsx](apps/www/components/dynamic-sidebar.tsx) - Main sidebar component
- [config/sidebars.ts](apps/www/config/sidebars.ts) - Sidebar selection logic
- [SIDEBAR_FILES_GUIDE.md](SIDEBAR_FILES_GUIDE.md) - Detailed sidebar JSON guide
- [NAVIGATION_SYSTEM.md](NAVIGATION_SYSTEM.md) - Overall navigation architecture
