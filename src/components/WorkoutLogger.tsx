import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Input } from "@/components/ui/enhanced-input"
import { Button } from "@/components/ui/enhanced-button"
import { Dumbbell, Clock, Zap, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export interface Workout {
  id: string
  workoutType: string
  duration: number
  calories: number
  date: string
}

interface WorkoutLoggerProps {
  workouts: Workout[]
  setWorkouts: (workouts: Workout[]) => void
  editingWorkout?: Workout | null
  setEditingWorkout?: (workout: Workout | null) => void
}

export function WorkoutLogger({ workouts, setWorkouts, editingWorkout, setEditingWorkout }: WorkoutLoggerProps) {
  const [formData, setFormData] = useState({
    workoutType: editingWorkout?.workoutType || "",
    duration: editingWorkout?.duration.toString() || "",
    calories: editingWorkout?.calories.toString() || "",
    date: editingWorkout?.date || new Date().toISOString().split('T')[0]
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.workoutType || !formData.duration || !formData.calories || !formData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      })
      return
    }

    const workout: Workout = {
      id: editingWorkout?.id || Date.now().toString(),
      workoutType: formData.workoutType,
      duration: Number(formData.duration),
      calories: Number(formData.calories),
      date: formData.date
    }

    let updatedWorkouts
    if (editingWorkout) {
      updatedWorkouts = workouts.map(w => w.id === editingWorkout.id ? workout : w)
      setEditingWorkout?.(null)
      toast({
        title: "Workout Updated! 💪",
        description: "Your workout has been updated successfully.",
      })
    } else {
      updatedWorkouts = [...workouts, workout]
      toast({
        title: "Workout Logged! 🔥",
        description: "Great job on completing your workout!",
      })
    }

    setWorkouts(updatedWorkouts)
    localStorage.setItem('fitnessWorkouts', JSON.stringify(updatedWorkouts))
    
    // Clear form
    setFormData({
      workoutType: "",
      duration: "",
      calories: "",
      date: new Date().toISOString().split('T')[0]
    })
  }

  const handleCancel = () => {
    setEditingWorkout?.(null)
    setFormData({
      workoutType: "",
      duration: "",
      calories: "",
      date: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <div className="animate-fade-in">
      <Card elevated glass className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Dumbbell className="w-6 h-6 text-primary" />
            <span>{editingWorkout ? "Edit Workout" : "Log New Workout"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Workout Type"
                type="text"
                placeholder="e.g., Running, Weightlifting"
                value={formData.workoutType}
                onChange={(e) => setFormData(prev => ({ ...prev, workoutType: e.target.value }))}
                icon={<Dumbbell className="w-4 h-4" />}
              />
              <Input
                label="Duration (minutes)"
                type="number"
                placeholder="e.g., 45"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                icon={<Clock className="w-4 h-4" />}
              />
              <Input
                label="Calories Burned"
                type="number"
                placeholder="e.g., 300"
                value={formData.calories}
                onChange={(e) => setFormData(prev => ({ ...prev, calories: e.target.value }))}
                icon={<Zap className="w-4 h-4" />}
              />
              <Input
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                icon={<Calendar className="w-4 h-4" />}
              />
            </div>
            <div className="flex space-x-4">
              <Button type="submit" variant="glow" className="flex-1" size="lg">
                {editingWorkout ? "Update Workout" : "Log Workout"}
              </Button>
              {editingWorkout && (
                <Button type="button" variant="secondary" onClick={handleCancel} size="lg">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}