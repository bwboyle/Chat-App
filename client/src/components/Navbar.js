import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice';

export default function Navbar() {
   const dispatch = useDispatch();

   const handleLogout = async () => {
      await fetch('http://localhost:8080/api/auth/logout', {
         method: 'POST',
         credentials: 'include'
      })
         .then((res) => {
            if (res.status === 200) dispatch(logout());
         })
         .catch((err) => console.error(err));

   }
   const handleThemeChange = () => { console.log('toggle'); }

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static" elevation={0} sx={{ borderBottom: 'none' }}>
            <Toolbar>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '12px' }}>
                  Chat App
               </Typography>
               <IconButton color='inherit' onClick={handleThemeChange}>
                  {<DarkModeIcon />}
               </IconButton>
               <IconButton color='inherit' onClick={handleLogout}>
                  <LogoutIcon />
               </IconButton>
            </Toolbar>
         </AppBar>
      </Box>
   );
}
