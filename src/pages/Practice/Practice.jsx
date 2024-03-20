import { useEffect, useState } from "react"
import PracticeExerciseList from "../../components/PracticeExerciseList/PracticeExerciseList"
import { getUserExercisesByUserId } from "../../services/userExerciseService"
import { useNavigate } from "react-router-dom"

const Practice = ({ currentUser }) =>
{
    const [exercises, setExercises] = useState([])

    const navigate = useNavigate()

    useEffect(
        () =>
        {
            getUserExercisesByUserId(currentUser.id).then(
                (gottenUserExercises) =>
                {
                    gottenUserExercises.sort((a, b) => b.order - a.order);
                    const gottenExercises = gottenUserExercises.map(userExercise => userExercise.exercise)
                    setExercises(gottenExercises)
                }
            )
        }, [currentUser]
    )

    const onPracticeClicked = () =>
    {
        navigate('/practice-exercises')
    }

    return <div className="flex flex-col items-center">
        <button onClick={onPracticeClicked}>Start Practicing</button>
        <PracticeExerciseList exercises={exercises} currentUser={currentUser} />
    </div>
}

export default Practice