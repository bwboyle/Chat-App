import React from 'react'
import { Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
   const handleLogin = () => {
      window.location.href = 'http://localhost:8080/auth/google';
   }

   return (
      <Box
         height="90vh"
         display="flex"
         alignItems="center"
         justifyContent="center"
      >
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
