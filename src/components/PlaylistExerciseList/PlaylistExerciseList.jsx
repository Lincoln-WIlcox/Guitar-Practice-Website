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

    const onRemoveFromPlaylistPressed = (userExerciseId) =>
    {
        removeUserExercise(userExerciseId).then(onUserExercisesChanged)
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
                            editButton = <button className="mr-2 w-8 h-8 bg-blue-600 rounded my-border hover:bg-blue-400 active:bg-blue-200 my-shadow-light"
                                onClick={() => { navigate(`/edit-exercise/${exercise.id}`) }} data-testid="edit">
                                <i className="fa fa-pencil-square-o" aria-hidden="true" />
                            </button>
                        }

                        return (
                            <div className="flex w-9/12 justify-center" key={exercise.id}>
                                <div className={marginAroundListClass}>
                                    {thisUserExercise && <SortButtons userExercise={thisUserExercise} onUserExerciseSorted={onUserExerciseSorted} />}
                                </div>
                                <MiniExercise title={exercise.name} skill={exercise.skillId} author={exercise.userId} description={exercise.description} />
                                <div className={`flex ${marginAroundListClass} items-center`}>
                                    <button className="mr-2 w-8 h-8 bg-rose-800 rounded my-border 
                            hover:bg-rose-500 active:bg-rose-200
                            transition active:transition-none my-shadow-light"
                                        onClick={() => { onRemoveFromPlaylistPressed(thisUserExercise.id) }} data-testid="remove"><i className="fa fa-trash-o" aria-hidden="true" /></button>
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