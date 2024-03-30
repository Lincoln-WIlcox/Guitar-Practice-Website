import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Navbar = () =>
{
    const [expanded, setExpanded] = useState(false)

    const navigate = useNavigate()

    const onPlaylistClicked = () =>
    {
        navigate("/playlist")
    }

    const onPracticeClicked = () =>
    {
        navigate("/practice")
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

    const onExpandClicked = () =>
    {
        setExpanded(!expanded)
    }

    const translateClass = expanded ? "-translate-x-36" : ""

    return <div className="fixed w-32 
    flex flex-col z-10">
        <div className={`bg-stone-800 w-full h-screen absolute my-shadow-light 
        bg-stone-800 my-border border-0 border-r-2
        ${translateClass} transition pointer-events-none`} />
        <button className="m-3 w-fit z-10" onClick={onExpandClicked}><i className="fa fa-bars" aria-hidden="true"></i></button>
        <div className={`w-full
    flex flex-col top-2 
    ${translateClass}
    transition`}>
            <button className="my-button my-shadow-light m-2 p-1" onClick={onPlaylistClicked}>Playlist</button>
            <button className="my-button my-shadow-light m-2 p-1" onClick={onPracticeClicked}>Practice</button>
            <button className="my-button my-shadow-light m-2 p-1" onClick={onLogoutClicked}>Logout</button>
            <button className="my-button my-shadow-light m-2 p-1" onClick={onExercisesClicked}>Exercises</button>
        </div>
    </div>
}

export default Navbar