# Adding Components to Documentation

## Current Status

✅ **Working Components** (have MDX files):
- Blockquote - http://localhost:3001/docs/components/blockquote
- Callout - http://localhost:3001/docs/components/callout
- Steps - http://localhost:3001/docs/components/steps

⏳ **Components to Add** (need MDX files):
- code-block
- emphasis
- headings
- horizontal-rule
- image
- inline-code
- list
- paragraph
- tabs

## How to Add a Component

### Step 1: Copy Component to Website

```bash
cp packages/registry/src/tabs.tsx apps/www/components/mdx/tabs.tsx
```

### Step 2: Create MDX Documentation

Create `apps/www/content/components/tabs.mdx`:

```mdx
---
title: Tabs
description: Tabbed content sections with state management
component: tabs
published: true
registryDependencies: ["utils"]
dependencies: ["clsx", "tailwind-merge"]
---

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/mdx/tabs"

## Installation

\`\`\`bash
npx mdx-ui add tabs
\`\`\`

## Usage

\`\`\`tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/mdx/tabs"

<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">
    Preview content
  </TabsContent>
  <TabsContent value="code">
    Code content
  </TabsContent>
</Tabs>
\`\`\`

## Examples

### Basic Tabs

<div className="preview">
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">
      Content for tab 1
    </TabsContent>
    <TabsContent value="tab2">
      Content for tab 2
    </TabsContent>
  </Tabs>
</div>

## Props

### Tabs

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultValue` | `string` | - | The default active tab |
| `children` | `React.ReactNode` | - | TabsList and TabsContent components |

### TabsTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | - | The value of this tab |
| `children` | `React.ReactNode` | - | The tab label |
```

### Step 3: Add to Navigation JSON

Edit `apps/www/config/docs-nav.json`:

```json
{
  "routes": [
    {
      "title": "Tabs",
      "path": "/docs/components/tabs"
    }
  ]
}
```

### Step 4: Add to MDX Components Provider

Edit `apps/www/components/mdx-components.tsx`:

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/mdx/tabs";

const components = {
  // ... existing
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};
```

### Step 5: Test

Visit http://localhost:3001/docs/components/tabs

## Quick Add Script

You can also create all components at once:

```bash
# Copy all components
for comp in code-block emphasis headings horizontal-rule image inline-code list paragraph tabs; do
  cp packages/registry/src/${comp}.tsx apps/www/components/mdx/${comp}.tsx
done
```

Then create MDX files following the pattern above.

## Navigation JSON Structure

For better organization, use nested routes:

```json
{
  "title": "Interactive",
  "routes": [
    {
      "title": "Callout",
      "path": "/docs/components/callout"
    },
    {
      "title": "Steps",
      "path": "/docs/components/steps"
    },
    {
      "title": "Tabs",
      "path": "/docs/components/tabs"
    }
  ]
}
```

This creates an expandable "Interactive" section in the sidebar.

## Troubleshooting

### 404 Error

**Cause**: Route in JSON but no MDX file
**Fix**: Create the MDX file or remove from JSON

### Component Not Rendering

**Cause**: Component not imported in `mdx-components.tsx`
**Fix**: Import and add to components object

### Breadcrumbs Not Working

**Cause**: Path mismatch between JSON and MDX frontmatter
**Fix**: Ensure paths match exactly

## URL Structure

All component docs follow this pattern:

```
/docs/components/{component-name}
```

Examples:
- `/docs/components/blockquote`
- `/docs/components/callout`
- `/docs/components/code-block` (note: kebab-case)

NOT:
- `/components/blockquote` ❌
- `/docs/blockquote` ❌
- `/blockquote` ❌
