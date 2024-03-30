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

    return <div className="flex w-fit max-w-5xl flex-col p-5 justify-center items-center my-border bg-stone-800 my-shadow-dark">
        <h1 className="text-center text-2xl">{exercise.name}</h1>
        <p className="text-left m-16">{exercise.description}</p>
        <button className="mt-10 my-button p-1 text-xl my-shadow-light size-10" onClick={onCompleteClicked}><i className="fa fa-check" /></button>
    </div>
}

export default PracticeExercise