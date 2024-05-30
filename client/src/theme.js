import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
   palette: {
      mode: 'light',
      primary: {
         main: '#665AB2',
      },
      secondary: {
         main: '#DDDDDD',
      },
      warning: {
         main: '#ff9800',
      },
      error: {
         main: '#ef233c',
      },
   },
});

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
      primary: {
         main: '#665AB2',
      },
      secondary: {
         main: '#303030',
      },
      warning: {
         main: '#ff9800',
      },
      error: {
         main: '#ef233c',
      },
   },
});

export { lightTheme, darkTheme };