import { useEffect, useState } from "react"
import PracticeExerciseList from "../../components/PracticeExerciseList/PracticeExerciseList"
import { getUserExercisesByUserId } from "../../services/userExerciseService"

const Practice = ({ currentUser }) =>
{
    const [exercises, setExercises] = useState([])

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

    return <div className="flex justify-center">
        
        <PracticeExerciseList exercises={exercises} currentUser={currentUser} />
    </div>
}

export default Practice