# Basic Markdown Components for mdx-ui

Implementation plan for basic Markdown syntax components. These will be implemented BEFORE the advanced MDX components from COMPONENT_NAMES_REFERENCE.md.

---

## 1. Headings (H1-H6) ⭐⭐⭐

**Purpose**: Markdown headings with auto-generated anchor links for navigation

**Markdown Syntax**:
```md
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading
```

**Features**:
- Auto-generated ID from heading text (slugified)
- Anchor link icon on hover
- Smooth scroll to section
- Proper spacing and typography scale
- Dark/light theme support

**Props**:
```typescript
interface HeadingProps {
  children: React.ReactNode
  className?: string
  id?: string // Optional custom ID
}
```

**Components**: H1, H2, H3, H4, H5, H6

---

## 2. Paragraphs ⭐⭐⭐

**Purpose**: Standard text paragraphs with proper spacing

**Markdown Syntax**:
```md
This is a paragraph.

This is another paragraph separated by a blank line.
```

**Features**:
- Proper line height for readability
- Spacing between paragraphs
- Text color from theme

**Props**:
```typescript
interface ParagraphProps {
  children: React.ReactNode
  className?: string
}
```

**Component**: P

---

## 3. Emphasis (Bold, Italic) ⭐⭐⭐

**Purpose**: Text emphasis and strong emphasis

**Markdown Syntax**:
```md
*italic* or _italic_
**bold** or __bold__
***bold italic*** or ___bold italic___
```

**Features**:
- Semantic HTML (em, strong)
- Proper font weights
- Inherits color from parent

**Props**:
```typescript
interface EmphasisProps {
  children: React.ReactNode
  className?: string
}
```

**Components**: Strong, Em

---

## 4. Blockquotes ⭐⭐⭐

**Purpose**: Quoted text or callout sections

**Markdown Syntax**:
```md
> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquote
```

**Features**:
- Left border accent
- Background color distinction
- Nested blockquote support
- Icon or visual indicator
- Dark/light theme variants

**Props**:
```typescript
interface BlockquoteProps {
  children: React.ReactNode
  className?: string
}
```

**Component**: Blockquote

---

## 5. Lists (Ordered & Unordered) ⭐⭐⭐

**Purpose**: Bulleted and numbered lists

**Markdown Syntax**:
```md
Unordered:
- Item 1
- Item 2
  - Nested item

Ordered:
1. First item
2. Second item
   1. Nested item
```

**Features**:
- Proper indentation for nesting
- Custom list markers
- Spacing between items
- Support for nested lists

**Props**:
```typescript
interface ListProps {
  children: React.ReactNode
  className?: string
}

interface ListItemProps {
  children: React.ReactNode
  className?: string
}
```

**Components**: Ul, Ol, Li

---

## 6. Inline Code ⭐⭐⭐

**Purpose**: Inline code snippets within text

**Markdown Syntax**:
```md
Use the `useState` hook for state management.
```

**Features**:
- Monospace font
- Background highlight
- Proper padding
- Dark/light theme variants
- Syntax-aware color

**Props**:
```typescript
interface InlineCodeProps {
  children: React.ReactNode
  className?: string
}
```

**Component**: Code (inline variant)

---

## 7. Code Blocks ⭐⭐⭐

**Purpose**: Multi-line code blocks with syntax highlighting

**Markdown Syntax**:
````md
```javascript
function hello() {
  console.log("Hello World")
}
```

Indented code block:
    const x = 10
    const y = 20
````

**Features**:
- Syntax highlighting (via existing CodeBlock component)
- Language label
- Copy button
- Line numbers (optional)
- Dark/light theme

**Props**:
```typescript
interface CodeBlockProps {
  children: string
  className?: string
  language?: string
  showLineNumbers?: boolean
  filename?: string
}
```

**Component**: Pre (wrapper for CodeBlock)

**Note**: We already have CodeBlock component, just need to integrate with MDX

---

## 8. Horizontal Rules ⭐⭐

**Purpose**: Visual section separator

**Markdown Syntax**:
```md
---
***
___
```

**Features**:
- Subtle visual divider
- Proper spacing above/below
- Theme-aware color

**Props**:
```typescript
interface HrProps {
  className?: string
}
```

**Component**: Hr

---

## 9. Links ⭐⭐⭐

**Purpose**: Enhanced hyperlinks for documentation

**Markdown Syntax**:
```md
[Link text](https://example.com)
[Link with title](https://example.com "Title text")
```

**Features**:
- External link icon
- Underline on hover
- Color distinction for visited
- Open external links in new tab
- Security (rel="noopener noreferrer")

**Props**:
```typescript
interface LinkProps {
  href: string
  children: React.ReactNode
  title?: string
  className?: string
}
```

**Component**: A (enhanced anchor)

---

## 10. Images ⭐⭐

**Purpose**: Enhanced images with captions and optimization

**Markdown Syntax**:
```md
![Alt text](image.png)
![Alt text](image.png "Image title")
```

**Features**:
- Responsive sizing
- Optional caption from title
- Lazy loading
- Dark/light theme variants (if applicable)
- Rounded corners
- Shadow

