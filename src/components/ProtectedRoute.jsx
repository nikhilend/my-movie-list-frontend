import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
 
  const user = useSelector(store => store.user)

  if(!user.isAuthChecked) {
     return <div>Checking authentication...</div>;
  }

  if (!user.isAuthenticated)
  return <Navigate to='/login'/>

  return children;
}

export default ProtectedRoute