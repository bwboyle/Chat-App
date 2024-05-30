import React from 'react'
import { Box, Avatar, Typography } from '@mui/material';
import Moment from 'react-moment';

export default function MessageBox({ msg, user }) {
   const timestamp = msg.timestamp ?? new Date();

   return (
      <Box sx={{
         display: 'flex',
         flexDirection: msg.user.googleId === user.googleId ? 'row' : 'row-reverse',
         alignItems: 'center',
         alignSelf: msg.user.googleId === user.googleId ? 'flex-end' : 'flex-start',
         flexGrow: 0,
         maxWidth: '80%',
         padding: '12px',
         borderRadius: 5,
         marginBottom: '20px',
         bgcolor: msg.user.googleId === user.googleId ? 'primary.main' : 'secondary.main',
         color: msg.user.googleId === user.googleId ? 'white' : 'default'
      }}>
         <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            marginX: '12px',
         }}>
            <Typography
               variant="subtitle1"
               component="div"
            >
               {msg.message}
            </Typography>
            <Typography
               variant="caption"
               component="div"
               sx={{ color: msg.user.googleId === user.googleId ? 'grey.300' : 'default' }}
            >
               <Moment format="MMMM Do, h:mm a">{timestamp}</Moment>
            </Typography>
         </Box>
         <Avatar
            alt={msg.user.dislayName}
            src={msg.user.photoURL}
            sx={{ width: 32, height: 32 }}
         />
      </Box >
   )
}
