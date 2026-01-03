"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FileTreeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string
}

interface ParsedNode {
  name: string
  level: number
  isFolder: boolean
  defaultOpen: boolean
}

function parseTree(input: string): ParsedNode[] {
  const lines = input.trim().split('\n').filter(line => line.trim())
  const nodes: ParsedNode[] = []

  for (const line of lines) {
    // Count leading spaces to determine level
    const match = line.match(/^(\s*)(.+)$/)
    if (!match) continue

    const indent = match[1].length
    const level = Math.floor(indent / 2) // 2 spaces = 1 level
    let name = match[2].trim()

    // Check if it's a folder (ends with /)
    const isFolder = name.endsWith('/')
    if (isFolder) {
      name = name.slice(0, -1) // Remove trailing /
    }

    // Check if folder should be open by default (ends with * before /)
    let defaultOpen = false
    if (name.endsWith('*')) {
      defaultOpen = true
      name = name.slice(0, -1) // Remove trailing *
    }

    nodes.push({ name, level, isFolder, defaultOpen })
  }

  return nodes
}

interface TreeItemInternalProps {
  node: ParsedNode
  children?: React.ReactNode
  level: number
}

function TreeItemInternal({ node, children, level }: TreeItemInternalProps) {
  const [isOpen, setIsOpen] = React.useState(node.defaultOpen)
  const hasChildren = React.Children.count(children) > 0

  // File/folder icons
  const Icon = () => {
    if (node.isFolder) {
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
    if (node.isFolder && hasChildren) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className="leading-relaxed">
      <div
        className={cn(
          "flex items-center",
          node.isFolder && hasChildren && "cursor-pointer hover:text-foreground"
        )}
        onClick={handleToggle}
      >
        <span className="select-none text-muted-foreground">
          {prefix}
          {connector}
        </span>
        <Icon />
        <span className={cn(node.isFolder && "font-semibold")}>{node.name}</span>
      </div>
      {node.isFolder && isOpen && hasChildren && (
        <div>{children}</div>
      )}
    </div>
  )
}

function buildTree(nodes: ParsedNode[]): React.ReactNode {
  if (nodes.length === 0) return null

  const result: React.ReactNode[] = []
  let i = 0

  while (i < nodes.length) {
    const currentNode = nodes[i]
    const currentLevel = currentNode.level

    // Find all children (nodes with level > currentLevel that come immediately after)
    const children: ParsedNode[] = []
    let j = i + 1

    while (j < nodes.length && nodes[j].level > currentLevel) {
      children.push(nodes[j])
      j++
    }

    // Build child tree
    const childElements = buildTree(children)

    result.push(
      <TreeItemInternal key={i} node={currentNode} level={currentLevel}>
        {childElements}
      </TreeItemInternal>
    )

    // Skip the children we've already processed
    i = j
  }

  return <>{result}</>
}

export function FileTree({ children, className, ...props }: FileTreeProps) {
  const nodes = React.useMemo(() => parseTree(children), [children])
  const tree = React.useMemo(() => buildTree(nodes), [nodes])

  return (
    <div
      className={cn(
        "rounded-lg border bg-muted/30 p-4 font-mono text-sm",
        className
      )}
      {...props}
    >
      {tree}
    </div>
  )
}

FileTree.displayName = "FileTree"
