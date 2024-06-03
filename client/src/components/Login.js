import React from 'react'
import { Button, Box, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
   const handleLogin = () => {
      // Navigate to Google Auth Page
      window.location.href = 'http://localhost:8080/api/auth/google';
   }

   return (
      <Box sx={{
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         height: '100vh',
         width: '100vw',
         backgroundImage: "url('/images/background.jpg')",
      }}>
         <Typography variant="h4" component="div" color='white' mb={4}>
            Welcome to Chat App!
         </Typography>
         {/* <Typography variant="subtitle1" component="div" p={4} color='white'>
            To start chatting, please log in with your Google account.
         </Typography> */}
         <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            size="large"
            onClick={handleLogin}
         >
            Continue with Google
         </Button>
      </Box>
   )
}
