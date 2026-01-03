# Registry Build Script

This script automatically generates the `/registry/` folder from `/packages/registry/src/`, eliminating manual duplication.

## How It Works

1. **Source of Truth:** `/packages/registry/src/` contains the actual TypeScript component files
2. **Auto-Generation:** Script reads all `.tsx` files and generates JSON files
3. **Output:** Creates `/registry/mdx/*.json` files for the CLI to fetch from GitHub

## Usage

### Build the Registry

```bash
pnpm build:registry
```

This will:
- Read all components from `/packages/registry/src/`
- Generate individual JSON files in `/registry/mdx/`
- Create the master `/registry/registry.json` file

### Workflow

1. **Develop Components**
   ```bash
   # Edit files in packages/registry/src/
   vim packages/registry/src/callout.tsx
   ```

2. **Build Registry**
   ```bash
   pnpm build:registry
   ```

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: update callout component"
   git push
   ```

4. **Publish CLI (if needed)**
   ```bash
   cd packages/cli
   pnpm build
   npm publish --access public
   ```

## Component Metadata

Component metadata is defined in `build-registry.ts` in the `componentsMetadata` object:

```typescript
const componentsMetadata = {
  "component-name": {
    description: "Component description",
    dependencies: ["dependency1", "dependency2"],
    registryDependencies: ["utils"]
  }
}
```

### Adding a New Component

1. Create the component file in `/packages/registry/src/new-component.tsx`
2. Add metadata in `scripts/build-registry.ts`:
   ```typescript
   "new-component": {
     description: "Description of the new component",
     dependencies: [],
     registryDependencies: ["utils"]
   }
   ```
3. Run `pnpm build:registry`
4. Commit all changes

## Benefits

✅ **Single Source of Truth:** Only edit files in `/packages/registry/src/`
✅ **No Manual Duplication:** Registry JSON files are auto-generated
✅ **Consistency:** Guarantees registry matches source code
✅ **Version Control:** Easy to track changes in git

## File Structure

```
mdx-ui/
├── packages/registry/src/     ← Edit here (source of truth)
│   ├── callout.tsx
│   ├── tree.tsx
│   └── lib/utils.ts
│
├── registry/                  ← Auto-generated (don't edit manually)
│   ├── mdx/
│   │   ├── callout.json
│   │   └── tree.json
│   └── registry.json
│
└── scripts/
    └── build-registry.ts      ← Build script
```

## Troubleshooting

### Component not showing up

1. Check if component file exists in `/packages/registry/src/`
2. Verify metadata exists in `scripts/build-registry.ts`
3. Run `pnpm build:registry` again

### Path errors in CLI

Make sure the generated JSON files have `"path"` key, not `"name"`:

```json
{
  "files": [
    {
      "path": "component.tsx",  // ✅ Correct
      "content": "..."
    }
  ]
}
```