**Props**:
```typescript
interface ImageProps {
  src: string
  alt: string
  title?: string
  className?: string
  width?: number
  height?: number
}
```

**Component**: Img

---

## 11. Line Breaks ⭐

**Purpose**: Hard line breaks within paragraphs

**Markdown Syntax**:
```md
Line one
Line two (two spaces at end of line one)

Or use <br /> tag directly
```

**Features**:
- Standard HTML br element
- Preserved in MDX

**Component**: Br (standard HTML, no custom needed)

---

## 12. Escaping Characters ⭐

**Purpose**: Display literal markdown characters

**Markdown Syntax**:
```md
\* Not italic \*
\# Not a heading
```

**Note**: Handled by MDX parser, no custom component needed

---

## Implementation Priority

### Phase 1: Core Text Components (Implement First) ⭐⭐⭐
1. ✅ **Headings** (H1-H6) - Auto-anchor links
2. **Paragraphs** (P) - Basic text
3. **Emphasis** (Strong, Em) - Bold and italic
4. **Inline Code** - Code spans

**Why**: Most frequently used in any documentation

### Phase 2: Structure Components (Second) ⭐⭐⭐
5. **Blockquotes** - Quoted sections
6. **Lists** (Ul, Ol, Li) - Bulleted and numbered
7. **Links** (A) - Enhanced hyperlinks

**Why**: Essential for document structure

### Phase 3: Visual Components (Third) ⭐⭐
8. **Horizontal Rules** (Hr) - Section dividers
9. **Images** (Img) - Enhanced images
10. **Code Blocks** (Pre) - Integration with existing CodeBlock

**Why**: Complete the basic Markdown feature set

---

## File Structure

All components will be created in:
```
components/mdx/
├── headings.tsx         (H1, H2, H3, H4, H5, H6) ✅ CREATED
├── paragraph.tsx        (P)
├── emphasis.tsx         (Strong, Em)
├── inline-code.tsx      (Code)
├── blockquote.tsx       (Blockquote)
├── lists.tsx            (Ul, Ol, Li)
├── link.tsx             (A)
├── horizontal-rule.tsx  (Hr)
├── image.tsx            (Img)
└── pre.tsx              (Pre - wrapper for CodeBlock)
```

Registry files:
```
registry/mdx/
├── headings.json        ✅ CREATED
├── paragraph.json
├── emphasis.json
├── inline-code.json
├── blockquote.json
├── lists.json
├── link.json
├── horizontal-rule.json
├── image.json
└── pre.json
```

---

## MDX Components Object

Once all components are created, the MDX components object will look like:

```typescript
// apps/www/components/mdx-components.tsx
import { H1, H2, H3, H4, H5, H6 } from '@/components/mdx/headings'
import { P } from '@/components/mdx/paragraph'
import { Strong, Em } from '@/components/mdx/emphasis'
import { Code } from '@/components/mdx/inline-code'
import { Blockquote } from '@/components/mdx/blockquote'
import { Ul, Ol, Li } from '@/components/mdx/lists'
import { A } from '@/components/mdx/link'
import { Hr } from '@/components/mdx/horizontal-rule'
import { Img } from '@/components/mdx/image'
import { Pre } from '@/components/mdx/pre'
import { Callout } from '@/components/mdx/callout'
import { CodeBlock } from '@/components/mdx/code-block'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/mdx/tabs'
import { Steps, Step } from '@/components/mdx/steps'

export const mdxComponents = {
  // Headings
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,

  // Text
  p: P,
  strong: Strong,
  em: Em,

  // Code
  code: Code,
  pre: Pre,

  // Structure
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  li: Li,

  // Links & Media
  a: A,
  img: Img,
  hr: Hr,

  // Custom MDX Components
  Callout,
  CodeBlock,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Steps,
  Step,
}
```

---

## Design Principles

All components follow these principles:

1. **Pure React + Tailwind** - No Radix UI or external libraries
2. **Dark/Light Theme** - All components support both themes
3. **Semantic HTML** - Use proper HTML5 elements
4. **Accessible** - ARIA labels where needed
5. **Mobile First** - Responsive design
6. **Consistent Spacing** - 4, 6, 8 unit scale
7. **Typography Scale** - Clear hierarchy
8. **Theme Variables** - Use CSS variables from globals.css

---

## Testing Strategy

Each component should be tested with:

1. **Visual Test** - Example page showing all variants
2. **Dark/Light Toggle** - Verify both themes work
3. **Responsive** - Test on mobile, tablet, desktop
4. **Nesting** - Test nested components (lists in lists, etc.)
5. **MDX Integration** - Verify works in actual MDX files

---

## After Basic Components

Once all basic Markdown components are complete, we'll move to advanced MDX components from COMPONENT_NAMES_REFERENCE.md:

- Lead (Intro)
- Note (SimpleCallout)
- Summary (Recap)
- Aside (DeepDive)
- LearnCard
- Console
- Terminal
- PackageInstall
- FileTree
- And more...

---

## Total Component Count

**Basic Markdown**: ~12 components
**Advanced MDX**: ~20 components
**Total**: ~32 components for complete mdx-ui v1.0

This covers both basic Markdown syntax AND advanced documentation features inspired by react.dev.
