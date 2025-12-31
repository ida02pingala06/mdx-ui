import * as React from "react"
import { cn } from "@/lib/utils"

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  children: React.ReactNode
}

export function Steps({ className, children, ...props }: StepsProps) {
  return (
    <div
      className={cn("[counter-reset:step] my-6 space-y-8", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function Step({ className, title, children, ...props }: StepProps) {
  return (
    <div
      className={cn("relative flex gap-4", className)}
      {...props}
    >
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-900 text-sm font-bold text-white [counter-increment:step] before:content-[counter(step)]" />
        <div className="mt-2 h-full w-px bg-gray-700" />
      </div>
      <div className="flex-1 pb-8">
        {title && (
          <h3 className="mb-2 font-semibold text-white">{title}</h3>
        )}
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  )
}
