import React from 'react'
import { Button, Box, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import { GoogleLogin } from '@react-oauth/google';

import { useDispatch } from 'react-redux'
import { login } from '../features/authSlice';

export default function Login() {
   const dispatch = useDispatch();

   const getUser = async (token) => {
      await fetch('http://localhost:8080/api/auth/current_user', {
         method: 'GET',
         headers: { Authorization: `Bearer ${token}` }
      })
         .then(res => res.json())
         .then(data => dispatch(login(data)))
         .catch(err => console.error(err));
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
         <GoogleLogin
            onSuccess={(res) => { getUser(res.credential) }}
            onError={() => console.error('Login failed')}
            shape='pill'
         />
         {/* <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            size="large"
            onClick={handleLogin}
         >
            Continue with Google
         </Button> */}
      </Box>
   )
}
