import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MiniExercise from "../MiniExercise/MiniExercise"
import { getUserExerciseByUserIdAndExerciseId, getUserExercisesByUserId, removeUserExercise } from "../../services/userExerciseService"
import SortButtons from "../SortButtons/SortButtons"

const marginAroundListClass = "w-4/12"

const PlaylistExerciseList = ({ currentUser, exercises, onUserExercisesChanged }) =>
{
    const [userExercises, setUserExercises] = useState([])

    const navigate = useNavigate()

    const fetchAndSetUserExercises = () =>
    {
        getUserExercisesByUserId(currentUser.id).then(
            (gottenUserExercises) =>
            {
                setUserExercises(gottenUserExercises)
            }
        )
    }

    useEffect(
        () =>
        {
            fetchAndSetUserExercises()
        }, [currentUser]
    )

    const onRemoveFromPlaylistPressed = (exerciseId) =>
    {
        getUserExerciseByUserIdAndExerciseId(exerciseId, currentUser.id).then(
            (gottenExercises) =>
            {
                if(gottenExercises.length > 0)
                {
                    removeUserExercise(gottenExercises[0].id).then(onUserExercisesChanged)
                }
            }
        )
    }

    const onUserExerciseSorted = () =>
    {
        fetchAndSetUserExercises()
        onUserExercisesChanged()
    }

    return (
        <div className="flex justify-center items-center flex-col w-full">
            {
                exercises?.map(
                    (exercise) =>
                    {
                        let thisUserExercise = userExercises.find(userExercise => userExercise.exerciseId === exercise.id)

                        let editButton = <></>
                        if(exercise.userId == currentUser.id)
                        {
                            editButton = <button onClick={() => { navigate(`/edit-exercise/${exercise.id}`) }}>Edit</button>
                        }

                        return (
                            <div className="flex w-9/12 justify-center" key={exercise.id}>
                                <div className={marginAroundListClass}>
                                    {thisUserExercise && <SortButtons userExercise={thisUserExercise} onUserExerciseSorted={onUserExerciseSorted} />}
                                </div>
                                <MiniExercise title={exercise.name} skill={exercise.skillId} author={exercise.userId} description={exercise.description} />
                                <div className={`flex ${marginAroundListClass}`}>
                                    <button className="mr-2" onClick={() => { onRemoveFromPlaylistPressed(exercise.id) }}>Remove From Playlist</button>
                                    {editButton}
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default PlaylistExerciseList