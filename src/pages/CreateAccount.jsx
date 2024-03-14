
const CreateAccount = () =>
{

    const onUsernameInputChanged = () =>
    {

    }

    const onLoginButtonClicked = () =>
    {
        
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