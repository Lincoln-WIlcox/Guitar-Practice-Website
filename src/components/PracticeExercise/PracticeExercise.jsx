import { getDate } from "../../scripts/getDate"
import { addCompletedExercise } from "../../services/exerciseCompletionService"

const PracticeExercise = ({ currentUser, exercise, onExerciseCompleted }) =>
{

    const onCompleteClicked = () =>
    {
        const today = getDate()
        const completedExercise =
        {
            "userId": currentUser.id,
            "exerciseId": exercise.id,
            "dateCompleted": today,
        }

        addCompletedExercise(completedExercise).then(onExerciseCompleted)
    }

    return <div className="flex flex-col space-y-5">
        <h1>{exercise.name}</h1>
        <p>{exercise.description}</p>
        <button onClick={onCompleteClicked}>Complete</button>
    </div>
}

export default PracticeExercise