import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Calendar, Edit, Trash2, Dumbbell, Clock, Zap } from "lucide-react"
import { Workout } from "./WorkoutLogger"
import { useToast } from "@/hooks/use-toast"

interface WorkoutProgressProps {
  workouts: Workout[]
  setWorkouts: (workouts: Workout[]) => void
  setEditingWorkout: (workout: Workout) => void
  setActiveSection: (section: string) => void
}

export function WorkoutProgress({ workouts, setWorkouts, setEditingWorkout, setActiveSection }: WorkoutProgressProps) {
  const { toast } = useToast()

  const handleEdit = (workout: Workout) => {
    setEditingWorkout(workout)
    setActiveSection("workout")
  }

  const handleDelete = (workoutId: string) => {
    const updatedWorkouts = workouts.filter(w => w.id !== workoutId)
    setWorkouts(updatedWorkouts)
    localStorage.setItem('fitnessWorkouts', JSON.stringify(updatedWorkouts))
    
    toast({
      title: "Workout Deleted",
      description: "The workout has been removed from your history.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="animate-fade-in">
      <Card elevated glass>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-primary" />
            <span>Your Workout History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {workouts.length === 0 ? (
            <div className="text-center py-12">
              <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No workouts logged yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start your fitness journey by logging your first workout!
              </p>
              <Button variant="glow" onClick={() => setActiveSection("workout")}>
                Log Your First Workout
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {workouts
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((workout, index) => (
                  <Card
                    key={workout.id}
                    elevated
                    glass
                    className="card-animate pulse-on-hover hover:shadow-glow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 rounded-lg bg-gradient-primary/20">
                              <Dumbbell className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-foreground">{workout.workoutType}</h3>
                              <p className="text-sm text-muted-foreground">{formatDate(workout.date)}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface-elevated/50 border border-border-light/50">
                              <div className="p-2 rounded-lg bg-blue-500/20">
                                <Clock className="w-4 h-4 text-blue-400" />
                              </div>
                              <div>
                                <span className="block font-bold text-lg text-foreground">{workout.duration}</span>
                                <span className="text-xs text-muted-foreground">minutes</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface-elevated/50 border border-border-light/50">
                              <div className="p-2 rounded-lg bg-orange-500/20">
                                <Zap className="w-4 h-4 text-orange-400" />
                              </div>
                              <div>
                                <span className="block font-bold text-lg text-foreground">{workout.calories}</span>
                                <span className="text-xs text-muted-foreground">calories</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-6">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleEdit(workout)}
                            className="interactive pulse-on-hover"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(workout.id)}
                            className="interactive pulse-on-hover"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}