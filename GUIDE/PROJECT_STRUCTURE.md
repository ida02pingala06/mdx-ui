# MDX-UI Project Structure

## Overview

```
mdx-ui/
├── registry/              # Runtime component registry (JSON files)
├── packages/              # Source code packages
│   ├── cli/              # CLI tool for installing components
│   └── registry/         # Component source files (TypeScript)
├── components/           # Legacy/example components
└── docs/                 # Documentation (TODO)
```

## Detailed Structure

### `/registry/` - Runtime Registry
**Purpose**: JSON files that the CLI fetches when users run `npx mdx-ui add <component>`

```
registry/
└── mdx/
    ├── blockquote.json       # Quote blocks
    ├── callout.json          # Alert boxes
    ├── code-block.json       # Syntax highlighting
    ├── horizontal-rule.json  # Divider lines
    ├── image.json            # Images with captions
    ├── list.json             # Styled lists
    ├── steps.json            # Step-by-step guides
    ├── tabs.json             # Tabbed content
    └── ...
```

**Format**: Each JSON contains the full component code and dependencies:
```json
{
  "name": "component-name",
  "files": [{ "path": "...", "content": "..." }],
  "dependencies": []
}
```

### `/packages/cli/` - CLI Tool
**Purpose**: Command-line tool for developers to install components

```
packages/cli/
├── src/
│   ├── commands/
│   │   ├── add.ts        # Add components
│   │   ├── init.ts       # Initialize project
│   │   └── list.ts       # List components
│   ├── utils/
│   │   ├── fetch-component.ts
│   │   ├── get-config.ts
│   │   ├── install-deps.ts
│   │   └── write-component.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

**Usage**:
```bash
npx mdx-ui init           # Initialize project
npx mdx-ui list           # Show all components
npx mdx-ui add callout    # Add a component
```

### `/packages/registry/src/` - Component Source
**Purpose**: TypeScript source files for component development

```
packages/registry/src/
├── blockquote.tsx
├── callout.tsx
├── code-block.tsx
├── horizontal-rule.tsx
├── image.tsx
├── list.tsx
├── steps.tsx
└── tabs.tsx
```

**Workflow**:
1. Develop component here
2. Export to `/registry/mdx/component-name.json`
3. Update CLI (`list.ts` and `add.ts`)
4. Rebuild: `pnpm cli:build`

### `/components/` - Legacy Components
**Purpose**: Example/legacy components (may be consolidated later)

## Component Lifecycle

### 1. Development
Create TypeScript component in `/packages/registry/src/`:
```tsx
// blockquote.tsx
export function Blockquote({ children }) {
  return <blockquote>{children}</blockquote>
}
```

### 2. Registration
Create JSON file in `/registry/mdx/`:
```json
{
  "name": "blockquote",
  "files": [{
    "path": "components/mdx/blockquote.tsx",
    "content": "... component code ..."
  }],
  "dependencies": []
}
```

### 3. CLI Updates
Update `/packages/cli/src/commands/`:
- `list.ts` - Add to AVAILABLE_COMPONENTS array
- `add.ts` - Add to prompts choices

### 4. Build & Publish
```bash
pnpm cli:build    # Build CLI
npm publish       # Publish to npm (when ready)
```

### 5. User Installation
```bash
npx mdx-ui add blockquote
```

## Key Files

| File | Purpose |
|------|---------|
| `/registry/mdx/*.json` | Component distribution files |
| `/packages/cli/src/commands/list.ts` | Component catalog |
| `/packages/cli/src/utils/fetch-component.ts` | Registry loader |
| `/packages/registry/src/*.tsx` | Component source code |

## Important Notes

1. **Single Source of Truth**: `/registry/mdx/` is the runtime source
2. **No Duplication**: Only one registry folder at root level
3. **CLI Paths**: Multiple fallback paths in `fetch-component.ts` for flexibility
4. **No Bundling**: CLI preserves directory structure (`bundle: false` in tsup)

## Available Components (12 Total)

Basic Markdown:
- blockquote
- horizontal-rule
- image
- list

Documentation Components:
- callout
- code-block
- steps
- tabs

Text Components:
- emphasis
- headings
- inline-code
- paragraph

## Next Steps

1. Add more Markdown components (tables, links, etc.)
2. Implement Phase 1 components from COMPONENT_NAMES_REFERENCE.md
3. Create documentation site
4. Publish to npm
