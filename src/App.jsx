import './App.css'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import AppViews from './AppViews'
import Authorized from './Authorized'
import CreateAccount from './pages/CreateAccount/CreateAccount'

function App()
{
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="create-account" element={<CreateAccount />} />
      <Route path="*" element={
        <Authorized>
          <AppViews />
        </Authorized>
      } />
    </Routes>
  )
}

export default App
