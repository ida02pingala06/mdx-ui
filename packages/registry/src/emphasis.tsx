import * as React from "react"
import { cn } from "@/lib/utils"

interface EmphasisProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Strong({ children, className, ...props }: EmphasisProps) {
  return (
    <strong
      className={cn("font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </strong>
  )
}

export function Em({ children, className, ...props }: EmphasisProps) {
  return (
    <em
      className={cn("italic text-foreground", className)}
      {...props}
    >
      {children}
    </em>
  )
}
