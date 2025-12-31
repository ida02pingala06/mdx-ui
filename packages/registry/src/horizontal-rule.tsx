import * as React from "react"

export interface HorizontalRuleProps {
  className?: string
  variant?: "default" | "dashed" | "dotted" | "gradient"
}

export function HorizontalRule({
  className = "",
  variant = "default"
}: HorizontalRuleProps) {
  const variantStyles = {
    default: "border-t border-gray-300 dark:border-gray-700",
    dashed: "border-t border-dashed border-gray-300 dark:border-gray-700",
    dotted: "border-t border-dotted border-gray-300 dark:border-gray-700",
    gradient: "h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent border-0"
  }

  return (
    <hr className={`my-8 ${variantStyles[variant]} ${className}`} />
  )
}
