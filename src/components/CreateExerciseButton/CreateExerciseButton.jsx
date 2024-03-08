import { Link } from "react-router-dom"

const CreateExerciseButton = () =>
{
    return <Link to="/create-exercise">
        <button>Create New Exercise</button>
    </Link>
}

export default CreateExerciseButton