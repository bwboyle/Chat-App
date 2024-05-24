import React, { useState, useEffect } from 'react'
import Chat from './components/Chat'
import Login from './components/Login';

export default function App() {
   const [user, setUser] = useState(null);

   useEffect(() => {

   }, []);

   if (!user) {
      return <Login />
   }

   const handleLogout = async () => {

   }

   return (
      <div>
         <Chat />
         <br />
         <p>Logged in as {user.email}</p>
         <button onClick={handleLogout}>Log out</button>
      </div>
   )
}
