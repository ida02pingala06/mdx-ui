# JSON-Based Navigation System (react.dev Pattern)

## 📋 Overview

This project uses a **JSON-based navigation system** following the **react.dev pattern** for better maintainability and scalability.

## 🎯 Why JSON-Based Navigation?

### Benefits

1. **Single Source of Truth** - All navigation in one JSON file
2. **Easy to Maintain** - Add/remove/reorder pages without touching code
3. **Type Safe** - TypeScript interfaces ensure correctness
4. **Automatic Features** - Breadcrumbs, prev/next, TOC all generated automatically
5. **Scalable** - Works for projects with 10 or 1000 pages
6. **Git-Friendly** - Clear diffs when navigation changes

### Comparison to Other Approaches

| Approach | Maintainability | Scalability | Type Safety |
|----------|----------------|-------------|-------------|
| **JSON Config** ✅ | Excellent | Excellent | Yes |
| File-based routing | Poor | Good | No |
| Hardcoded in components | Poor | Poor | Partial |

## 📁 File Structure

```
apps/www/
├── config/
│   └── docs-nav.json          # Navigation configuration
│
├── lib/
│   └── docs-nav.ts             # Navigation utilities
│
├── components/
│   ├── docs-sidebar.tsx        # Sidebar component
│   └── page-navigation.tsx     # Prev/Next navigation
│
└── app/
    └── docs/
        ├── layout.tsx          # Uses DocsSidebar
        └── components/
            └── [...slug]/
                └── page.tsx     # Uses breadcrumbs, navigation
```

## 🔧 Navigation JSON Schema

### Basic Structure

```json
{
  "title": "Documentation",
  "path": "/docs",
  "routes": [
    // Routes go here
  ]
}
```

### Route Types

#### 1. Section Header

```json
{
  "hasSectionHeader": true,
  "sectionHeader": "Getting Started"
}
```

- Creates visual separator in sidebar
- Appears as uppercase label
- Not clickable

#### 2. Simple Route

```json
{
  "title": "Introduction",
  "path": "/docs"
}
```

- Clickable link
- Appears in breadcrumbs
- Included in prev/next navigation

#### 3. Route with Children (Expandable)

```json
{
  "title": "Typography",
  "path": "/docs/components/typography",
  "routes": [
    {
      "title": "Blockquote",
      "path": "/docs/components/blockquote"
    },
    {
      "title": "Headings",
      "path": "/docs/components/headings"
    }
  ]
}
```

- Creates expandable section
- Parent can have its own page
- Children are nested in sidebar

## 📝 Complete Example

```json
{
  "title": "Documentation",
  "path": "/docs",
  "routes": [
    {
      "hasSectionHeader": true,
      "sectionHeader": "Getting Started"
    },
    {
      "title": "Introduction",
      "path": "/docs"
    },
    {
      "title": "Installation",
      "path": "/docs/installation"
    },
    {
      "hasSectionHeader": true,
      "sectionHeader": "Components"
    },
    {
      "title": "Typography",
      "path": "/docs/components/typography",
      "routes": [
        {
          "title": "Blockquote",
          "path": "/docs/components/blockquote"
        },
        {
          "title": "Headings",
          "path": "/docs/components/headings"
        }
      ]
    }
  ]
}
```

## 🛠️ Navigation Utilities

### 1. getAllRoutes()

Get all routes as flat array (excludes section headers).

```typescript
import { getAllRoutes } from "@/lib/docs-nav";

const allRoutes = getAllRoutes();
// [{ title: "Introduction", path: "/docs" }, ...]
```

**Use cases:**
- Search functionality
- Sitemap generation
- Finding all pages

### 2. findRouteByPath()

Find a specific route by its path.

```typescript
import { findRouteByPath } from "@/lib/docs-nav";

const route = findRouteByPath("/docs/components/blockquote");
// { title: "Blockquote", path: "/docs/components/blockquote" }
```

**Use cases:**
- Getting page metadata
- Checking if route exists
- Dynamic route validation

### 3. getBreadcrumbs()

Get breadcrumb trail for a path.

```typescript
import { getBreadcrumbs } from "@/lib/docs-nav";

const breadcrumbs = getBreadcrumbs("/docs/components/blockquote");
// [
//   { title: "Introduction", path: "/docs" },
//   { title: "Typography", path: "/docs/components/typography" },
//   { title: "Blockquote", path: "/docs/components/blockquote" }
// ]
```

**Use cases:**
- Rendering breadcrumb navigation
- Showing page hierarchy
- SEO structured data

### 4. getAdjacentRoutes()

Get previous and next routes for a path.

```typescript
import { getAdjacentRoutes } from "@/lib/docs-nav";

const { prev, next } = getAdjacentRoutes("/docs/components/blockquote");
// prev: { title: "Introduction", path: "/docs" }
// next: { title: "Callout", path: "/docs/components/callout" }
```

**Use cases:**
- Prev/Next page navigation
- Sequential reading flow
- Documentation walkthroughs

### 5. getSectionHeader()

Get the section header that precedes a route.

```typescript
import { getSectionHeader } from "@/lib/docs-nav";

const section = getSectionHeader("/docs/components/blockquote");
// "Components"
```

**Use cases:**
- Showing current section
- Filtering routes by section
- Section-based navigation

## 🎨 Component Usage

### Sidebar Component

```tsx
import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }) {
  return (
    <div>
      <aside>
        <DocsSidebar />
      </aside>
      {children}
    </div>
  );
}
```

