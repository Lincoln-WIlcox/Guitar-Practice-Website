import { useEffect, useState } from "react"
import PracticeExerciseList from "../../components/PracticeExerciseList/PracticeExerciseList"
import { getExercisesByUserId } from "../../services/exerciseServices"

const Practice = ({ currentUser }) =>
{
    const [exercises, setExercises] = useState([])

    useEffect(
        () =>
        {
            getExercisesByUserId(currentUser.id).then(
                (gottenExercises) =>
                {
                    console.log(gottenExercises)
                    setExercises(gottenExercises)
                }
            )
        }, [currentUser]
    )

    return <div className="flex justify-center">
        <PracticeExerciseList exercises={exercises} currentUser={currentUser} />
    </div>
}

export default Practice