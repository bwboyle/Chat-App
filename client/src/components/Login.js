import React from 'react'
import { Button, Box, Typography } from '@mui/material';
import { GoogleLoginButton } from 'react-social-login-buttons';

export default function Login() {
   const handleLogin = () => {
      // Navigate to Google Auth Page
      window.location.href = 'http://localhost:8080/api/auth/google';
   }

   return (
      <Box sx={{
         display: 'flex',
         flexDirection: 'column',
         height: '92vh',
         width: '100vw'
      }}>
         <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
         }}>
            <Typography variant="h4" component="div">
               Welcome to Chat App!
            </Typography>
            <Typography variant="subtitle1" component="div">
               To start chatting, please log in with your Google account.
            </Typography>
            <Box>
               <GoogleLoginButton
                  onClick={handleLogin}
               />
            </Box>
         </Box>
         <Box sx={{
            display: 'flex',
            flexGrow: 1,
            backgroundImage: "url('/Wave.svg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
         }} />
      </Box>
   )
}
