export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export function getTableOfContents(content: string): TocEntry[] {
  const headingLines = content.split("\n").filter((line) => {
    return line.match(/^#{2,3}\s/);
  });

  const toc: TocEntry[] = [];

  for (const heading of headingLines) {
    const level = heading.match(/^#+/)?.[0].length || 0;
    const text = heading.replace(/^#+\s/, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (level === 2 || level === 3) {
      toc.push({ id, text, level });
    }
  }

  return toc;
}
