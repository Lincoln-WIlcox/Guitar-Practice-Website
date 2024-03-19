import { useNavigate } from "react-router-dom"
import { createAccount, getUserByUsername } from "../../services/userService"
import { useState } from "react"

const sidesWidthClass = "w-20"

const CreateAccount = () =>
{
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    const onUsernameInputChanged = (event) =>
    {
        setUsername(event.target.value)
    }

    const onCreateAccountButtonClicked = async () =>
    {
        const usersWithUsername = await getUserByUsername(username)

        if(usersWithUsername.length === 0)
        {
            makeAccountIfValid()
        } else
        {
            window.alert("A user already exists with that username.")
        }
    }

    const makeAccountIfValid = () =>
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

    const onLoginButtonClicked = () =>
    {
        navigate("/login")
    }

    return <div className="flex flex-col h-screen items-center justify-center space-y-10">
        <h1 className="text-6xl">Create Account</h1>
        <div className="space-x-5">
            <label name="username" className={sidesWidthClass}>username:</label>
            <input name="username" type="text" className="text-black" onChange={onUsernameInputChanged} />
            <button className={sidesWidthClass} onClick={onCreateAccountButtonClicked}>Create Account</button>
        </div>
        <div className="flex space-x-3">
            <p>Have an account?</p>
            <button onClick={onLoginButtonClicked}>Log In</button>
        </div>
    </div>
}

export default CreateAccount