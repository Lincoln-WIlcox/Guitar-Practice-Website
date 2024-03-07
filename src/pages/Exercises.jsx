import ExercisesList from "../components/ExercisesList/ExercisesList"
import "./Exercises.css"
import { getExercises } from "../services/exerciseServices"
import CreateExercise from "../components/CreateExercise/CreateExercise"
import { useEffect, useState } from "react"

const Exercises = () =>
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
                <CreateExercise />
                <ExercisesList exercises={allExercises} />
            </div>

        </div>
    )
}

export default Exercises