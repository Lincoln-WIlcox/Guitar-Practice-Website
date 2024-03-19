import { useState } from "react"
import { getUserByUsername } from "../../services/userService"
import { useNavigate } from "react-router-dom"

const sidesWidthClass = "w-20"

const Login = () =>
{
    const [username, setUsername] = useState("")

    const navigate = useNavigate()

    const onUsernameInputChanged = (event) =>
    {
        setUsername(event.target.value)
    }

    const onLoginButtonClicked = (event) =>
    {
        getUserByUsername(username).then(
            (user) =>
            {
                if(user.length === 1)
                {
                    window.localStorage.setItem("guitar-practicer-user", JSON.stringify(user[0]))
                    navigate("/")
                } else
                {
                    window.alert("user does not exist.")
                }
            }
        )
    }

    const onCreateAccoutButtonClicked = () =>
    {
        navigate("/create-account")
    }

    return <div className="flex flex-col h-screen items-center justify-center space-y-10">
        <h1 className="text-6xl ">Log In</h1>
        <div className="space-x-5">
            <label name="username" className={sidesWidthClass}>username:</label>
            <input name="username" type="text" className="text-black" onChange={onUsernameInputChanged} />
            <button className={sidesWidthClass} onClick={onLoginButtonClicked}>Log In</button>
        </div>
        <div className="flex space-x-3 ">
            <p>Don't have an account?  </p>
            <button onClick={onCreateAccoutButtonClicked}>Create Account</button>
        </div>
    </div>
}

export default Login