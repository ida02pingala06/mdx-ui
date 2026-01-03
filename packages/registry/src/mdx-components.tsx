/**
 * Auto-discovering MDX Components for Next.js
 *
 * This file automatically discovers and uses ALL mdx-ui components you've installed.
 * No manual imports needed - just add components with the CLI and they work!
 *
 * @example Quick Start (2 steps):
 * ```bash
 * # 1. Install components
 * npx @suryaravikumar/mdx-ui add callout steps tabs
 *
 * # 2. Create mdx-components.tsx at root:
 * export { useMDXComponents } from './components/mdx-ui/mdx-components'
 *
 * # That's it! All components auto-work in your .mdx files
 * ```
 */

import type { MDXComponents } from "mdx/types"
import * as React from "react"

// Helper to safely import components
function tryImport(path: string) {
  try {
    return require(path)
  } catch {
    return null
  }
}

/**
 * Auto-discovers all installed mdx-ui components
 * @returns Object with all available components
 */
function discoverComponents() {
  const components: any = {}

  // List of all possible mdx-ui components
  const availableComponents = [
    { file: './blockquote', exports: ['Blockquote'] },
    { file: './callout', exports: ['Callout'] },
    { file: './code-block', exports: ['CodeBlock'] },
    { file: './emphasis', exports: ['Strong', 'Em'] },
    { file: './headings', exports: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'] },
    { file: './heading', exports: ['Heading'] },
    { file: './horizontal-rule', exports: ['HorizontalRule'] },
    { file: './image', exports: ['Image'] },
    { file: './inline-code', exports: ['InlineCode'] },
    { file: './list', exports: ['UnorderedList', 'OrderedList', 'ListItem'] },
    { file: './paragraph', exports: ['Paragraph', 'Lead', 'Intro', 'Large', 'Small', 'Muted'] },
    { file: './steps', exports: ['Steps', 'Step'] },
    { file: './tabs', exports: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'] },
    { file: './tree', exports: ['Tree', 'TreeItem'] },
    { file: './file-tree', exports: ['FileTree'] },
  ]

  // Auto-import each component if it exists
  for (const { file, exports } of availableComponents) {
    const module = tryImport(file)
    if (module) {
      for (const exportName of exports) {
        if (module[exportName]) {
          components[exportName] = module[exportName]
        }
      }
    }
  }

  return components
}

/**
 * Provides MDX component mappings with auto-discovery
 * Automatically uses all installed mdx-ui components
 *
 * @example Basic usage:
 * ```tsx
 * // mdx-components.tsx (root level)
 * export { useMDXComponents } from './components/mdx-ui/mdx-components'
 * ```
 *
 * @example With custom components:
 * ```tsx
 * import { useMDXComponents as getBaseComponents } from './components/mdx-ui/mdx-components'
 * import type { MDXComponents } from 'mdx/types'
 *
 * export function useMDXComponents(components: MDXComponents): MDXComponents {
 *   return {
 *     ...getBaseComponents(components),
 *     MyComponent: () => <div>Custom!</div>,
 *   }
 * }
 * ```
 */
export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  const discovered = discoverComponents()

  return {
    // Auto-mapped headings (with fallbacks if not installed)
    h1: discovered.H1 || ((props: any) => (
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight" {...props} />
    )),
    h2: discovered.H2 || ((props: any) => (
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mt-10" {...props} />
    )),
    h3: discovered.H3 || ((props: any) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8" {...props} />
    )),
    h4: discovered.H4 || ((props: any) => (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6" {...props} />
    )),
    h5: discovered.H5 || ((props: any) => (
      <h5 className="scroll-m-20 text-lg font-semibold tracking-tight mt-6" {...props} />
    )),
    h6: discovered.H6 || ((props: any) => (
      <h6 className="scroll-m-20 text-base font-semibold tracking-tight mt-6" {...props} />
    )),

    // Paragraph
    p: discovered.Paragraph || ((props: any) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
    )),

    // Links
    a: (props: any) => (
      <a
        className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
        {...props}
      />
    ),

    // Lists (with fallbacks)
    ul: discovered.UnorderedList || ((props: any) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
    )),
    ol: discovered.OrderedList || ((props: any) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
    )),
    li: discovered.ListItem || ((props: any) => <li className="mt-2" {...props} />),

    // Blockquote
    blockquote: discovered.Blockquote || ((props: any) => (
      <blockquote
        className="mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground"
        {...props}
      />
    )),

    // Images
    img: discovered.Image || ((props: any) => (
      <img className="rounded-lg my-6" alt="" {...props} />
    )),

    // Horizontal rule
    hr: discovered.HorizontalRule || ((props: any) => (
      <hr className="my-8 border-border" {...props} />
    )),

    // Code
    code: discovered.InlineCode || ((props: any) => (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        {...props}
      />
    )),

    pre: discovered.CodeBlock || ((props: any) => (
      <pre
        className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 p-4 dark:bg-zinc-900"
        {...props}
      />
    )),

    // Text formatting
    strong: discovered.Strong || ((props: any) => <strong className="font-semibold" {...props} />),
    em: discovered.Em || ((props: any) => <em className="italic" {...props} />),

    // Tables
    table: (props: any) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full" {...props} />
      </div>
    ),
    tr: (props: any) => <tr className="m-0 border-t p-0 even:bg-muted" {...props} />,
    th: (props: any) => (
      <th
        className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
        {...props}
      />
    ),
    td: (props: any) => (
      <td
        className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
        {...props}
      />
    ),

    // All custom components (auto-discovered)
    ...discovered,

    // User overrides
    ...components,
  }
}

/**
 * Render MDX content with Contentlayer (auto-discovers components)
 *
 * @example With Contentlayer:
 * ```tsx
 * import { Mdx } from '@/components/mdx-ui/mdx-components'
 * import { allPosts } from 'contentlayer/generated'
 *
 * export default function Page({ params }) {
 *   const post = allPosts.find(p => p.slug === params.slug)
 *   return <Mdx code={post.body.code} />
 * }
 * ```
 */
export function Mdx({
  code,
  components: customComponents = {},
}: {
  code: string
  components?: MDXComponents
}) {
  let useMDXComponent: any

  // Try multiple Contentlayer versions
  try {
    const contentlayer = tryImport("next-contentlayer2/hooks") ||
                         tryImport("next-contentlayer/hooks")

    if (!contentlayer) {
      return (
        <div className="rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-950/20 p-6 my-8">
          <h3 className="text-red-600 dark:text-red-400 font-bold mb-2">
            📦 Missing Dependency
          </h3>
          <p className="mb-4 text-sm">
            To use the <code className="bg-red-100 dark:bg-red-900 px-1 rounded">Mdx</code> component, install Contentlayer:
          </p>
          <pre className="bg-zinc-950 text-white text-xs p-4 rounded overflow-x-auto">
            npm install next-contentlayer2{'\n'}
            {' '} # or{'\n'}
            npm install next-contentlayer
          </pre>
          <p className="mt-4 text-sm text-muted-foreground">
            <strong>Alternative:</strong> Use{' '}
            <code className="bg-muted px-1 rounded">useMDXComponents</code> with @next/mdx
          </p>
        </div>
      )
    }

    useMDXComponent = contentlayer.useMDXComponent
  } catch (error) {
    return <div className="text-red-500">Error loading MDX: {String(error)}</div>
  }

  const Component = useMDXComponent(code)
  const allComponents = useMDXComponents(customComponents)

  return (
    <div className="mdx">
      <Component components={allComponents} />
    </div>
  )
}
