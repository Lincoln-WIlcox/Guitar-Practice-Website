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
                        debugger
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
            getAndSetLevelAndExp()
        }, [currentUser]
    )

    const navigate = useNavigate()



    return <div className="flex flex-col items-center">
        <h1>You're done!</h1>
        {
            leveledUp &&
            <p>You leveled up to {level}!</p>
        }
        <p>You earned {expEarnedToday} exp today</p>

        <button onClick={() => { navigate('/practice') }}>
            Return To Practice
        </button>
    </div>
}

export default PracticeComplete