import { useEffect } from 'react'
import './App.css'
import Footer from './components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FETCH_URL } from './utils/constants.js';
import { loginUser, logoutUser } from './utils/userSlice.js';


function App() {
  const dispatch = useDispatch()
  
  useEffect(()=> {
    authUser();
  },[])


  async function authUser() {

    const res = await fetch(FETCH_URL + '/user/authenticate', {method: 'GET', credentials: "include"})

    if(!res.ok) {
      dispatch(logoutUser())
    }
    else {
      dispatch(loginUser())
    }
  }

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default App
