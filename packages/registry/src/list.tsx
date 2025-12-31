import * as React from "react"

export interface ListProps {
  children: React.ReactNode
  className?: string
}

export function UnorderedList({ children, className = "" }: ListProps) {
  return (
    <ul
      className={`list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300 ${className}`}
    >
      {children}
    </ul>
  )
}

export function OrderedList({ children, className = "" }: ListProps) {
  return (
    <ol
      className={`list-decimal list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300 ${className}`}
    >
      {children}
    </ol>
  )
}

export interface ListItemProps {
  children: React.ReactNode
  className?: string
}

export function ListItem({ children, className = "" }: ListItemProps) {
  return (
    <li className={`leading-relaxed ${className}`}>
      {children}
    </li>
  )
}
