# MDX UI

Beautiful, reusable MDX components for your documentation sites.

## Features

- **Easy Installation**: Add components to your project with a simple CLI command
- **Customizable**: All components support custom styling via className and props
- **Type-Safe**: Built with TypeScript for a great developer experience
- **Flexible**: Separate semantic HTML from visual styling
- **Accessible**: Following best practices for accessibility

## Quick Start

### Installation

Install the CLI globally:

```bash
npm install -g @mdx-ui/cli
```

Or use it directly with npx:

```bash
npx @mdx-ui/cli add [component]
```

### Usage

Add a component to your project:

```bash
mdx-ui add heading
```

This will:
1. Download the component files
2. Install required dependencies
3. Set up the necessary configuration

## Available Components

- **Heading**: Flexible heading component with 6 levels and customization options
- **Paragraph**: Typography component with multiple variants (lead, intro, large, small, muted)
- **Blockquote**: Styled blockquote component
- **Callout**: Attention-grabbing callout boxes
- **Steps**: Step-by-step instruction component
- And more...

## Component Examples

### Heading

```tsx
import { H1, H2, H3, Heading } from "@/components/mdx/heading"

// Simple usage
<H1>My Title</H1>
<H2>Section Heading</H2>

// Separate semantics from styling
<Heading as="h3" level="h2">Looks like H2, but is H3</Heading>

// Custom styling
<H2 className="text-blue-600">Colored heading</H2>
```

### Paragraph

```tsx
import { Paragraph, Lead, Intro, Large, Small, Muted } from "@/components/mdx/paragraph"

// Different variants
<Lead>This is a lead paragraph for introductions.</Lead>
<Intro>This introduces a new section.</Intro>
<Small>This is small text for captions.</Small>

// With alignment
<Paragraph variant="large" align="center">
  Centered large text
</Paragraph>

// Custom styling
<Paragraph className="text-blue-600">
  Custom colored paragraph
</Paragraph>
```

## Documentation

Visit our documentation site (coming soon) for:
- Complete component API reference
- Interactive examples
- Installation guides
- Best practices

## Project Structure

This is a monorepo built with:
- **Turborepo**: Fast, efficient build system
- **Next.js 15**: Documentation website
- **TypeScript**: Type-safe components
- **Tailwind CSS**: Utility-first styling
- **Contentlayer**: Type-safe MDX content

```
mdx-ui/
├── apps/
│   └── www/              # Documentation website
├── packages/
│   ├── cli/              # CLI tool for installing components
│   └── registry/         # Component source files
```

## Development

### Prerequisites

- Node.js 18+
- pnpm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/ida02pingala06/mdx-ui.git
cd mdx-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build
```

### Available Scripts

- `pnpm dev` - Start all packages in development mode
- `pnpm build` - Build all packages
- `pnpm www:dev` - Start documentation site only
- `pnpm cli:dev` - Start CLI in watch mode
- `pnpm lint` - Lint all packages
- `pnpm typecheck` - Type check all packages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [ida02pingala06](https://github.com/ida02pingala06)

## Credits

Inspired by:
- [shadcn/ui](https://ui.shadcn.com) - For the component CLI concept
- [React.dev](https://react.dev) - For documentation design patterns
- [Contentlayer](https://contentlayer.dev) - For MDX processing
