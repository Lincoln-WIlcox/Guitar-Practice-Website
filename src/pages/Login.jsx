import { useState } from "react"
import { getUserByUsername } from "../services/userService"

const Login = () =>
{
    const [username, setUsername] = useState("")

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
                    localStorage.setItem(
                        "guitar-practicer-user",
                        JSON.stringify(user[0])
                    )
                } else
                {

                }
            }
        )
    }

    return <div className="flex flex-col h-screen items-center justify-center space-y-10">
        <h1 className="text-6xl">Log In</h1>
        <div className="space-x-5">
            <label name="username">username:</label>
            <input name="username" type="text" onChange={onUsernameInputChanged} />
            <button>Log In</button>
        </div>
        <div className="flex">
            <p>Don't have an account?  </p>
            <button>Create Account</button>
        </div>
    </div>
}

export default Login