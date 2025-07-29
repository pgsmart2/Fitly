import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max: number
  label?: string
  showPercentage?: boolean
  variant?: "default" | "success" | "warning" | "destructive"
  animated?: boolean
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max, label, showPercentage = true, variant = "default", animated = true, ...props }, ref) => {
    const percentage = Math.min((value / max) * 100, 100)
    
    const getVariantClasses = () => {
      switch (variant) {
        case "success":
          return "bg-gradient-to-r from-success to-emerald-400 shadow-[0_0_20px_hsl(120_60%_50%/0.3)] progress-gradient"
        case "warning":
          return "bg-gradient-to-r from-warning to-amber-400 shadow-[0_0_20px_hsl(45_100%_60%/0.3)] progress-gradient"
        case "destructive":
          return "bg-gradient-to-r from-destructive to-red-400 shadow-[0_0_20px_hsl(0_85%_60%/0.3)] progress-gradient"
        default:
          return "bg-gradient-primary shadow-glow progress-gradient"
      }
    }

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">{label}</span>
            {showPercentage && (
              <span className="text-sm text-muted-foreground">
                {value} / {max}
              </span>
            )}
          </div>
        )}
        <div className="relative h-3 rounded-full bg-surface-elevated border border-border overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden",
              getVariantClasses(),
              animated && "progress-animate"
            )}
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>
        {showPercentage && (
          <div className="text-center">
            <span className="text-lg font-bold text-primary">
              {percentage.toFixed(1)}%
            </span>
          </div>
        )}
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }