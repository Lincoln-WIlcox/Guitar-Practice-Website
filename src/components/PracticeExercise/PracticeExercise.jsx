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

    return <div className="flex w-7/12 flex-col space-y-5 justify-center items-center">
        <h1 className="text-center">{exercise.name}</h1>
        <p className="text-left w-fit">{exercise.description}</p>
        <button onClick={onCompleteClicked}>Complete</button>
    </div>
}

export default PracticeExercise