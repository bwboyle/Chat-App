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
   const [messages, setMessages] = useState([]);

   useEffect(() => {
      const fetchUser = async () => {
         await fetch('http://localhost:8080/api/auth/user', {
            method: 'GET',
            credentials: 'include'
         })
            .then(res => res.json())
            .then(data => dispatch(login(data)))
            .catch(err => console.error(err))
      };
      fetchUser();
   }, [])


   // // Theme state
   // const savedTheme = localStorage.getItem('theme') === 'dark';
   // const [isDarkMode, setIsDarkMode] = useState(savedTheme);

   // const fetchUser = async () => {
   //    await fetch('http://localhost:8080/auth/current_user', {
   //       method: 'GET',
   //       credentials: 'include'
   //    })
   //       .then(res => res.json())
   //       .then(data => console.log(data))
   //       .catch(error => console.log(error));
   // }

   // const handleThemeChange = () => {
   //    setIsDarkMode(!isDarkMode);
   //    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
   // };

   // const handleLogout = async () => {
   //    await fetch('http://localhost:8080/auth/logout', {
   //       method: 'GET',
   //       credentials: 'include'
   //    })
   //       .then(res => setUser(null))
   //       .catch(error => console.log(error));
   // }

   // useEffect(() => {
   //    fetchUser();
   //    socket.on('chatHistory', (chatHistory) => {
   //       console.log(chatHistory);
   //       setMessages(chatHistory);
   //    });

   //    socket.on('receiveMessage', (message) => {
   //       setMessages(prevMessages => [...prevMessages, message]);
   //    });

   //    return () => {
   //       socket.off('chatHistory');
   //       socket.off('receiveMessage');
   //    }
   // }, []);


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
               <Chat user={user} messages={messages} />
            </>
         }
      </ThemeProvider>
   )
}
