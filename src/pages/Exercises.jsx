import { useEffect, useState } from "react"
import ExercisesList from "../components/ExercisesList/ExercisesList"
import "./Exercises.css"
import { getExercises } from "../services/exerciseServices"
import CreateExercise from "../components/CreateExercise/CreateExercise"

const Exercises = () =>
{
    const [allExercises, setAllExercises] = useState([])

    useEffect(
        () =>
        {
            getExercises().then(
                (exercises) =>
                {
                    setAllExercises(exercises)
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