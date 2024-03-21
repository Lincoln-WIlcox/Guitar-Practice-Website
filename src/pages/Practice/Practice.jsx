import { useEffect, useState } from "react"
import PracticeExerciseList from "../../components/PracticeExerciseList/PracticeExerciseList"
import { getUserExercisesByUserId } from "../../services/userExerciseService"
import { useNavigate } from "react-router-dom"
import { getLevelAndExpOfUser } from "../../scripts/Experience"

const Practice = ({ currentUser }) =>
{
    const [exercises, setExercises] = useState([])
    const [level, setLevel] = useState(0)
    const [expPercentage, setExpPercentage] = useState(0)
    const [exp, setExp] = useState(0)

    const navigate = useNavigate()

    const getAndSetLevelAndExp = () =>
    {
        getLevelAndExpOfUser(currentUser.id).then(
            (levelAndExp) =>
            {
                setLevel(levelAndExp.level)
                setExp(levelAndExp.exp)
                setExpPercentage((levelAndExp.exp / levelAndExp.expToLevelUp) * 100)
            }
        )
    }

    useEffect(
        () =>
        {
            getAndSetLevelAndExp()
        }, [currentUser]
    )

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

    const expBarClass = "2"

    return <div className="flex flex-col items-center">
        <p>Level: {level}</p>
        <div className="flex w-96 justify-start">
            <div className="flex justify-center expBar h-5 bg-cyan-600" style={{width: `${expPercentage}%`}}/>
            <p className="absolute text-center w-96">XP - {exp}</p>
        </div>
        <button onClick={onPracticeClicked}>Start Practicing</button>
        <PracticeExerciseList exercises={exercises} currentUser={currentUser} onCompletedExercisesChanged={getAndSetLevelAndExp} />
    </div>
}

export default Practice