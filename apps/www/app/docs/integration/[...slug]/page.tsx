import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { TableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import { getBreadcrumbs } from "@/lib/docs-nav";
import { PageNavigation } from "@/components/page-navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface IntegrationPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getDocFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  // The route is at /docs/integration/[...slug], so we need to prepend "integration/"
  // to match against slugAsParams which is "integration/nextjs-mdx-remote"
  const fullSlug = `integration/${slug}`;
  const doc = allDocs.find(
    (doc) => doc.slugAsParams === fullSlug
  );

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateStaticParams(): Promise<
  IntegrationPageProps["params"] extends Promise<infer T> ? T[] : never
> {
  return allDocs
    .filter((doc) => doc.slugAsParams.startsWith("integration/"))
    .map((doc) => ({
      // slugAsParams is "integration/nextjs-mdx-remote", we need to remove "integration/" prefix
      // since the route already includes /docs/integration/
      slug: doc.slugAsParams.replace(/^integration\//, "").split("/"),
    }));
}

export default async function IntegrationPage({ params }: IntegrationPageProps) {
  const resolvedParams = await params;
  const doc = await getDocFromParams(resolvedParams);

  if (!doc) {
    notFound();
  }

  const toc = getTableOfContents(doc.body.raw);
  const breadcrumbs = getBreadcrumbs(doc.slug);

  return (
    <main className="relative px-4 py-6 md:px-8 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px] xl:gap-16">
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        {/* Breadcrumbs */}
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path || index} className="flex items-center space-x-1">
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-foreground">{crumb.title}</span>
              ) : (
                <Link
                  href={crumb.path || "#"}
                  className="overflow-hidden text-ellipsis whitespace-nowrap hover:text-foreground"
                >
                  {crumb.title}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Page header */}
        <div className="space-y-4">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            {doc.title}
          </h1>
          <p className="text-lg leading-7 text-muted-foreground">
            {doc.description}
          </p>
        </div>

        {/* Content */}
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>

        {/* Prev/Next Navigation */}
        <PageNavigation currentPath={doc.slug} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-y-auto pt-6">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
