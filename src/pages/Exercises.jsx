import MiniExercise from "../components/MiniExercise/MiniExercise"
import "./Exercises.css"

const Exercises = () =>
{
    return (
        <div data-testid="exercises-page" className="flex justify-center items-center flex-col">
            <MiniExercise />
            <MiniExercise />
            <MiniExercise />
            <MiniExercise />
            <MiniExercise />
            <MiniExercise />

        </div>
    )
}

export default Exercises