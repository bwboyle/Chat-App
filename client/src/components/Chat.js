import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

export default function Chat({ user, messages }) {
   const [message, setMessage] = useState('');

   const sendMessage = () => {
      console.log(message);
      if (message.trim()) {
         const displayName = user.displayName;
         const newMessage = { displayName, message };
         socket.emit('sendMessage', newMessage);
         setMessage('');
         console.log('Message sent')
      }
   }

   return (
      <Box
         display='flex'
         flexDirection='column'
         justifyContent='center'
         p={4}
      >
         {/* Chat history */}
         <Box sx={{ marginBottom: '20px' }}>
            {messages.map((msg, index) => (
               <Box key={index}>
                  <strong>{msg.displayName}</strong>: {msg.message}
               </Box>
            ))}
         </Box>
         {/* Message input */}
         <TextField
            label='Type a message...'
            variant='outlined'
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
      // <div>
      //    {/* Chat history */}
      //    <div>
      //       {messages.map((msg, index) => (
      //          <div key={index}>
      //             <strong>{msg.displayName}</strong>: {msg.message}
      //          </div>
      //       ))}
      //    </div>

      //    {/* Message input */}
      //    <input
      //       value={message}
      //       onChange={(e) => setMessage(e.target.value)}
      //       onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
      //       placeholder='Type a message...'
      //    />
      //    <button onClick={sendMessage}>Send</button>
      // </div>
   )
}
