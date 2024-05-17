import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

export default function Chat() {
   const [message, setMessage] = useState('');
   const [messages, setMessages] = useState([]);
   const [username, setUsername] = useState('');


   useEffect(() => {
      // const user = window.prompt('Enter your username');
      setUsername('test_user');

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
   }, []);

   const sendMessage = () => {
      if (message.trim()) {
         const newMessage = { username, message };
         socket.emit('sendMessage', newMessage);
         setMessage('');
      }
   };

   return (
      <div>
         {/* Chat history */}
         <div>
            {messages.map((msg, index) => (
               <div key={index}>
                  <strong>{msg.username}</strong>: {msg.message}
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
