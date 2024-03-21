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
        navigate("/practice-exercises")
    }

    const onLogoutClicked = () =>
    {
        localStorage.removeItem('guitar-practicer-user')
        navigate("/login")
    }

    return (
        <div className="flex flex-col items-center w-screen h-screen justify-around">
            <div className="flex flex-col items-center m-20">
                <h1 className="text-4xl w-fit" >Welcome, {currentUser.username}</h1>
                <h2 className="text-3xl text-gray-300 mt-5 w-fit">Let's get practicing!</h2>
            </div>
            <div className="flex flex-col justify-evenly w-3/12 min-w-60 min-h-80 items-center 
            bg-stone-800  border-solid border-gray-300 border-2 my-shadow-dark">
                <button className="w-fit h-fit p-5 text-2xl m-2 
                border-solid border-gray-300 border-2 rounded-lg bg-violet-900 my-shadow-light" 
                data-testid="navigate-start" onClick={onStartPracticingClicked}>Start Practicing</button>
                <div className="w-11/12 flex flex-wrap justify-center m-2">
                    <button className="w-fit h-fit p-4 m-2 text-lg 
                    border-solid border-gray-300 border-2 rounded-lg bg-violet-900 my-shadow-light" 
                    data-testid="navigate-playlist" onClick={onPlaylistClicked}>Playlist</button>
                    <button className="w-fit h-fit p-4 m-2 text-lg 
                    border-solid border-gray-300 border-2 rounded-lg bg-violet-900 my-shadow-light" 
                    data-testid="navigate-practice" onClick={onPracticeClicked}>Practice</button>
                    <button className="w-fit h-fit p-4 m-2 text-lg 
                    border-solid border-gray-300 border-2 rounded-lg bg-violet-900 my-shadow-light" 
                    data-testid="navigate-logout" onClick={onLogoutClicked}>Logout</button>
                    <button className="w-fit h-fit p-4 m-2 text-lg 
                    border-solid border-gray-300 border-2 rounded-lg bg-violet-900 my-shadow-light" 
                    data-testid="navigate-exercise" onClick={onExercisesClicked}>Exercises</button>
                </div>
            </div>
        </div>
    )
}

export default Home