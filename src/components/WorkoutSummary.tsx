import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { ProgressBar } from "@/components/ui/progress-bar"
import { TrendingUp, Target, Zap, Clock, Trophy } from "lucide-react"
import { Workout } from "./WorkoutLogger"

interface Goals {
  workouts: number
  calories: number
  duration: number
}

interface WorkoutSummaryProps {
  workouts: Workout[]
  goals: Goals
}

export function WorkoutSummary({ workouts, goals }: WorkoutSummaryProps) {
  const totalWorkouts = workouts.length
  const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0)
  const averageDuration = totalWorkouts > 0 
    ? workouts.reduce((sum, workout) => sum + workout.duration, 0) / totalWorkouts 
    : 0

  const workoutProgress = (totalWorkouts / goals.workouts) * 100
  const caloriesProgress = (totalCalories / goals.calories) * 100
  const durationProgress = (averageDuration / goals.duration) * 100

  const getProgressVariant = (progress: number) => {
    if (progress >= 100) return "success"
    if (progress >= 75) return "default"
    if (progress >= 50) return "warning"
    return "destructive"
  }

  return (
    <div className="animate-fade-in space-y-6">
      <Card elevated glass>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span>Workout Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Total Workouts */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-semibold">Total Workouts</span>
              </div>
              <div className="text-3xl font-bold text-primary">
                {totalWorkouts}
              </div>
              <ProgressBar
                value={totalWorkouts}
                max={goals.workouts}
                variant={getProgressVariant(workoutProgress)}
                animated
              />
            </div>

            {/* Total Calories */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-semibold">Total Calories</span>
              </div>
              <div className="text-3xl font-bold text-primary">
                {totalCalories.toLocaleString()}
              </div>
              <ProgressBar
                value={totalCalories}
                max={goals.calories}
                variant={getProgressVariant(caloriesProgress)}
                animated
              />
            </div>

            {/* Average Duration */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-semibold">Avg Duration</span>
              </div>
              <div className="text-3xl font-bold text-primary">
                {averageDuration.toFixed(1)}<span className="text-lg text-muted-foreground">min</span>
              </div>
              <ProgressBar
                value={averageDuration}
                max={goals.duration}
                variant={getProgressVariant(durationProgress)}
                animated
              />
            </div>
          </div>

          {/* Achievement badges */}
          {(workoutProgress >= 100 || caloriesProgress >= 100 || durationProgress >= 100) && (
            <div className="mt-8 p-4 bg-gradient-primary rounded-lg">
              <div className="flex items-center space-x-2 text-primary-foreground">
                <Trophy className="w-6 h-6" />
                <span className="font-bold text-lg">Congratulations!</span>
              </div>
              <p className="text-primary-foreground/90 mt-2">
                You've achieved one or more of your fitness goals! Keep up the amazing work! 🎉
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}