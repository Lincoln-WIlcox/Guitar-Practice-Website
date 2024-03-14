import { useEffect, useState } from "react"
import ExercisesList from "../components/ExercisesList/ExercisesList"
import { getUserExercisesByUserId } from "../services/userExerciseService"

const Playlist = ({ currentUser }) =>
{
    const [exercises, setExercises] = useState([])

    const getAndSetUserExercises = () =>
    {
        getUserExercisesByUserId(currentUser.id).then(
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

    useEffect(
        () =>
        {
            getAndSetUserExercises()
        }, []
    )

    return <div className="flex justify-center items-center flex-col">
        <ExercisesList exercises={exercises} />
    </div>
}

export default Playlist