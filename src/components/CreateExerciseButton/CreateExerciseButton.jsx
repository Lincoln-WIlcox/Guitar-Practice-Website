import { Link } from "react-router-dom"

const CreateExerciseButton = () =>
{
    return <Link className="w-full flex justify-center" to="/create-exercise">
        <button className="w-fit justify-center mb-2 flex-wrap lg:flex-nowrap my-border my-shadow-dark bg-green-700 m-2 text-xl p-2 hover:bg-green-500 active:bg-green-200
        transition active:transition-none">Add Exercise</button>
    </Link>
}

export default CreateExerciseButton