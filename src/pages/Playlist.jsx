import { useEffect, useState } from "react"
import ExercisesList from "../components/ExercisesList/ExercisesList"
import { getUserExercisesByUserId } from "../services/userExerciseService"

const Playlist = ({ currentUser }) =>
{
    const [exercises, setExercises] = useState([])

    const getAndSetUserExercises = () =>
    {
        getUserExercisesByUserId(currentUser?.id).then(
            (userExercises) =>
            {
                if(userExercises)
                {
                    const newExercises = userExercises.map(userExercise => userExercise.exercise)
                    setExercises(newExercises)
                }
            }
        )
    }

    const onUserExercisesChanged = () =>
    {
        getAndSetUserExercises()
    }

    useEffect(
        () =>
        {
            getAndSetUserExercises()
        }, [currentUser]
    )

    return <div className="flex justify-center items-center flex-col w-full">
        <ExercisesList currentUser={currentUser} exercises={exercises} onUserExercisesChanged={onUserExercisesChanged} />
    </div>
}

export default Playlist