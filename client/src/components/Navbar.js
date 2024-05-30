import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Navbar({ onLogout, onThemeChange, isDarkMode }) {

   const handleLogout = () => { onLogout(); }

   const handleThemeChange = () => { onThemeChange(); }

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static" elevation={0} sx={{ borderBottom: 'none' }}>
            <Toolbar>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '12px' }}>
                  Chat App
               </Typography>
               <IconButton color='inherit' onClick={handleThemeChange}>
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
               </IconButton>
               <IconButton color='inherit' onClick={handleLogout}>
                  <LogoutIcon />
               </IconButton>
            </Toolbar>
         </AppBar>
      </Box>
   );
}
