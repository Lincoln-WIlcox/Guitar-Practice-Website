import { useNavigate } from "react-router-dom"
import "./Home.css"

const Home = ({ currentUser }) =>
{
    const navigate = useNavigate()

    const onPlaylistClicked = () =>
    {
        navigate("/playlist")
    }

    const onPracticeClicked = () =>
    {
        navigate("/practice")
    }

    const onExercisesClicked = () =>
    {
        navigate("/exercises")
    }

    const onStartPracticingClicked = () =>
    {

    }

    const onLogoutClicked = () =>
    {
        localStorage.removeItem('guitar-practicer-user')
        navigate("/login")
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center m-16">
                <h1>Welcome, {currentUser.username}</h1>
                <h2>Let's get practicing!</h2>
            </div>
            <div className="flex justify-around space-x-4">
                <button data-testid="navigate-start" onClick={onStartPracticingClicked}>Start Practicing</button>
                <button data-testid="navigate-playlist" onClick={onPlaylistClicked}>Playlist</button>
                <button data-testid="navigate-practice" onClick={onPracticeClicked}>Practice</button>
                <button data-testid="navigate-logout" onClick={onLogoutClicked}>Logout</button>
                <button data-testid="navigate-exercise" onClick={onExercisesClicked}>Exercises</button>
            </div>
        </div>
    )
}

export default Home