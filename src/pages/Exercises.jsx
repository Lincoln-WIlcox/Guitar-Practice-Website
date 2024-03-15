import ExercisesList from "../components/ExercisesList/ExercisesList"
import "./Exercises.css"
import { getExercises } from "../services/exerciseServices"
import CreateExerciseButton from "../components/CreateExerciseButton/CreateExerciseButton"
import { useEffect, useState } from "react"

const Exercises = ({ currentUser }) =>
{
    const [allExercises, setAllExercises] = useState([])

    useEffect(
        () =>
        {
            getExercises().then(
                (gottenExercises) =>
                {
                    setAllExercises(gottenExercises)
                }
            )
        }, []
    )


    return (
        <div className="">
            <div>

            </div>
            <div className="flex justify-center items-center flex-col">
                <CreateExerciseButton />
                <ExercisesList currentUser={currentUser} exercises={allExercises} />
            </div>

        </div>
    )
}

export default Exercises