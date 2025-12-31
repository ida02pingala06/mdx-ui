"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within Tabs")
  }
  return context
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const value = controlledValue ?? internalValue

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange]
  )

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-900 p-1 text-gray-400",
        className
      )}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  )
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export function TabsTrigger({
  className,
  value: triggerValue,
  children,
  ...props
}: TabsTriggerProps) {
  const { value, onValueChange } = useTabsContext()
  const isActive = value === triggerValue

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-gray-950 text-white shadow-sm"
          : "hover:bg-gray-800 hover:text-gray-200",
        className
      )}
      onClick={() => onValueChange(triggerValue)}
      {...props}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export function TabsContent({
  className,
  value: contentValue,
  children,
  ...props
}: TabsContentProps) {
  const { value } = useTabsContext()
  const isActive = value === contentValue

  if (!isActive) return null

  return (
    <div
      role="tabpanel"
      className={cn(
        "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
