import { allDocs } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { TableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import { notFound } from "next/navigation";

export default function DocsPage() {
  // Find the index doc - slugAsParams is "" for docs/index.mdx
  const doc = allDocs.find((doc) => doc.slugAsParams === "" || doc.slugAsParams === "index");

  if (!doc) {
    notFound();
  }

  const toc = getTableOfContents(doc.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            {doc.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {doc.description}
          </p>
        </div>
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-y-auto pt-6">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
