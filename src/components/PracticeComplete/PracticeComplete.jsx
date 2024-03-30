import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLevelAndExpOfUser, getLevelAndExpOfUserBeforeToday, getTotalExperienceForUser, getTotalExperienceForUserBeforeToday } from "../../scripts/Experience"

const PracticeComplete = ({ currentUser }) =>
{
    const [expEarnedToday, setExpEarnedToday] = useState(0)
    const [leveledUp, setLeveledUp] = useState(false)
    const [level, setLevel] = useState(0)

    const getAndSetLevelAndExp = () =>
    {
        getLevelAndExpOfUser(currentUser.id).then(
            (levelAndExp) =>
            {
                setLevel(levelAndExp.level)

                getLevelAndExpOfUserBeforeToday(currentUser.id).then(
                    (levelAndExpBeforeToday) =>
                    {
                        if(levelAndExp.level > levelAndExpBeforeToday.level)
                        {
                            setLeveledUp(true)
                        }
                    }
                )
            }
        )
        getTotalExperienceForUser(currentUser.id).then(
            (exp) =>
            {
                getTotalExperienceForUserBeforeToday(currentUser.id).then(
                    (expBeforeToday) =>
                    {
                        setExpEarnedToday(exp - expBeforeToday)
                    }
                )
            }
        )
    }

    useEffect(
        () =>
        {
            if(currentUser)
            {
                getAndSetLevelAndExp()
            }
        }, [currentUser]
    )

    const navigate = useNavigate()



    return <div className="flex h-screen w-screen justify-center">
        <div className="flex flex-col h-1/3 w-1/3 min-h-80 mt-36 p-2 items-center my-border justify-around bg-stone-800">
            <div>
                <h1 className="text-2xl m-4">You're done!</h1>
                {
                    leveledUp &&
                    <p>You leveled up to {level}!</p>
                }
                <p>You earned {expEarnedToday} exp today</p>
            </div>


            <button className="my-button p-2 text-lg"
                onClick={() => { navigate('/practice') }}>
                Return To Practice
            </button>
        </div>
    </div>

}

export default PracticeComplete