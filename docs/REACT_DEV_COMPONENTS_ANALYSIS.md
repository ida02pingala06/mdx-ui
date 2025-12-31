# React.dev MDX Components Analysis

## Components Found in Actual MDX Files

### Core Documentation Components (Actually Used)

1. **`<Intro>`** - Page introduction (large text)
2. **`<YouWillLearn>`** - Learning objectives list
3. **`<Pitfall>`** - Warning/gotcha callouts
4. **`<DeepDive>`** - In-depth explanation sections
5. **`<Note>`** - Important notes
6. **`<Recap>`** - End-of-page summary
7. **`<LearnMore>`** - Additional learning resources

### Code & Interactive Components

8. **`<Sandpack>`** - Live code editor
9. **`<CodeDiagram>`** - Code with visual diagram
10. **`<CodeStep>`** - Stepthrough code
11. **`<ConsoleBlock>`** - Console output display
12. **`<TerminalBlock>`** - Terminal command display

### Challenge/Exercise Components

13. **`<Challenges>`** - Exercise container
14. **`<Challenge>`** - Individual challenge
15. **`<Hint>`** - Challenge hints
16. **`<Solution>`** - Challenge solutions

### Visual Components

17. **`<Diagram>`** - Visual diagrams
18. **`<DiagramGroup>`** - Group of diagrams
19. **`<Illustration>`** - Illustrations
20. **`<IllustrationBlock>`** - Illustration container
21. **`<Image>`** - Enhanced images
22. **`<VideoPlayer>`** - Video embeds

## Our mdx-ui Component Mapping

| react.dev Component | mdx-ui Component | Priority | Status |
|---------------------|------------------|----------|--------|
| `<Intro>` | `<Lead>` | ⭐⭐⭐ | Planned |
| `<YouWillLearn>` | `<LearnCard>` | ⭐⭐⭐ | Planned |
| `<Pitfall>` | `<Callout variant="danger">` | ✅ | Done (as variant) |
| `<DeepDive>` | `<Aside>` | ⭐⭐ | New! |
| `<Note>` | `<Note>` | ⭐⭐⭐ | Planned |
| `<Recap>` | `<Summary>` | ⭐⭐⭐ | Planned |
| `<LearnMore>` | `<LearnCard>` | ⭐⭐⭐ | Planned |
| `<Sandpack>` | `<Sandbox>` | ⭐ | Future |
| `<CodeDiagram>` | `<CodeWithDiagram>` | ⭐ | Future |
| `<ConsoleBlock>` | `<Console>` | ⭐⭐ | Planned |
| `<TerminalBlock>` | `<Terminal>` | ⭐⭐ | Planned |
| `<Challenges>` | `<Challenge>` | ⭐ | Future |
| `<Diagram>` | `<Diagram>` | ⭐⭐ | Planned |
| `<Image>` | `<Image>` | ⭐⭐ | Planned |
| `<VideoPlayer>` | `<Video>` | ⭐ | Future |

## New Component Discovered: Aside (DeepDive)

**Purpose**: In-depth explanations that can be skipped without losing main flow

**Usage in react.dev**:
```mdx
<DeepDive>

#### Title of deep explanation

Detailed content that goes deeper into the topic...

</DeepDive>
```

**Our Implementation**: `<Aside>`
```mdx
<Aside title="How React rendering works">
  Deep explanation of React's rendering process...
</Aside>
```

## Updated Priority List for mdx-ui

### Phase 1: Essential (8 Components Total)
1. ✅ **Callout** (Done)
2. ✅ **CodeBlock** (Done)
3. ✅ **Tabs** (Done)
4. ✅ **Steps** (Done)
5. ⭐ **Lead** (Intro replacement)
6. ⭐ **Note** (Important callouts)
7. ⭐ **Summary** (Recap replacement)
8. ⭐ **Aside** (DeepDive replacement) - **NEW!**

### Phase 2: Code & Terminal (11 Components Total)
9. **LearnCard** (YouWillLearn/LearnMore)
10. **Console** (Console output)
11. **Terminal** (CLI commands)
12. **PackageInstall** (Package manager commands)

### Phase 3: Visual (14 Components Total)
13. **FileTree** (Directory structure)
14. **ExpandableSection** (Collapsible content)
15. **Diagram** (Visual diagrams)
16. **Image** (Enhanced images)

### Phase 4: Advanced (17+ Components)
17. **Sandbox** (Live code editor - complex)
18. **Challenge** (Interactive exercises)
19. **Video** (Video player)
20. **Badge** (Labels/tags)

## Key Insights from react.dev

### 1. **Callout Variants**
They have multiple callout types that we can handle with variants:
- `<Pitfall>` → `<Callout variant="danger">`
- `<Note>` → `<Callout variant="info">` OR separate `<Note>` component
- `<DeepDive>` → Need new `<Aside>` component (different purpose)

### 2. **Component Nesting**
Many components contain markdown content and can nest other components:
```mdx
<DeepDive>

#### Subheading

Content with **markdown** and `code`

<Diagram>...</Diagram>

</DeepDive>
```

### 3. **Semantic Names**
Their component names are semantic and self-documenting:
- `YouWillLearn` - Clear purpose
- `Pitfall` - Warns of common mistakes
- `DeepDive` - Optional deeper content

### 4. **Learning-Focused**
Many components are education-specific:
- `<Challenges>`
- `<Hint>`
- `<Solution>`
- `<YouWillLearn>`

## Recommended Implementation Order

### Week 1 (Phase 1) - Foundation
1. **Lead** - Simple, just styled text
2. **Note** - Simple callout variant
3. **Summary** - List wrapper with styling
4. **Aside** - Expandable/highlighted section

**Result**: 8 total components, ready for v0.1.0

### Week 2 (Phase 2) - Code Features
5. **LearnCard** - Link card with icon
6. **Console** - Styled code block variant
7. **Terminal** - Code block with $ prompt
8. **PackageInstall** - Auto-generate npm/pnpm/yarn commands

**Result**: 12 total components, ready for v0.2.0

### Week 3 (Phase 3) - Visual
9. **FileTree** - Recursive tree structure
10. **ExpandableSection** - Accordion-style
11. **Diagram** - SVG wrapper with styling
12. **Image** - Next.js Image with caption

**Result**: 16 total components, ready for v0.3.0

## Differentiation Strategy

### What Makes mdx-ui Different?

1. **Universal vs React-Specific**
   - react.dev: React docs only
   - mdx-ui: Any documentation site

2. **Simpler API**
   - Fewer specialized components
   - More use of variants
   - Less nesting required

3. **Modern Styling**
   - Built-in dark/light theme
   - Modern Tailwind patterns
   - Better responsive design

4. **No Framework Lock-in**
   - Works with any MDX setup
   - No React-specific assumptions
   - Pure components

## Component Naming Rationale

| react.dev | mdx-ui | Reason |
|-----------|--------|--------|
| Intro | Lead | More universal term |
| DeepDive | Aside | Standard HTML semantic |
| Recap | Summary | Clearer purpose |
| YouWillLearn | LearnCard | Shorter, flexible |
| ConsoleBlock | Console | Simpler |
| TerminalBlock | Terminal | Simpler |
| Pitfall | Callout | Variant instead |

## Next Steps

1. ✅ Implement **Aside** component (NEW discovery!)
2. ✅ Implement **Lead**, **Note**, **Summary**
3. Update CLI list command
4. Create example documentation
5. Build component showcase pages
