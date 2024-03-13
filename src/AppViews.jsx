import { Outlet, Route, Routes } from "react-router-dom"
import Exercises from "./pages/Exercises"
import CreateExercise from "./pages/CreateExercise"
import CheckUserIsAuthor from "./CheckuserIsAuthor"
import EditExercise from "./pages/EditExercise"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home"

const AppViews = () =>
{
    return <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={
            <>
                <Navbar />
                <Outlet />
            </>
        }>
            <Route path="exercises" element={<Exercises />} />
            <Route path="create-exercise" element={<CreateExercise />} />
            <Route path="edit-exercise">
                <Route path=":exerciseId" element={
                    <CheckUserIsAuthor>
                        <EditExercise />
                    </CheckUserIsAuthor>
                } />
            </Route>
        </Route>
    </Routes>
}

export default AppViews