import * as React from "react"

export interface BlockquoteProps {
  children: React.ReactNode
  className?: string
  cite?: string
}

export function Blockquote({ children, className = "", cite }: BlockquoteProps) {
  return (
    <blockquote
      className={`border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-950/30 ${className}`}
    >
      {children}
      {cite && (
        <footer className="text-sm text-gray-600 dark:text-gray-400 mt-2 not-italic">
          — {cite}
        </footer>
      )}
    </blockquote>
  )
}
