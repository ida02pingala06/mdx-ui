import * as React from "react"
import { cn } from "@/lib/utils"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  title?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  className,
  title,
  showLineNumbers = false,
  children,
  ...props
}: CodeBlockProps) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-gray-700 bg-gray-950">
      {title && (
        <div className="border-b border-gray-700 bg-gray-900 px-4 py-2 text-sm font-medium text-white">
          {title}
        </div>
      )}
      <pre
        className={cn(
          "overflow-x-auto p-4",
          showLineNumbers && "[counter-reset:line]",
          className
        )}
        {...props}
      >
        <code className="text-sm text-gray-300">{children}</code>
      </pre>
    </div>
  )
}
