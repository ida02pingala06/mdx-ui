# mdx-ui Component Roadmap

Inspired by react.dev but with unique names and our own implementation.

## Current Components (4)

- ✅ Callout - Alert boxes with variants
- ✅ CodeBlock - Code display with syntax highlighting
- ✅ Tabs - Tabbed content
- ✅ Steps - Step-by-step guides

## Priority 1: Essential Documentation Components (Add Next)

### 1. **Lead** (instead of "Intro")
Large intro text for page openings
```mdx
<Lead>
  This guide will teach you the fundamentals of React.
</Lead>
```
**Use case**: Opening paragraphs, page introductions

### 2. **Note** (instead of "SimpleCallout")
Simple highlighted note boxes
```mdx
<Note title="Quick Tip">
  You can use keyboard shortcuts to navigate faster.
</Note>
```
**Use case**: Tips, notes, simple highlights

### 3. **Summary** (instead of "Recap")
End-of-section summaries
```mdx
<Summary>
  - You learned about hooks
  - State management is key
  - Effects run after render
</Summary>
```
**Use case**: Section recaps, key takeaways

### 4. **LearnCard** (instead of "YouWillLearnCard")
Interactive link cards with preview
```mdx
<LearnCard title="Understanding Hooks" href="/docs/hooks">
  Learn how to use React Hooks to add state to function components.
</LearnCard>
```
**Use case**: Related content links, next steps

## Priority 2: Code & Terminal Components

### 5. **Console** (from ConsoleBlock)
Console output display
```mdx
<Console>
  Warning: Each child should have a unique key prop
</Console>
```
**Use case**: Console logs, error messages, warnings

### 6. **Terminal** (from TerminalBlock)
Terminal command display
```mdx
<Terminal>
  npm install @mdx-ui/components
</Terminal>
```
**Use case**: CLI commands, bash scripts

### 7. **PackageInstall** (from PackageImport)
Package installation snippets
```mdx
<PackageInstall pkg="react" />
```
**Use case**: Show install commands for different package managers

## Priority 3: Visual & Layout Components

### 8. **Diagram**
Visual diagrams wrapper
```mdx
<Diagram>
  <DiagramItem>Component A</DiagramItem>
  <DiagramItem>Component B</DiagramItem>
</Diagram>
```
**Use case**: Architecture diagrams, flow charts

### 9. **ExpandableSection** (from ExpandableExample)
Collapsible content sections
```mdx
<ExpandableSection title="Show detailed explanation">
  Here's the detailed content...
</ExpandableSection>
```
**Use case**: Optional detailed content, FAQs

### 10. **FileTree**
Display file/folder structures
```mdx
<FileTree>
  <FileTree.Folder name="src">
    <FileTree.File name="index.tsx" />
    <FileTree.File name="App.tsx" />
  </FileTree.Folder>
</FileTree>
```
**Use case**: Project structure, file organization

## Priority 4: Interactive & Advanced

### 11. **Sandbox** (from Sandpack)
Live code editor with preview
```mdx
<Sandbox>
  {`function App() {
    return <div>Hello</div>
  }`}
</Sandbox>
```
**Use case**: Live code examples, interactive demos

### 12. **Challenge**
Interactive coding challenges
```mdx
<Challenge title="Fix the bug">
  <Challenge.Problem>
    The counter doesn't increment. Fix it!
  </Challenge.Problem>
  <Challenge.Solution>
    Add setState to the onClick handler
  </Challenge.Solution>
</Challenge>
```
**Use case**: Learning exercises, practice problems

### 13. **ApiReference**
API documentation tables
```mdx
<ApiReference>
  <ApiReference.Method name="setState" params="newState" />
  <ApiReference.Method name="useState" returns="[state, setState]" />
</ApiReference>
```
**Use case**: API docs, prop tables

## Priority 5: Content Enhancement

### 14. **Highlight** (from InlineCode)
Inline code highlighting
```mdx
Use the <Highlight>useState</Highlight> hook
```
**Use case**: Inline code mentions

### 15. **Image**
Enhanced images with captions
```mdx
<Image src="/diagram.png" caption="Architecture overview" />
```
**Use case**: Documentation images, screenshots

### 16. **Video**
Embedded video with controls
```mdx
<Video src="/tutorial.mp4" caption="Watch the tutorial" />
```
**Use case**: Video tutorials, demos

### 17. **Link** (enhanced)
Smart documentation links
```mdx
<Link href="/docs/hooks">Learn about Hooks →</Link>
```
**Use case**: Internal doc links with icons

## Implementation Priority

### Phase 1: Core Documentation (Week 1) ⭐⭐⭐
1. Lead
2. Note
3. Summary
4. LearnCard

**Why**: These are the most commonly used in documentation and will give us 8 total components.

### Phase 2: Code Display (Week 2) ⭐⭐
5. Console
6. Terminal
7. PackageInstall

**Why**: Essential for technical documentation.

### Phase 3: Visual & Structure (Week 3) ⭐⭐
8. FileTree
9. ExpandableSection
10. Diagram

**Why**: Adds unique value for technical docs.

### Phase 4: Advanced Features (Week 4+) ⭐
11. Sandbox (complex, uses Sandpack)
12. Challenge
13. ApiReference
14. Image
15. Video
16. Highlight
17. Enhanced Link

**Why**: Nice-to-have features for later.

## Naming Philosophy

- **react.dev** → **mdx-ui** (our unique names)
- Intro → Lead (more descriptive)
- SimpleCallout → Note (clearer purpose)
- Recap → Summary (more universal)
- YouWillLearnCard → LearnCard (shorter, clearer)
- ExpandableExample → ExpandableSection (more generic)
- ConsoleBlock → Console (simpler)
- TerminalBlock → Terminal (simpler)

## Component Count Goals

- **v0.1.0**: 8 components (current 4 + Phase 1)
- **v0.2.0**: 11 components (+ Phase 2)
- **v0.3.0**: 14 components (+ Phase 3)
- **v1.0.0**: 17+ components (+ Phase 4)

## Differentiation from react.dev

While inspired by react.dev, our components will:
- ✅ Have unique names
- ✅ Use our own implementation (pure React + Tailwind)
- ✅ Support dark/light themes by default
- ✅ Be framework-agnostic (not React-specific docs)
- ✅ Have simpler APIs
- ✅ Include copy-paste installation
- ✅ Work with any MDX setup
