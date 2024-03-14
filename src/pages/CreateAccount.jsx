import { useNavigate } from "react-router-dom"
import { createAccount } from "../services/userService"
import { useState } from "react"

const CreateAccount = () =>
{
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    const onUsernameInputChanged = (event) =>
    {
        setUsername(event.target.value)
    }

    const onLoginButtonClicked = () =>
    {
        if(username !== "")
        {
            const user =
            {
                username: username
            }
            createAccount(user).then(
                navigate("/login")
            )
        } else
        {
            window.alert("Username is empty.")
        }
    }

    return <div>
        <h1 className="text-6xl">Create Account</h1>
        <div className="space-x-5">
            <label name="username">username:</label>
            <input name="username" type="text" className="text-black" onChange={onUsernameInputChanged} />
            <button onClick={onLoginButtonClicked}>Create Account</button>
        </div>
        <div className="flex">
            <p>Have an account?  </p>
            <button>Log In</button>
        </div>
    </div>
}

export default CreateAccount