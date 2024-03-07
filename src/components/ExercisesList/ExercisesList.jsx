import MiniExercise from "../MiniExercise/MiniExercise"
import "./ExercisesList.css"

const ExercisesList = ({ exercises }) =>
{
    return (
        <div className="flex justify-center items-center flex-col">
            {
                exercises?.map(
                    (exercise) =>
                    {
                        return <MiniExercise title={exercise.name} skill={exercise.skillId} author={exercise.userId} description={exercise.description} key={exercise.id} />
                    }
                )
            }
        </div>
    )
}

export default ExercisesList