import { Dumbbell, Target, TrendingUp, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface FitnessNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function FitnessNavigation({ activeSection, setActiveSection }: FitnessNavigationProps) {
  const navItems = [
    { id: "goals", label: "Set Goals", icon: Target },
    { id: "workout", label: "Log Workout", icon: Dumbbell },
    { id: "summary", label: "Summary", icon: TrendingUp },
    { id: "progress", label: "Progress", icon: Calendar },
  ]

  return (
    <nav className="glass border-border-light sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-lobster text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            FitnessTracker
          </div>
          <div className="flex space-x-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 nav-item interactive",
                  activeSection === id 
                    ? 'bg-gradient-primary text-primary-foreground shadow-glow active' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}