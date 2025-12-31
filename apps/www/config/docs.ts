export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface DocsConfig {
  mainNav: NavItem[];
  sidebarNav: NavItemWithChildren[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/blockquote",
    },
    {
      title: "GitHub",
      href: "https://github.com/yourusername/mdx-ui",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
        {
          title: "Installation",
          href: "/docs/installation",
        },
        {
          title: "CLI",
          href: "/docs/cli",
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Blockquote",
          href: "/docs/components/blockquote",
        },
        {
          title: "Callout",
          href: "/docs/components/callout",
        },
        {
          title: "Code Block",
          href: "/docs/components/code-block",
        },
        {
          title: "Emphasis",
          href: "/docs/components/emphasis",
        },
        {
          title: "Headings",
          href: "/docs/components/headings",
        },
        {
          title: "Horizontal Rule",
          href: "/docs/components/horizontal-rule",
        },
        {
          title: "Image",
          href: "/docs/components/image",
        },
        {
          title: "Inline Code",
          href: "/docs/components/inline-code",
        },
        {
          title: "List",
          href: "/docs/components/list",
        },
        {
          title: "Paragraph",
          href: "/docs/components/paragraph",
        },
        {
          title: "Steps",
          href: "/docs/components/steps",
        },
        {
          title: "Tabs",
          href: "/docs/components/tabs",
        },
      ],
    },
  ],
};
