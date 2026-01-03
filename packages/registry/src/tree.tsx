"use client"

import * as React from "react"
import { cn } from "./lib/utils"

interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface TreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /**
   * The name of the file or folder
   */
  name?: string
  /**
   * Whether this is a folder (directory) or a file
   */
  isFolder?: boolean
  /**
   * Whether the folder is open/expanded by default
   */
  defaultOpen?: boolean
  /**
   * Nesting level (used internally for indentation)
   */
  level?: number
}

const TreeContext = React.createContext<{ level: number }>({ level: 0 })

export function Tree({ children, className, ...props }: TreeProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-muted/30 p-4 font-mono text-sm",
        className
      )}
      {...props}
    >
      <TreeContext.Provider value={{ level: 0 }}>
        {children}
      </TreeContext.Provider>
    </div>
  )
}

export function TreeItem({
  children,
  name,
  isFolder = false,
  defaultOpen = false,
  level: propLevel,
  className,
  ...props
}: TreeItemProps) {
  const context = React.useContext(TreeContext)
  const level = propLevel ?? context.level
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  const hasChildren = React.Children.count(children) > 0

  // File/folder icons
  const Icon = () => {
    if (isFolder) {
      return (
        <span className="mr-1 text-blue-500">
          {isOpen ? "📂" : "📁"}
        </span>
      )
    }
    return <span className="mr-1 text-gray-400">📄</span>
  }

  // Tree line characters
  const prefix = level > 0 ? "│   ".repeat(level - 1) : ""
  const connector = level > 0 ? "├── " : ""

  const handleToggle = () => {
    if (isFolder && hasChildren) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={cn("leading-relaxed", className)} {...props}>
      <div
        className={cn(
          "flex items-center",
          isFolder && hasChildren && "cursor-pointer hover:text-foreground"
        )}
        onClick={handleToggle}
      >
        <span className="select-none text-muted-foreground">
          {prefix}
          {connector}
        </span>
        <Icon />
        <span className={cn(isFolder && "font-semibold")}>{name}</span>
      </div>
      {isFolder && isOpen && hasChildren && (
        <TreeContext.Provider value={{ level: level + 1 }}>
          {children}
        </TreeContext.Provider>
      )}
    </div>
  )
}

Tree.displayName = "Tree"
TreeItem.displayName = "TreeItem"
