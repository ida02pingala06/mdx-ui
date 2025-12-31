import { useMDXComponent } from "next-contentlayer2/hooks";
import { Blockquote } from "@/components/mdx/blockquote";
import { Callout } from "@/components/mdx/callout";
import { Steps, Step } from "@/components/mdx/steps";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/mdx/tabs";
import { Headings } from "@/components/mdx/headings";
import { H1, H2, H3, H4, H5, H6 } from "@/components/mdx/heading";
import { Paragraph, Lead, Intro, Large, Small, Muted } from "@/components/mdx/paragraph";

const components = {
  Blockquote,
  Callout,
  Steps,
  Step,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Headings,
  Paragraph,
  Lead,
  Intro,
  Large,
  Small,
  Muted,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium underline underline-offset-4 hover:text-foreground"
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-base leading-7 [&:not(:first-child)]:mt-6"
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc space-y-2 [&>li]:mt-2" {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal space-y-2 [&>li]:mt-2" {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className="mt-2" {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="mt-6 border-l-2 pl-6 italic"
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-md" alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="m-0 border-t p-0 even:bg-muted"
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4"
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    />
  ),
  div: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    if (className === "preview") {
      return (
        <div
          className="my-6 rounded-lg border bg-card p-6"
          {...props}
        />
      );
    }
    return <div className={className} {...props} />;
  },
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
