# Site Structure & Navigation

## 🎯 Global Layout

All pages now share a consistent layout with:
- **Global Header** - Navigation bar on every page
- **Global Footer** - Footer on every page
- **Theme Support** - Dark mode toggle in header

## 📐 Layout Hierarchy

```
RootLayout (app/layout.tsx)
├── SiteHeader (sticky navbar)
├── Content (varies by page)
└── SiteFooter
```

## 🧭 Site Navigation

### Header Navigation
- **MDX UI Logo** - Links to homepage (/)
- **Documentation** - Links to /docs
- **Components** - Links to /components
- **GitHub** - External link
- **Theme Toggle** - Light/dark mode switch

### Footer
- Simple copyright/attribution text
- Consistent across all pages

## 📄 Page Routes

### Main Pages

| Route | Description | Layout |
|-------|-------------|--------|
| `/` | Homepage with hero & features | Header + Footer |
| `/components` | Components gallery (grid view) | Header + Footer |
| `/docs` | Documentation index | Header + Sidebar + Footer |
| `/docs/components/*` | Component docs | Header + Sidebar + TOC + Footer |

### Documentation Pages

All `/docs/*` routes include:
- ✅ Global header (SiteHeader)
- ✅ Left sidebar (DocsSidebar)
- ✅ Right sidebar/TOC (TableOfContents)
- ✅ Breadcrumbs
- ✅ Prev/Next navigation
- ✅ Global footer (SiteFooter)

## 🎨 Components

### Global Components

**SiteHeader** ([components/site-header.tsx](apps/www/components/site-header.tsx))
- Sticky positioning
- Backdrop blur effect
- Responsive navigation
- Theme toggle

**SiteFooter** ([components/site-footer.tsx](apps/www/components/site-footer.tsx))
- Simple, minimal footer
- Responsive layout

### Page-Specific Components

**DocsSidebar** ([components/docs-sidebar.tsx](apps/www/components/docs-sidebar.tsx))
- Only on `/docs/*` routes
- JSON-driven navigation
- Expandable sections
- Active state highlighting

**TableOfContents** ([components/toc.tsx](apps/www/components/toc.tsx))
- Only on component docs pages
- Auto-generated from headings
- Scroll spy (highlights current section)

## 🔄 Navigation Flow

```
Homepage (/)
    ↓
    Click "Documentation" in header
    ↓
Docs Index (/docs)
    ↓
    Click component in sidebar
    ↓
Component Page (/docs/components/blockquote)
    ↓
    Use prev/next or sidebar to navigate
```

Alternative flow:
```
Homepage (/)
    ↓
    Click "Components" in header
    ↓
Components Gallery (/components)
    ↓
    Click component card
    ↓
Component Page (/docs/components/blockquote)
```

## 📱 Responsive Behavior

### Desktop (≥1024px)
- Full header with all links
- Sidebar visible
- TOC visible on right
- Three-column layout for docs

### Tablet (768px - 1023px)
- Full header
- Sidebar visible
- TOC hidden
- Two-column layout for docs

### Mobile (<768px)
- Compact header
- Sidebar hidden (needs mobile menu - TODO)
- TOC hidden
- Single column layout

## 🎯 Layout Variants

### Homepage Layout
```
┌─────────────────────┐
│   Global Header     │
├─────────────────────┤
│                     │
│   Hero Section      │
│                     │
├─────────────────────┤
│   Features Grid     │
├─────────────────────┤
│   CTA Section       │
├─────────────────────┤
│   Global Footer     │
└─────────────────────┘
```

### Components Gallery Layout
```
┌─────────────────────┐
│   Global Header     │
├─────────────────────┤
│   Page Title        │
├─────────────────────┤
│  ┌───┐ ┌───┐ ┌───┐ │
│  │   │ │   │ │   │ │  Component Cards
│  └───┘ └───┘ └───┘ │
├─────────────────────┤
│   Global Footer     │
└─────────────────────┘
```

### Documentation Layout
```
┌─────────────────────────────────────┐
│        Global Header                │
├──────┬─────────────────┬────────────┤
│      │                 │            │
│ Side │  Main Content   │    TOC     │
│ bar  │  + Breadcrumbs  │  (On This  │
│      │  + Title        │   Page)    │
│      │  + MDX Content  │            │
│      │  + Prev/Next    │            │
│      │                 │            │
├──────┴─────────────────┴────────────┤
│        Global Footer                │
└─────────────────────────────────────┘
```

## 🔧 Configuration Files

### Navigation
- **docs-nav.json** - Documentation sidebar structure
- **site-header.tsx** - Main navigation links

### Layouts
- **app/layout.tsx** - Root layout (header + footer)
- **app/docs/layout.tsx** - Docs layout (adds sidebar)
- **app/docs/components/[...slug]/page.tsx** - Component page (adds TOC)

## ✅ Consistency Checklist

Every page has:
- ✅ Global header with navigation
- ✅ Theme toggle
- ✅ Responsive design
- ✅ Global footer
- ✅ Proper spacing/padding
- ✅ Consistent typography

Documentation pages additionally have:
- ✅ Left sidebar navigation
- ✅ Breadcrumbs
- ✅ Table of contents (component pages)
- ✅ Prev/Next navigation (component pages)

## 🎨 Styling

### Header
- Sticky positioning (`sticky top-0`)
- Z-index 50 (above content)
- Backdrop blur effect
- Border bottom
- Height: 3.5rem (56px)

### Footer
- Border top
- Padding: 1.5rem / 6rem
- Responsive height
- Muted text color

### Content Area
- Flex-grow to fill space
- Responsive padding
- Container max-width

## 🚀 Benefits

1. **Consistent UX** - Same navigation everywhere
2. **Easy Navigation** - Always visible header links
3. **Theme Persistence** - Toggle works on all pages
4. **SEO Friendly** - Proper semantic HTML structure
5. **Accessibility** - Keyboard navigation, ARIA labels
6. **Mobile Ready** - Responsive at all breakpoints

## 📝 TODO

- [ ] Mobile menu (hamburger) for small screens
- [ ] Search functionality in header
- [ ] Active state for header links
- [ ] Keyboard shortcuts
- [ ] Skip to content link
- [ ] Logo image/icon
