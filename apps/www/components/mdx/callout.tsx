import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const calloutVariants = cva(
  "my-6 flex gap-3 rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "border-gray-700 bg-gray-900/50",
        info: "border-blue-700 bg-blue-950/50",
        warning: "border-yellow-700 bg-yellow-950/50",
        danger: "border-red-700 bg-red-950/50",
        success: "border-green-700 bg-green-950/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  icon?: React.ReactNode
  title?: string
}

export function Callout({
  className,
  variant,
  icon,
  title,
  children,
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    >
      {icon && <div className="flex-shrink-0 text-white">{icon}</div>}
      <div className="flex-1">
        {title && (
          <div className="mb-1 font-semibold text-white">{title}</div>
        )}
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  )
}
