import { DynamicSidebar } from "@/components/dynamic-sidebar";

interface ReferenceLayoutProps {
  children: React.ReactNode;
}

export default function ReferenceLayout({ children }: ReferenceLayoutProps) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="h-full py-6 pr-6 lg:py-8">
          <DynamicSidebar />
        </div>
      </aside>
      {children}
    </div>
  );
}
