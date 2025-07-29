import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 interactive",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-intense btn-glow",
        secondary: "bg-surface-elevated border border-border-light text-foreground hover:bg-accent hover:shadow-elevation",
        ghost: "text-foreground hover:bg-accent hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-gradient-to-r from-destructive to-red-500 text-primary-foreground hover:from-red-600 hover:to-red-600 shadow-md hover:shadow-lg interactive",
        success: "bg-gradient-to-r from-success to-emerald-500 text-primary-foreground hover:from-emerald-600 hover:to-emerald-600 shadow-md hover:shadow-lg interactive",
        glow: "bg-gradient-primary text-primary-foreground shadow-glow btn-glow animate-glow-pulse",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }