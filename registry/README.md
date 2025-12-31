# MDX Component Registry

This directory contains the JSON registry files for all mdx-ui components.

## Structure

```
registry/
└── mdx/
    ├── blockquote.json
    ├── callout.json
    ├── code-block.json
    ├── horizontal-rule.json
    ├── image.json
    ├── list.json
    ├── steps.json
    ├── tabs.json
    └── ... (other components)
```

## Registry File Format

Each JSON file contains:

```json
{
  "name": "component-name",
  "files": [
    {
      "path": "components/mdx/component-name.tsx",
      "content": "... full TypeScript component code ..."
    }
  ],
  "dependencies": ["package1", "package2"]
}
```

## Source Code Location

The original TypeScript source files are located in:
- `/packages/registry/src/` - Component source code (for development/reference)

## Usage

The CLI reads from this registry when users run:
```bash
npx mdx-ui add component-name
```

## Adding New Components

1. Create the TypeScript component in `/packages/registry/src/`
2. Create the corresponding JSON file in `/registry/mdx/`
3. Update the CLI commands (`list.ts` and `add.ts`)
4. Rebuild the CLI with `pnpm cli:build`
