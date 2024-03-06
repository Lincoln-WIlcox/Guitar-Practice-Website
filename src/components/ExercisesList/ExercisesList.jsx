import MiniExercise from "../MiniExercise/MiniExercise"
import "./ExercisesList.css"

const ExercisesList = ({ exercises }) =>
{
    return (
        <>
            {
                exercises?.map(
                    (exercise) =>
                    {
                        return <MiniExercise title={exercise.name} skill={exercise.skillId} author={exercise.userId} description={exercise.description} key={exercise.id} />
                    }
                )
            }
        </>
    )
}

export default ExercisesList