import { useState, useEffect } from "react"
import { FitnessNavigation } from "@/components/FitnessNavigation"
import { GoalSetting } from "@/components/GoalSetting"
import { WorkoutLogger, type Workout } from "@/components/WorkoutLogger"
import { WorkoutSummary } from "@/components/WorkoutSummary"
import { WorkoutProgress } from "@/components/WorkoutProgress"

interface Goals {
  workouts: number
  calories: number
  duration: number
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("goals")
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [goals, setGoals] = useState<Goals>({ workouts: 100, calories: 1000, duration: 120 })
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedWorkouts = localStorage.getItem('fitnessWorkouts')
    const savedGoals = localStorage.getItem('fitnessGoals')
    
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts))
    }
    
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case "goals":
        return <GoalSetting goals={goals} setGoals={setGoals} />
      case "workout":
        return (
          <WorkoutLogger 
            workouts={workouts} 
            setWorkouts={setWorkouts}
            editingWorkout={editingWorkout}
            setEditingWorkout={setEditingWorkout}
          />
        )
      case "summary":
        return <WorkoutSummary workouts={workouts} goals={goals} />
      case "progress":
        return (
          <WorkoutProgress 
            workouts={workouts} 
            setWorkouts={setWorkouts}
            setEditingWorkout={setEditingWorkout}
            setActiveSection={setActiveSection}
          />
        )
      default:
        return <GoalSetting goals={goals} setGoals={setGoals} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <FitnessNavigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <main className="container mx-auto px-6 py-8">
        {renderSection()}
      </main>
    </div>
  )
}

export default Index
