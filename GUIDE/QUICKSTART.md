# 🚀 Quick Start Guide

## Start the Documentation Website

```bash
pnpm www:dev
```

Open **http://localhost:3000** in your browser!

## Use the CLI

```bash
# See all available components
node packages/cli/dist/index.js list

# The output shows all 13 components grouped by type
```

## Project Commands

```bash
# Website
pnpm www:dev          # Start dev server
pnpm www:build        # Build for production

# CLI
pnpm cli:build        # Build CLI
node packages/cli/dist/index.js list    # Test CLI

# All at once
pnpm dev              # Run all dev servers (Turbo)
pnpm build            # Build everything
pnpm typecheck        # Check types
```

## File Structure

```
mdx-ui/
├── apps/www/          # Documentation website (Next.js)
├── packages/cli/      # CLI tool
├── packages/registry/ # Component source
└── registry/          # Component JSON files
```

## What to Build Next

1. **Component Documentation** - Create MDX files in `apps/www/content/components/`
2. **Preview System** - Build interactive component demos
3. **Navigation** - Add sidebar for docs
4. **Contentlayer** - Configure MDX processing

## Key Files

- `COMPLETE_PROJECT_SUMMARY.md` - Comprehensive project overview
- `WEBSITE_SETUP.md` - Website-specific documentation
- `PROJECT_STATUS.md` - Component and CLI status

---

**Everything is ready!** Start the dev server and build your docs! 🎉
