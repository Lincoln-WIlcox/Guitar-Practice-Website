import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MiniExercise from "../MiniExercise/MiniExercise"
import { addCompletedExercise } from "../../services/exerciseCompletionService"

//the left and right sides of the exercises list needs to be the same width, so i'm using a shared variable so i don't have to remember to do that to both
const marginAroundListClass = "w-4/12"

const PracticeExerciseList = ({ currentUser, exercises, onUserExercisesChanged }) =>
{

    const onCompletedCheckboxChanged = (event) =>
    {
        if(event.target.checked)
        {
            const completedExercise =
            {
                userId: currentUser.id,
                exerciseId: event.target.value,
            }

            addCompletedExercise(completedExercise)
        } else
        {

        }
    }

    return (
        <div className="flex justify-center items-center flex-col w-full">
            {
                exercises?.map(
                    (exercise) =>
                    {
                        let completedCheckbox = <input type="checkbox" onChange={onCompletedCheckboxChanged} value={exercise.id} />

                        return (
                            <div className="flex w-9/12 justify-center" key={exercise.id}>
                                <div className={marginAroundListClass}></div>
                                <MiniExercise title={exercise.name} skill={exercise.skillId} author={exercise.userId} description={exercise.description} />
                                <div className={`flex ${marginAroundListClass}`}>
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