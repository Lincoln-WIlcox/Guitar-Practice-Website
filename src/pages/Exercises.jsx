import { useEffect, useState } from "react"
import ExercisesList from "../components/ExercisesList/ExercisesList"
import "./Exercises.css"
import { getExercises } from "../services/exerciseServices"

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
        <div className="flex justify-center items-center flex-col">
            <ExercisesList exercises={allExercises}/>
        </div>
    )
}

export default Exercises