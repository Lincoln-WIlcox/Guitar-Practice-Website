import { useEffect, useState } from "react"
import { addUserExercise, getUserExercisesByUserId, removeUserExercise } from "../../services/userExerciseService"
import MiniExercise from "../MiniExercise/MiniExercise"
import "./ExercisesList.css"

const userId = 1

//the left and right sides of the exercises list needs to be the same width, so i'm using a shared variable so i don't have to remember to do that to both
const marginAroundListClass = "w-3/12"

const ExercisesList = ({ exercises }) =>
{
    const [userExercises, setUserExercises] = useState([])

    const fetchAndSetUserExercises = () =>
    {
        getUserExercisesByUserId(userId).then(
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
        }, []
    )

    const onAddToPlaylistPressed = (exerciseId) =>
    {
        const userExercise =
        {
            userId: 1,
            exerciseId: exerciseId
        }
        addUserExercise(userExercise)

        fetchAndSetUserExercises()
    }

    const onRemoveFromPlaylistPressed = (userExerciseId) =>
    {
        removeUserExercise(userExerciseId)

        fetchAndSetUserExercises()
    }

    return (
        <div className="flex justify-center items-center flex-col">
            {
                exercises?.map(
                    (exercise) =>
                    {
                        const thisUserExercise = userExercises.find(userExercise => userExercise.userId == userId && userExercise.exerciseId == exercise.id)
                        const thisUserExerciseIsInUserExercise = thisUserExercise ? true : false
                        let addOrRemoveExerciseButton = <></>
                        if(thisUserExerciseIsInUserExercise)
                        {
                            addOrRemoveExerciseButton = <button className={marginAroundListClass} onClick={() => { onRemoveFromPlaylistPressed(thisUserExercise.id) }}>Remove From Playlist</button>
                        } else
                        {
                            addOrRemoveExerciseButton = <button className={marginAroundListClass} onClick={() => { onAddToPlaylistPressed(exercise.id) }}>Add To Playlist</button>
                        }

                        return (
                            <div className="flex w-7/12 justify-center" key={exercise.id}>
                                <div className={marginAroundListClass}></div>
                                <MiniExercise title={exercise.name} skill={exercise.skillId} author={exercise.userId} description={exercise.description} />
                                {addOrRemoveExerciseButton}
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default ExercisesList