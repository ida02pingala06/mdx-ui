import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const paragraphVariants = cva("", {
  variants: {
    variant: {
      default: "text-base leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground leading-relaxed",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      intro: "text-lg leading-8 text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    variant: "default",
    align: "left",
  },
});

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  as?: "p" | "div" | "span";
}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ as: Comp = "p", variant, align, className, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(paragraphVariants({ variant, align }), className)}
        {...props}
      />
    );
  }
);

Paragraph.displayName = "Paragraph";

// Convenience components for common paragraph styles
export const Lead = React.forwardRef<HTMLParagraphElement, Omit<ParagraphProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Paragraph ref={ref} variant="lead" className={className} {...props} />
  )
);
Lead.displayName = "Lead";

export const Intro = React.forwardRef<HTMLParagraphElement, Omit<ParagraphProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Paragraph ref={ref} variant="intro" className={className} {...props} />
  )
);
Intro.displayName = "Intro";

export const Large = React.forwardRef<HTMLParagraphElement, Omit<ParagraphProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Paragraph ref={ref} variant="large" className={className} {...props} />
  )
);
Large.displayName = "Large";

export const Small = React.forwardRef<HTMLParagraphElement, Omit<ParagraphProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Paragraph ref={ref} variant="small" className={className} {...props} />
  )
);
Small.displayName = "Small";

export const Muted = React.forwardRef<HTMLParagraphElement, Omit<ParagraphProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Paragraph ref={ref} variant="muted" className={className} {...props} />
  )
);
Muted.displayName = "Muted";
