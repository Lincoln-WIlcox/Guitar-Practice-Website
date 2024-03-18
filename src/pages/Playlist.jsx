import { useEffect, useState } from "react"
import PlaylistExerciseList from "../components/PlaylistExerciseList/PlaylistExerciseList"
import { getUserExercisesByUserId } from "../services/userExerciseService"

const Playlist = ({ currentUser }) =>
{
    const [exercises, setExercises] = useState([])

    const getAndSetUserExercises = () =>
    {
        if(currentUser.id)
        {
            getUserExercisesByUserId(currentUser.id).then(
                (userExercises) =>
                {
                    if(userExercises)
                    {
                        const gottenExercises = userExercises.map(userExercise => userExercise.exercise)
                        setExercises(gottenExercises)
                    }
                }
            )
        }
    }

    useEffect(
        () =>
        {
            getAndSetUserExercises()
        }, [currentUser]
    )

    return <div className="flex justify-center items-center flex-col w-full">
        <PlaylistExerciseList currentUser={currentUser} exercises={exercises} onUserExercisesChanged={getAndSetUserExercises} />
    </div>
}

export default Playlist