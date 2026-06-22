import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAnonym from './Components/HeaderAnonym'
import GameRules from './Components/GameRules';
import {Routes,Route} from 'react-router'
import { useState } from 'react';
import UserContext from './Context/UserContext';
import {useNavigate} from 'react-router';
import LoginForm from './Components/LoginForm';
import HeaderUser from './Components/HeaderUser';
import Userpage from './Components/Userpage';
import PlayPage from './Components/PlayPage';
import ScorePage from './Components/ScorePage';
import RankingPage from './Components/RankingPage';




function App() {
  
  const [user, setUser]= useState({id:undefined,email:undefined, name:undefined, surname:undefined})
  const navigate= useNavigate()

  function setTheUser(loggedUser) {
    if (!loggedUser) {
        setUser(null); 
    } else {
        setUser({
            id: loggedUser.id,
            email: loggedUser.email,
            name: loggedUser.name,
            surname: loggedUser.surname
        });
    }
}
  
  return (
    <>
    <UserContext.Provider value={user}>
        <Routes>

          <Route path='/' element={<HeaderAnonym/>}>
            <Route index element={<GameRules/>} />
            <Route path='login' element={<LoginForm setTheUser={setTheUser}/>}/>
          </Route> 

          <Route path='/userpage' element= {<HeaderUser setUser={setTheUser}/>}>
            <Route index element={<Userpage/>}/>
            <Route path='ranking' element={<RankingPage/>}/>
            <Route path='playgame'>
              <Route index element= {<PlayPage/>}/>
              <Route path='score/:segmentLength' element={<ScorePage />} />
            
          </Route>
          </Route>


        </Routes>


    </UserContext.Provider>
    </>
  )
}

export default App
