import { useEffect, useState } from "react"
import { getUserExercisesByUserId } from "../../services/userExerciseService"
import { getCompletedExerciseByExerciseIdAndUserId, getCompletedExercisesByUserIdAndDate } from "../../services/exerciseCompletionService"
import { getDate } from "../../scripts/getDate"
import PracticeComplete from "../../components/PracticeComplete/PracticeComplete"
import PracticeExercise from "../../components/PracticeExercise/PracticeExercise"

const DecideWhatToPractice = ({ currentUser }) =>
{
    const [currentExercise, setCurrentExercise] = useState({})
    const [exercisesComplete, setExercisesComplete] = useState(false)

    const getAndSetCurrentExercise = () =>
    {
        getUserExercisesByUserId(currentUser.id).then(
            (userExercises) =>
            {
                const today = getDate()
                getCompletedExercisesByUserIdAndDate(currentUser.id, today).then(
                    (completedExercises) =>
                    {
                        const uncompletedUserExercises = userExercises.filter(userExercise =>
                            completedExercises.find(completedExercise => completedExercise.exerciseId == userExercise.exerciseId)
                                ? false : true)

                        if(uncompletedUserExercises.length > 0)
                        {
                            const highestOrderUncompletedExercise = uncompletedUserExercises.reduce(
                                (highestOrderUserExercise, UserExercise) => 
                                {
                                    if(UserExercise.order > highestOrderUserExercise.order)
                                    {
                                        return UserExercise
                                    } else
                                    {
                                        return highestOrderUserExercise
                                    }
                                }, uncompletedUserExercises[0]
                            )

                            setCurrentExercise(highestOrderUncompletedExercise.exercise)
                        } else
                        {
                            setExercisesComplete(true)
                        }
                    }
                )
            }
        )
    }

    useEffect(
        () =>
        {
            if(currentUser.id)
            {
                getAndSetCurrentExercise()
            }
        }, [currentUser]
    )

    if(exercisesComplete)
    {
        return <div className="flex justify-center mt-5">
            <PracticeComplete />
        </div>
    } else
    {
        return <div className="flex justify-center mt-5">
            <PracticeExercise currentUser={currentUser} exercise={currentExercise} onExerciseCompleted={getAndSetCurrentExercise} />
        </div>
    }
}

export default DecideWhatToPractice