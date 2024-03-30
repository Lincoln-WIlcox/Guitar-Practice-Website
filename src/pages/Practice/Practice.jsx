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

    return <div className="flex flex-col items-center h-screen">
        <div className="flex flex-col items-center p-3 h-1/6 justify-around">
            <p className="text-2xl">Level: {level}</p>
            <div className="flex w-96 justify-center items-center">
                <div className="w-full my-border bg-gray-900 my-shadow-light">
                    <div className="flex justify-center expBar h-5 bg-cyan-600" style={{ width: `${expPercentage}%` }} />
                </div>
                <p className="absolute text-center w-96">XP - {exp}</p>
            </div>
        </div>

        <button className="my-button p-2 text-lg m-4 my-shadow-light" onClick={onPracticeClicked}>Start Practicing</button>
        <PracticeExerciseList exercises={exercises} currentUser={currentUser} onCompletedExercisesChanged={getAndSetLevelAndExp} />
    </div>
}

export default Practice