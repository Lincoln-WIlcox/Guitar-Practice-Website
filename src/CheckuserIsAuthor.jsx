import { useNavigate, useParams } from "react-router-dom"
import { getExerciseById } from "./services/exerciseServices"
import { useEffect, useState } from "react"

const CheckUserIsAuthor = ({ currentUser, children }) =>
{
    const { exerciseId } = useParams()
    const navigate = useNavigate()

    const [returnValue, setReturnValue] = useState(<></>)

    useEffect(
        () =>
        {
            getExerciseById(exerciseId).then(
                (thisExercise) =>
                {
                    if(thisExercise.userId == currentUser.id)
                    {
                        setReturnValue(children)
                    } else if(thisExercise.userId !== 0)
                    {
                        navigate("/")
                    }
                }
            )
        }, []
    )

    return returnValue
}

export default CheckUserIsAuthor