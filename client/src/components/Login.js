import React from 'react'

export default function Login() {
   const handleLogin = () => {
      window.location.href = 'http://localhost:8080/auth/google';
   }
   return (
      <div>
         <button onClick={handleLogin}>Sign in with Google</button>
      </div>
   )
}
