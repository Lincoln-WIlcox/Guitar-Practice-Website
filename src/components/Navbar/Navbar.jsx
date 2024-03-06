import { useNavigate } from "react-router-dom"

const Navbar = () =>
{
    const navigate = useNavigate()

    const onPlaylistClicked = () =>
    {

    }

    const onPracticeClicked = () =>
    {

    }

    const onLogoutClicked = () =>
    {

    }

    const onExercisesClicked = () =>
    {
        navigate("/exercises")
    }

    return <div className="fixed w-32 
    flex flex-col">
        <button onClick={onPlaylistClicked}>Playlist</button>
        <button onClick={onPracticeClicked}>Practice</button>
        <button onClick={onLogoutClicked}>Logout</button>
        <button onClick={onExercisesClicked}>Exercises</button>
    </div>
}

export default Navbar