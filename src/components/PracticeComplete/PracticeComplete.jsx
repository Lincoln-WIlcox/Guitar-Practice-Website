import { useNavigate } from "react-router-dom"

const PracticeComplete = () =>
{
    const navigate = useNavigate()

    return <div className="flex flex-col">
        <h1>You're done!</h1>
        <button onClick={() => { navigate('/practice') }}>
            Return To Practice
        </button>
    </div>
}

export default PracticeComplete