import { useNavigate } from "react-router-dom"

const Navbar = () =>
{
    const navigate = useNavigate()

    const onPlaylistClicked = () =>
    {
        navigate("/playlist")
    }

    const onPracticeClicked = () =>
    {

    }

    const onLogoutClicked = () =>
    {
        localStorage.removeItem('guitar-practicer-user')
        navigate("/login")
    }

    const onExercisesClicked = () =>
    {
        navigate("/exercises")
    }

    return <div className="fixed w-32 
    flex flex-col top-2">
        <button onClick={onPlaylistClicked}>Playlist</button>
        <button onClick={onPracticeClicked}>Practice</button>
        <button onClick={onLogoutClicked}>Logout</button>
        <button onClick={onExercisesClicked}>Exercises</button>
    </div>
}

export default Navbar