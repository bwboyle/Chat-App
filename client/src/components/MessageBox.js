import React from 'react'
import { Box, Avatar, Typography } from '@mui/material'

export default function MessageBox({ msg, user }) {
   const displayName = msg.user.displayName;
   const timestamp = msg.timestamp;

   console.log(timestamp);

   return (
      <Box sx={{
         display: 'flex',
         alignItems: 'center',
         alignSelf: msg.user.googleId === user.googleId ? 'flex-end' : 'flex-start',
         flexGrow: 0,
         maxWidth: '50%',
         padding: '12px',
         borderRadius: 5,
         marginBottom: '12px',
         bgcolor: msg.user.googleId === user.googleId ? 'primary.main' : 'grey.300',
      }}>
         <Avatar
            alt={msg.user.dislayName}
            src={msg.user.photoURL}
            sx={{ width: 32, height: 32 }}
         />
         <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '12px'
         }}>
            <Typography
               variant="subtitle1"
               component="div"
               sx={{ color: msg.user.googleId === user.googleId ? 'white' : 'black' }}
            >
               {msg.message}
            </Typography>
            <Typography
               variant="caption"
               component="div"
               sx={{ color: msg.user.googleId === user.googleId ? 'grey.300' : 'grey.700' }}
            >
               {displayName} • {timestamp ?? 'Just now'}
            </Typography>
         </Box>
      </Box >
   )
}
