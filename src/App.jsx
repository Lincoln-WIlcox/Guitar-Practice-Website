import './App.css'
import './index.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Exercises from './pages/Exercises'
import Navbar from './components/Navbar/Navbar'
import CreateExercise from './pages/CreateExercise'
import EditExercise from './pages/EditExercise'
import CheckUserIsAuthor from './CheckuserIsAuthor'

function App()
{
  return (
    <Routes>
      <Route path="/">
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
      </Route>
    </Routes>
  )
}

export default App
