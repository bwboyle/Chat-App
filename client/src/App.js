import React, { useState, useEffect } from 'react'
import Chat from './components/Chat'
import Login from './components/Login';
import Navbar from './components/Navbar';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

export default function App() {
   const [user, setUser] = useState(null);
   const [messages, setMessages] = useState([]);

   const fetchUser = async () => {
      await fetch('http://localhost:8080/auth/current_user', {
         method: 'GET',
         credentials: 'include'
      })
         .then(res => res.json())
         .then(data => {
            setUser(data);
         })
         .catch(error => console.log(error));
   }

   useEffect(() => {
      fetchUser();
      socket.on('chatHistory', (chatHistory) => {
         setMessages(chatHistory)
      });

      socket.on('receiveMessage', (message) => {
         setMessages(prevMessages => [...prevMessages, message]);
      });

      return () => {
         socket.off('chatHistory');
         socket.off('receiveMessage');
      }
   }, []);

   if (!user) {
      return <Login />
   }

   const handleLogout = async () => {
      await fetch('http://localhost:8080/auth/logout', {
         method: 'GET',
         credentials: 'include'
      })
         .then(res => setUser(null))
         .catch(error => console.log(error));
   }


   return (
      <div>
         <Navbar onLogout={handleLogout} />
         <Chat user={user} messages={messages} />

         {/* <p>Logged in as {user.displayName}</p>
         <button onClick={handleLogout}>Logout</button> */}
      </div>
   )
}
