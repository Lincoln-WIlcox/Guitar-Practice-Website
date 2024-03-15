import { useEffect, useState } from "react"
import { addUserExercise, getUserExercisesByUserId, removeUserExercise } from "../../services/userExerciseService"
import MiniExercise from "../MiniExercise/MiniExercise"
import "./ExercisesList.css"
import { useNavigate } from "react-router-dom"

//the left and right sides of the exercises list needs to be the same width, so i'm using a shared variable so i don't have to remember to do that to both
const marginAroundListClass = "w-4/12"

const ExercisesList = ({ currentUser, exercises, onUserExercisesChanged }) =>
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

    const onAddToPlaylistPressed = (exerciseId) =>
    {
        const userExercise =
        {
            userId: currentUser.id,
            exerciseId: exerciseId
        }
        addUserExercise(userExercise).then(
            () =>
            {
                if(onUserExercisesChanged)
                {
                    onUserExercisesChanged().then(fetchAndSetUserExercises)
                } else 
                {
                    fetchAndSetUserExercises()
                }
            }
        )
    }

    const onRemoveFromPlaylistPressed = (userExerciseId) =>
    {
        removeUserExercise(userExerciseId).then(
            () =>
            {
                if(onUserExercisesChanged)
                {
                    onUserExercisesChanged().then(fetchAndSetUserExercises)
                } else 
                {
                    fetchAndSetUserExercises()
                }
            }
        )
    }

    return (
        <div className="flex justify-center items-center flex-col w-full">
            {
                exercises?.map(
                    (exercise) =>
                    {
                        const thisUserExercise = userExercises.find(userExercise => userExercise.userId == currentUser.id && userExercise.exerciseId == exercise.id)
                        const thisUserExerciseIsInUserExercise = thisUserExercise ? true : false
                        let addOrRemoveExerciseButton = <></>
                        if(thisUserExerciseIsInUserExercise)
                        {
                            addOrRemoveExerciseButton = <button className="mr-2" onClick={() => { onRemoveFromPlaylistPressed(thisUserExercise.id) }}>Remove From Playlist</button>
                        } else
                        {
                            addOrRemoveExerciseButton = <button className="mr-2" onClick={() => { onAddToPlaylistPressed(exercise.id) }}>Add To Playlist</button>
                        }

                        let editButton = <></>
                        if(exercise.userId == currentUser.id)
                        {
                            editButton = <button onClick={() => { navigate(`/edit-exercise/${exercise.id}`) }}>Edit</button>
                        }

                        return (
                            <div className="flex w-9/12 justify-center" key={exercise.id}>
                                <div className={marginAroundListClass}></div>
                                <MiniExercise title={exercise.name} skill={exercise.skillId} author={exercise.userId} description={exercise.description} />
                                <div className={`flex ${marginAroundListClass}`}>
                                    {addOrRemoveExerciseButton}
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

export default ExercisesList