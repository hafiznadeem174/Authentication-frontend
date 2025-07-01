import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler( {setAuthenicated}) {

   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      if(localStorage.getItem('token')){
        setAuthenicated(true);
        if(location.pathname === '/' || 
            location.pathname === '/login' ||
            location.pathname === '/signup' 
        ){
            navigate ('/home', { replace: false});
        }

      }
   },[location, navigate , setAuthenicated ])



  return (
   null
  )
}

export default RefreshHandler