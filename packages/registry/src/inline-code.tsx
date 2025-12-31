import * as React from "react"
import { cn } from "@/lib/utils"

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Code({ children, className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        "text-foreground",
        "before:content-[''] after:content-['']",
        className
      )}
      {...props}
    >
      {children}
    </code>
  )
}
