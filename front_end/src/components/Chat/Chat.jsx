import React, { useState, useEffect, useRef } from 'react';
import './Chat.css'; // Import a CSS file for styling
import {ArrowLeftIcon} from '@heroicons/react/24/outline';

const Chat = ({ onClose, goBack }) => {
  const [inputText, setInputText] = useState('');
  const [userId, setUserId] = useState('');
  const [messages, setMessages] = useState([
    { user_id: 'Me', text: 'worst group ever', isSent: true },
    { user_id: 'Danny', text: 'what group!?', isSent: false },
    { user_id: 'Me', text: 'You know *******', isSent: true },
    { user_id: 'Danny', text: 'o shoot, them???', isSent: false },
  ]);
  const chatContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const sendMessage = { user_id: "Me", text: inputText, isSent: true };
      setMessages([...messages, sendMessage]);
      setInputText('');
      // Simulate a received message after a short delay
//       setTimeout(() => {
//         setMessages([...messages, sendMessage, { user_id: userId, text: 'Received: ' + inputText, isSent: false }]);
//       }, 500);
    }
  };

  useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [messages]);

  const handleEnterKey = (e) => {
    if (e.key === "Enter"){
        handleSendMessage();
    }
  };

  // Function to calculate the approximate visual width of a text string
  const calculateTextWidth = (text) => {
    const elem = document.createElement('span');
    elem.style.visibility = 'hidden';
    elem.style.position = 'absolute';
    elem.style.whiteSpace = 'pre';

    // Replace spaces with a non-breaking space to preserve multiple spaces
    elem.innerText = text.replace(/ /g, '\u00A0');

    document.body.appendChild(elem);
    const width = elem.offsetWidth;
    document.body.removeChild(elem);

    return width;
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span className="flex alignItems-center" onClick={goBack}>
            <ArrowLeftIcon className="h-6 w-6"/>
             PM Rulers
        </span>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.isSent ? 'sent' : 'received'}`}
            style={{width: `${calculateTextWidth(message.text) + 50}px`}}>
            {message.isSent ? (
              <div className="message-sent">
                  <span className="user-info">
                    <span className="user-id sender">{message.user_id}</span>
                  </span>
                  <span className="message-text-sent">{message.text}</span>
                </div>
            ) : (
               <div className="message-received">
                  <span className="user-info">
                    <span className="user-id">{message.user_id}</span>
                  </span>
                  <span className="message-text-received">{message.text}</span>
                </div>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleEnterKey}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
