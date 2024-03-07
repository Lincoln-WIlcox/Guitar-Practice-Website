import ExercisesList from "../components/ExercisesList/ExercisesList"
import "./Exercises.css"

const Exercises = () =>
{

    return (
        <div className="flex justify-center items-center flex-col">
            <ExercisesList exercises={[
        {
            "id": 1,
            "userId": 1,
            "skillId": 1,
            "name": "Exercise 1",
            "description": "Test exercise",
            "hidden": false
        },
        {
            "id": 2,
            "userId": 2,
            "skillId": 2,
            "name": "Exercise 2",
            "description": "Test exercise (the sequel)",
            "hidden": true
        }
    ]}/>
        </div>
    )
}

export default Exercises