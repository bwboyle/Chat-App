import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
import MessageBox from './MessageBox';

const socket = io('http://localhost:8080');

export default function Chat({ user, messages }) {
   const [message, setMessage] = useState('');
   const ref = useRef(null);

   // Automatically scroll to bottom of chat list
   useEffect(() => {
      const container = ref.current;
      if (container && messages.length > 0) {
         container.scrollTop = container.scrollHeight;
      }
   }, [messages])


   const sendMessage = () => {
      if (message.trim()) {
         socket.emit('sendMessage', { user, message });
         setMessage('');
      }
   }

   return (
      <Box sx={{
         margin: '12px'
      }}>

         {/* Chat history */}
         <Box
            ref={ref}
            sx={{
               display: 'flex',
               flexDirection: 'column',
               height: '70vh',
               overflowY: 'auto',
               marginY: '40px',
            }}
         >
            {messages.map((msg, index) => (
               <MessageBox key={index} msg={msg} user={user} />
            ))}
         </Box>

         {/* Message input */}
         <TextField
            label='Type a message...'
            variant='outlined'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
            InputProps={{
               endAdornment: (
                  <InputAdornment position='end'>
                     <IconButton color='primary' onClick={sendMessage}>
                        <SendIcon />
                     </IconButton>
                  </InputAdornment>
               )
            }}
         />
      </Box>
   )
}
