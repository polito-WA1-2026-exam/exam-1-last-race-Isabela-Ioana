//import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Routes,Route} from 'react-router'
import HeaderAnonym from './Components/HeaderAnonym'
import GameRules from './Components/GameRules';
import {Routes,Route} from 'react-router'
import { useState } from 'react';
import UserContext from './Context/UserContext';
import {useNavigate, Outlet} from 'react-router';
import LoginForm from './Components/LoginForm';
import HeaderUser from './Components/HeaderUser';
import Userpage from './Components/Userpage';
import PlayPage from './Components/PlayPage';





function App() {
  
  const [user, setUser]= useState({id:undefined,email:undefined, name:undefined, surname:undefined})
  const navigate= useNavigate()

  function setTheUser(user){
    setUser({id:user.id,email:user.email,name:user.name,surname:user.surname})
  }
  
  return (
    <>
    <UserContext.Provider value={user}>
        <Routes>

          <Route path='/' element={<HeaderAnonym/>}>
            <Route index element={<GameRules/>} />
            <Route path='login' element={<LoginForm setTheUser={setTheUser}/>}/>
          </Route> 

          <Route path='/userpage' element= {<HeaderUser/>}>
            <Route index element={<Userpage/>}/>
            <Route path='playgame' element={<PlayPage/>} />

          </Route>


        </Routes>


    </UserContext.Provider>
    </>
  )
}

export default App