**Features:**
- Auto-generated from JSON
- Expandable/collapsible sections
- Active state highlighting
- Section headers

### Breadcrumbs

```tsx
import { getBreadcrumbs } from "@/lib/docs-nav";

export default function Page() {
  const breadcrumbs = getBreadcrumbs("/docs/components/blockquote");

  return (
    <nav>
      {breadcrumbs.map((crumb, index) => (
        <Link key={crumb.path} href={crumb.path!}>
          {crumb.title}
        </Link>
      ))}
    </nav>
  );
}
```

### Prev/Next Navigation

```tsx
import { PageNavigation } from "@/components/page-navigation";

export default function Page() {
  return (
    <div>
      <article>{/* Content */}</article>
      <PageNavigation currentPath="/docs/components/blockquote" />
    </div>
  );
}
```

## ✏️ How to Add New Pages

### 1. Add to Navigation JSON

Edit `config/docs-nav.json`:

```json
{
  "routes": [
    {
      "title": "My New Component",
      "path": "/docs/components/my-component"
    }
  ]
}
```

### 2. Create MDX File

Create `content/components/my-component.mdx`:

```mdx
---
title: My Component
description: A great component
component: my-component
---

## Content here
```

### 3. Done!

That's it! The system automatically:
- ✅ Shows page in sidebar
- ✅ Generates breadcrumbs
- ✅ Links prev/next pages
- ✅ Creates TOC
- ✅ Renders at the URL

## 🔀 Advanced Patterns

### Nested Categories

```json
{
  "title": "Components",
  "path": "/docs/components",
  "routes": [
    {
      "title": "Typography",
      "routes": [
        { "title": "Blockquote", "path": "/docs/components/blockquote" },
        { "title": "Headings", "path": "/docs/components/headings" }
      ]
    },
    {
      "title": "Interactive",
      "routes": [
        { "title": "Tabs", "path": "/docs/components/tabs" },
        { "title": "Steps", "path": "/docs/components/steps" }
      ]
    }
  ]
}
```

### Multiple Sections

```json
{
  "routes": [
    {
      "hasSectionHeader": true,
      "sectionHeader": "Getting Started"
    },
    { "title": "Introduction", "path": "/docs" },
    {
      "hasSectionHeader": true,
      "sectionHeader": "Components"
    },
    { "title": "Blockquote", "path": "/docs/components/blockquote" },
    {
      "hasSectionHeader": true,
      "sectionHeader": "API Reference"
    },
    { "title": "CLI", "path": "/docs/api/cli" }
  ]
}
```

### Category with Overview Page

```json
{
  "title": "Typography",
  "path": "/docs/components/typography",  // Overview page
  "routes": [
    { "title": "Blockquote", "path": "/docs/components/blockquote" },
    { "title": "Headings", "path": "/docs/components/headings" }
  ]
}
```

## 🎯 Best Practices

### 1. Keep Paths Consistent

```json
// Good
"/docs/components/blockquote"
"/docs/components/callout"

// Bad
"/docs/components/blockquote"
"/components/callout"  // Missing /docs
```

### 2. Use Meaningful Section Headers

```json
// Good
{ "sectionHeader": "Getting Started" }
{ "sectionHeader": "Components" }

// Bad
{ "sectionHeader": "Section 1" }
{ "sectionHeader": "Misc" }
```

### 3. Group Related Pages

```json
{
  "title": "Typography",
  "routes": [
    { "title": "Blockquote", ... },
    { "title": "Headings", ... },
    { "title": "Paragraph", ... }
  ]
}
```

### 4. Logical Page Order

Order pages by:
- Importance (most important first)
- Difficulty (basics before advanced)
- Alphabetically (for reference docs)

## 🔍 Debugging

### Check if route exists

```typescript
const route = findRouteByPath("/docs/components/blockquote");
if (!route) {
  console.log("Route not found in navigation JSON!");
}
```

### List all routes

```typescript
const allRoutes = getAllRoutes();
console.log("All pages:", allRoutes.map(r => r.path));
```

### Test breadcrumbs

```typescript
const breadcrumbs = getBreadcrumbs("/docs/components/blockquote");
console.log("Breadcrumb trail:", breadcrumbs.map(b => b.title));
```

## 📚 Comparison to react.dev

Our implementation follows react.dev's pattern:

| Feature | react.dev | mdx-ui |
|---------|-----------|---------|
| JSON config | ✅ sidebarReference.json | ✅ docs-nav.json |
| Section headers | ✅ hasSectionHeader | ✅ hasSectionHeader |
| Nested routes | ✅ routes array | ✅ routes array |
| Breadcrumbs | ✅ Auto-generated | ✅ Auto-generated |
| Prev/Next | ✅ Auto-generated | ✅ Auto-generated |

## 🎉 Benefits Summary

1. **Easy Maintenance** - Change navigation by editing one JSON file
2. **Type Safety** - TypeScript ensures correctness
3. **Automatic Features** - Breadcrumbs, prev/next, active states
4. **Scalable** - Works for any size documentation site
5. **Developer Experience** - Clear, declarative structure
6. **User Experience** - Consistent navigation throughout

## 📖 Further Reading

- [react.dev navigation source](https://github.com/reactjs/react.dev/tree/main/src)
- [MDX_SYSTEM_GUIDE.md](./MDX_SYSTEM_GUIDE.md) - Our MDX setup
- [QUICKSTART.md](./QUICKSTART.md) - Getting started guide
