import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Authorized = ({ children }) =>
{
    const navigate = useNavigate()

    const [returnValue, setReturnValue] = useState(<></>)

    useEffect(
        () =>
        {
            if(localStorage.getItem("guitar-practicer-user"))
            {
                setReturnValue(children)
            } else
            {
                navigate("/login")
            }
        }, []
    )

    return returnValue
}

export default Authorized