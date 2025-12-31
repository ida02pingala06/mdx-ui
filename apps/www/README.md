# MDX UI Documentation Website

This is the documentation website for MDX UI, built with Next.js 15 and TypeScript.

## Getting Started

```bash
# Install dependencies (from root)
pnpm install

# Run development server
pnpm www:dev

# Build for production
pnpm www:build
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Structure

```
apps/www/
├── app/              # Next.js app directory
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Homepage
│   └── globals.css  # Global styles
│
├── components/       # React components
│   ├── mdx/         # MDX components for docs
│   └── ui/          # UI components
│
├── content/          # MDX content
│   ├── docs/        # Documentation pages
│   └── components/  # Component documentation
│
├── lib/             # Utility functions
│   └── utils.ts    # cn() helper
│
└── public/          # Static assets
```

## Features

- ⚡ Next.js 15 with App Router
- 📝 MDX support with Contentlayer
- 🎨 Tailwind CSS for styling
- 🌙 Dark mode support
- 📦 Component previews
- 🔍 Syntax highlighting with Shiki
- 🎯 Type-safe
