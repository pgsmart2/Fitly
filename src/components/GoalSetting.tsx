import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Input } from "@/components/ui/enhanced-input"
import { Button } from "@/components/ui/enhanced-button"
import { Target, Zap, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Goals {
  workouts: number
  calories: number
  duration: number
}

interface GoalSettingProps {
  goals: Goals
  setGoals: (goals: Goals) => void
}

export function GoalSetting({ goals, setGoals }: GoalSettingProps) {
  const [formData, setFormData] = useState({
    workouts: goals.workouts.toString(),
    calories: goals.calories.toString(),
    duration: goals.duration.toString()
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newGoals = {
      workouts: Math.min(Number(formData.workouts) || 100, 100),
      calories: Math.min(Number(formData.calories) || 1000, 1000),
      duration: Math.min(Number(formData.duration) || 120, 120)
    }
    
    setGoals(newGoals)
    localStorage.setItem('fitnessGoals', JSON.stringify(newGoals))
    
    toast({
      title: "Goals Updated! 🎯",
      description: "Your fitness goals have been set successfully.",
    })
  }

  return (
    <div className="animate-fade-in">
      <Card elevated glass className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-primary" />
            <span>Set Your Fitness Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Input
                label="Weekly Workouts"
                type="number"
                placeholder="Max 100"
                value={formData.workouts}
                onChange={(e) => setFormData(prev => ({ ...prev, workouts: e.target.value }))}
                max={100}
                icon={<Target className="w-4 h-4" />}
              />
              <Input
                label="Daily Calories"
                type="number"
                placeholder="Max 1000"
                value={formData.calories}
                onChange={(e) => setFormData(prev => ({ ...prev, calories: e.target.value }))}
                max={1000}
                icon={<Zap className="w-4 h-4" />}
              />
              <Input
                label="Session Duration (min)"
                type="number"
                placeholder="Max 120"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                max={120}
                icon={<Clock className="w-4 h-4" />}
              />
            </div>
            <Button type="submit" variant="glow" className="w-full" size="lg">
              Set Goals
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}