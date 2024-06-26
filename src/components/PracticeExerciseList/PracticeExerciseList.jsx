import { useEffect, useState } from "react"
import MiniExercise from "../MiniExercise/MiniExercise"
import { addCompletedExercise, getCompletedExerciseByExerciseIdAndUserId, getCompletedExerciseByExerciseIdAndUserIdAndDate, getCompletedExercisesByUserIdAndDate, removedCompletedExercise } from "../../services/exerciseCompletionService"
import { getDate } from "../../scripts/getDate"

//the left and right sides of the exercises list needs to be the same width, so i'm using a shared variable so i don't have to remember to do that to both
const marginAroundListClass = "w-4/12"

const PracticeExerciseList = ({ currentUser, exercises, onCompletedExercisesChanged }) =>
{
    const [completedExercises, setCompletedExercises] = useState([])

    const getAndSetCompletedExercises = () =>
    {
        const date = new Date()
        let day = date.getDate()
        let month = (date.getMonth() + 1).toString()
        let year = date.getFullYear()

        if(month.length < 2)
        {
            month = `0${month}`
        }

        let fullDate = `${year}${month}${day}`

        getCompletedExercisesByUserIdAndDate(currentUser.id, fullDate).then(
            (gottenCompletedExercises) =>
            {
                setCompletedExercises(gottenCompletedExercises)
            }
        )
    }

    useEffect(
        () =>
        {
            getAndSetCompletedExercises()
        }, [currentUser]
    )

    const onCompletedCheckboxChanged = async (event) =>
    {
        if(event.target.checked)
        {
            const completedExercise =
            {
                userId: currentUser.id,
                exerciseId: event.target.value,
                dateCompleted: getDate()
            }

            addCompletedExercise(completedExercise).then(
                () =>
                {
                    getAndSetCompletedExercises()
                    onCompletedExercisesChanged()
                }
            )
        } else
        {

            getCompletedExerciseByExerciseIdAndUserIdAndDate(event.target.value, currentUser.id, getDate()).then(
                (gottenCompletedExercises) =>
                {
                    if(gottenCompletedExercises.length === 1)
                    {
                        removedCompletedExercise(gottenCompletedExercises[0].id).then(
                            () =>
                            {
                                getAndSetCompletedExercises()
                                onCompletedExercisesChanged()
                            }
                        )
                    }
                }
            )
        }
    }

    return (
        <div className="flex justify-center items-center flex-col w-full">
            {
                exercises?.map(
                    (exercise) =>
                    {
                        let completedCheckbox = <input type="checkbox" className="size-4" checked={
                            completedExercises.find(completedExercise => completedExercise.exerciseId == exercise.id) ? true : false
                        } onChange={onCompletedCheckboxChanged} value={exercise.id} />

                        return (
                            <div className="flex w-9/12 justify-center" key={exercise.id}>
                                <div className={marginAroundListClass}></div>
                                <MiniExercise title={exercise.name} skill={exercise.skillId} author={exercise.userId} description={exercise.description} />
                                <div className={`flex ${marginAroundListClass} items-center`}>
                                    {completedCheckbox}
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default PracticeExerciseList