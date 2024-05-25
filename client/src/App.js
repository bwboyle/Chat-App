import React, { useState, useEffect } from 'react'
import Chat from './components/Chat'
import Login from './components/Login';

export default function App() {
   const [user, setUser] = useState(null);

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
   }, []);

   if (!user) {
      return <Login />
   }


   return (
      <div>
         <Chat user={user} />

         <p>Logged in as {user.displayName}</p>
      </div>
   )
}
