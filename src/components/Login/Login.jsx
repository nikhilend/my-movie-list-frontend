import React, { useEffect, useState } from 'react'
import '../../utils/Utility.css'
import './Login.css'
import { FETCH_URL } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../../utils/userSlice'

const Login = () => {

 const [email, setEmail] = useState("test-user@gmail.com")
 const [password, setPassword] = useState("test123")
 const [rememberMe, setRememberMe] = useState(false)
 const [isError, setIsError] = useState(false)
 const [errorMessage, setErrorMessage] = useState("")
 const navigate = useNavigate();
 const dispatch = useDispatch()
 const isAuthenticated = useSelector(store => store.user.isAuthenticated)

 useEffect(() => {
    if(isAuthenticated) {
        navigate("/feed")
    }
 },[]) 

 async function handleLogin() {
    try{
        // request for login
        const res = await fetch(FETCH_URL + "/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username : email, password : password, rememberMe: rememberMe}),
            credentials: 'include'
            });

        const result = await res.json();

        if(res.status === 200) {

            dispatch(loginUser())
            navigate("/feed")
        }
        else {
            throw result.message
        }
    }
    catch(e) {
        setErrorMessage(e)
        setIsError(true)
        console.log("error: " + e)
    }
    
 }
 
  return (
    <>
            <div className='container container-center'>
        <div className='login-wrapper'>
            <h1 className='signin-title'>Sign In</h1>
            <form className='login-container' onSubmit={(e)=> {e.preventDefault()}}>
                <input 
                type="email" 
                placeholder="Email" 
                className={"input-field width-full" + (isError? " input-field-error" : "")}
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="Password" 
                className={"input-field width-full" + (isError? " input-field-error" : "")}
                value={password}
                onChange={e => setPassword(e.target.value)}
                />

                <div className="remember-me-container">
                    <input type="checkbox" 
                           id="remember-me" 
                           className="checkbox-input"
                           value={rememberMe}
                           onChange={e => setRememberMe(e.target.value)}
                            />
                    <label htmlFor="remember-me" className="checkbox-label">
                        Remember me

                    </label>
                </div>
                {isError && <p className='error-message'>ERROR : {errorMessage}</p>}
                <button onClick={handleLogin} className='btn btn-primary width-full'>Login</button>
            </form>
        </div>
    </div>
    </>

  )
}

export default Login