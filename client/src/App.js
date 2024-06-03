import React, { useState, useEffect } from 'react'
import Chat from './components/Chat'
import Login from './components/Login';
import Navbar from './components/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';

import { useSelector, useDispatch } from 'react-redux'
import { login, update, updateUser } from './features/authSlice';

export default function App() {
   const user = useSelector((state) => state.auth.user);
   const dispatch = useDispatch();

   useEffect(() => {
      const fetchUser = async () => {
         await fetch('http://localhost:8080/api/auth/user', {
            method: 'GET',
            credentials: 'include'
         })
            .then(res => res.json())
            .then(data => dispatch(login(data.user)))
            .catch(err => console.error(err))
      };
      fetchUser();
   }, [])

   console.log(user);

   return (
      <ThemeProvider theme={darkTheme}>
         <CssBaseline />
         {!user ? <Login /> :
            <>
               <Navbar
                  onLogout={() => console.log('logout')}
                  onThemeChange={() => console.log('toggle')}
                  isDarkMode={true}
               />
               <Chat user={user} />
            </>
         }
      </ThemeProvider>
   )
}
