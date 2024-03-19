import { Outlet, Route, Routes } from "react-router-dom"
import Exercises from "./pages/Exercises/Exercises"
import CreateExercise from "./pages/CreateExercise/CreateExercise"
import CheckUserIsAuthor from "./CheckuserIsAuthor"
import EditExercise from "./pages/EditExercise/EditExercise"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import { useEffect, useState } from "react"
import { getUserById } from "./services/userService"
import Playlist from "./pages/Playlist/Playlist"

const AppViews = () =>
{
    const [currentUser, setCurrentUser] = useState({})

    useEffect(
        () =>
        {
            const unparsedUser = localStorage.getItem('guitar-practicer-user')
            const parsedUser = JSON.parse(unparsedUser)
            setCurrentUser(parsedUser)
        }, []
    )

    return <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="*" element={
            <>
                <Navbar />
                <Outlet />
            </>
        }>
            <Route path="exercises" element={<Exercises currentUser={currentUser} />} />
            <Route path="create-exercise" element={<CreateExercise currentUser={currentUser} />} />
            <Route path="edit-exercise">
                <Route path=":exerciseId" element={
                    <CheckUserIsAuthor currentUser={currentUser}>
                        <EditExercise currentUser={currentUser} />
                    </CheckUserIsAuthor>
                } />
            </Route>
            <Route path="playlist" element={<Playlist currentUser={currentUser} />} />
        </Route>
    </Routes>
}

export default AppViews