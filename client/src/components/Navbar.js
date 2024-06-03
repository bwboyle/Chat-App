import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/authSlice';
import Button from '@mui/material/Button';
import { Icon } from '@mui/material';

export default function Navbar({ onThemeChange, isDarkMode }) {
   const user = useSelector((state) => state.auth.user);
   const dispatch = useDispatch();

   const handleLogout = async () => {
      await fetch('http://localhost:8080/api/auth/logout', {
         method: 'POST',
         credentials: 'include'
      })
         .then((res) => {
            if (res.status === 200) {
               // Make sure dark theme is selected before logging out
               const savedTheme = localStorage.getItem('isDarkMode');
               const savedThemeIsDarkMode = savedTheme === 'true';
               if (savedTheme && !savedThemeIsDarkMode) {
                  handleThemeChange();
               }
               // Clear local store and log out of session
               localStorage.clear();
               dispatch(logout());
            }
         })
         .catch((err) => console.error(err));

   }
   const handleThemeChange = () => { onThemeChange(); }

   const ActionButton = ({ icon, onClick }) => {
      return (
         <IconButton
            size='large'
            color='inherit'
            edge='start'
            onClick={onClick}
            sx={{
               borderRadius: '50%',
               p: 2,
               mr: 2
            }}
         >
            {icon}
         </IconButton>
      );
   }

   return (
      <AppBar position='static'>
         <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
               Chat App
            </Typography>
            {user && <Box>
               <ActionButton
                  icon={isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  onClick={handleThemeChange}
               />
               <ActionButton
                  icon={<LogoutIcon />}
                  onClick={handleLogout}
               />
            </Box>}
         </Toolbar>
      </AppBar >
   );
}
