import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import io from 'socket.io-client';
import MessageBox from './MessageBox';

import { useSelector, useDispatch } from 'react-redux'
import { setMessages, addMessage } from '../features/chatSlice';

const socket = io('http://localhost:8080');

export default function Chat() {
   const user = useSelector((state) => state.auth.user);
   const messages = useSelector((state) => state.chat.messages);
   const dispatch = useDispatch();

   const [message, setMessage] = useState('');
   const ref = useRef(null);

   useEffect(() => {
      // Scroll to bottom of message container
      const container = ref.current;
      if (container && messages.length > 0) {
         container.scrollTop = container.scrollHeight;
      }
   }, [messages])


   useEffect(() => {
      const fetchMessages = async () => {
         await fetch('http://localhost:8080/api/messages/all', {
            method: 'GET',
            credentials: 'include'
         })
            .then((res) => res.json())
            .then((data) => {
               dispatch(setMessages(data.messages));
            })
            .catch((err) => console.error(err));
      };
      fetchMessages();

      socket.on('receiveMessage', (message) => {
         dispatch(addMessage(message));
      });

      return () => {
         socket.off('receiveMessage')
      }
   }, []);


   const sendMessage = async () => {
      if (message.trim()) {
         socket.emit('sendMessage', { user, message });
         // scrollToBottom();
      }
      setMessage('')
   }

   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden',
            height: '90vh',
            mx: 4
         }}>

         {/* Chat history */}
         < Box
            ref={ref}
            sx={{
               display: 'flex',
               flexDirection: 'column',
               flexGrow: 1,
               overflowY: 'scroll',
               '::-webkit-scrollbar': { // Hide scrollbar
                  display: 'none',
               },
               msOverflowStyle: 'none',  // IE and Edge
               scrollbarWidth: 'none',   // Firefox
               my: 2
            }}
         >
            {
               messages.map((msg, index) => (
                  <MessageBox key={index} msg={msg} user={user} />
               ))
            }
         </Box >

         {/* Message input */}
         <Box sx={{ flexGrow: 1 }}>
            < TextField
               label='Type a message...'
               variant='filled'
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
               InputProps={{
                  endAdornment: (
                     <>
                        <InputAdornment position='end'>
                           <IconButton>
                              <AttachFileIcon />
                           </IconButton>
                        </InputAdornment>
                        <InputAdornment position='end'>
                           <IconButton onClick={sendMessage}>
                              <SendIcon />
                           </IconButton>
                        </InputAdornment>
                     </>
                  ),
                  disableUnderline: true,
                  sx: {
                     borderRadius: '20px',  // Adjust the value as needed
                  },
               }}
               sx={{ borderRadius: '20px', mb: 2 }}
               fullWidth
            />
         </Box>
      </Box >
   )
}
