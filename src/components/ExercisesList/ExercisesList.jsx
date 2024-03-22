import { useEffect, useState } from "react"
import { addExerciseToEndOfOrder, getUserExercisesByUserId, removeUserExercise } from "../../services/userExerciseService"
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
        addExerciseToEndOfOrder(userExercise).then(
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
        <div className="flex justify-center items-center flex-col w-full exercise-list">
            {
                exercises?.map(
                    (exercise) =>
                    {
                        const thisUserExercise = userExercises.find(userExercise => userExercise.userId == currentUser.id && userExercise.exerciseId == exercise.id)
                        const thisUserExerciseIsInUserExercise = thisUserExercise ? true : false
                        let addOrRemoveExerciseButton = <></>
                        if(thisUserExerciseIsInUserExercise)
                        {
                            addOrRemoveExerciseButton = <button className="mr-2 w-8 h-8 bg-rose-800 rounded my-border 
                            hover:bg-rose-500 active:bg-rose-200
                            transition active:transition-none"
                                onClick={() => { onRemoveFromPlaylistPressed(thisUserExercise.id) }} data-testid="remove"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                        } else
                        {
                            addOrRemoveExerciseButton = <button className="mr-2 w-8 h-8 bg-green-700 rounded my-border 
                            hover:bg-green-500 active:bg-green-200
                            transition active:transition-none"
                                onClick={() => { onAddToPlaylistPressed(exercise.id) }} data-testid="add"><i className="fa fa-plus" aria-hidden="true"></i></button>
                        }

                        let editButton = <></>
                        if(exercise.userId == currentUser.id)
                        {
                            editButton = <button className="mr-2 w-8 h-8 bg-blue-600 rounded my-border hover:bg-blue-400 active:bg-blue-200" onClick={() => { navigate(`/edit-exercise/${exercise.id}`) }} data-testid="edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                        }

                        return (
                            <div className="flex w-full lg:w-9/12 items-center justify-center" key={exercise.id}>
                                <div className=" lg:w-4/12"></div>
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
        </div >
    )
}

export default ExercisesList