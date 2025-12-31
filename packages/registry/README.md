# Component Registry Package

This package contains the **source TypeScript components** for mdx-ui.

## Purpose

This directory serves as the **source of truth** for component development:
- Component TypeScript source files (`.tsx`)
- Used for development and reference
- Not published directly (components are distributed via JSON registry)

## Structure

```
packages/registry/
└── src/
    ├── blockquote.tsx
    ├── callout.tsx
    ├── code-block.tsx
    ├── horizontal-rule.tsx
    ├── image.tsx
    ├── list.tsx
    ├── steps.tsx
    └── tabs.tsx
```

## Workflow

1. **Develop** components here in `/src`
2. **Export** to JSON registry in `/registry/mdx/`
3. **Distribute** via CLI to end users

## Relationship to Root Registry

- `/packages/registry/src/` - Source components (development)
- `/registry/mdx/` - JSON registry files (runtime/distribution)

The CLI fetches from `/registry/mdx/` when users run `npx mdx-ui add <component>`.
