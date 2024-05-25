import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

export default function Chat({ user }) {
   const [message, setMessage] = useState('');
   const [messages, setMessages] = useState([]);

   const sendMessage = () => {
      if (message.trim()) {
         const displayName = user.displayName;
         const newMessage = { displayName, message };
         socket.emit('sendMessage', newMessage);
         setMessage('');
      }
   }

   useEffect(() => {
      socket.on('chatHistory', (chatHistory) => {
         setMessages(chatHistory)
      });

      socket.on('receiveMessage', (message) => {
         setMessages(prevMessages => [...prevMessages, message]);
      });

      return () => {
         socket.off('chatHistory');
         socket.off('receiveMessage');
      }
   }, [])


   return (
      <div>
         {/* Chat history */}
         <div>
            {messages.map((msg, index) => (
               <div key={index}>
                  <strong>{msg.displayName}</strong>: {msg.message}
               </div>
            ))}
         </div>

         {/* Message input */}
         <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
            placeholder='Type a message...'
         />
         <button onClick={sendMessage}>Send</button>
      </div>
   )
}
