import './App.css'
import './index.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Exercises from './pages/Exercises'
import Navbar from './components/Navbar/Navbar'
import CreateExercise from './pages/CreateExercise'
import EditExercise from './pages/EditExercise'
import CheckUserIsAuthor from './CheckuserIsAuthor'
import Login from './pages/Login'
import { useEffect, useState } from 'react'
import AppViews from './AppViews'
import Authorized from './Authorized'

function App()
{

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="*" element={
        <Authorized>
          <AppViews />
        </Authorized>
      } />
    </Routes>
  )
}

export default App
