import {  createContext } from 'react'
import {Route, Routes} from "react-router-dom"
import axios from "axios"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Login } from './Screens/Login'
import { Register } from './Screens/Register'
// import { UserDetails } from './Screens/UserDetails'
import { Home } from './Screens/Home'
import { FetchingDataTest } from './Screens/PostProject'
import { ProjectDetails } from './Screens/projectDetails'




export const App = () =>
 {
  return (
    <>
    <Routes>
      <Route path='/' element={ <Home />} />
      <Route path='login' element={ <Login />} />
      <Route path='register' element={ <Register />} />
      <Route path='posts' element={ <FetchingDataTest />} />
      <Route path='/Projects/:projectId' element={ <ProjectDetails />} />
    </Routes>
    </>
  )
}

export default App
