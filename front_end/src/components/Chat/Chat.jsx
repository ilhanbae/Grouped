import React, { useState, useEffect, useRef } from 'react';
import './Chat.css'; // Import a CSS file for styling
import {ArrowLeftIcon} from '@heroicons/react/24/outline';

const Chat = ({ onClose, goBack }) => {
  const [inputText, setInputText] = useState('');
  const [userId, setUserId] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user_id: 'Me', text: 'worst group ever', isSent: true, currentTime: new Date() },
    { id: 2, user_id: 'Danny', text: 'what group!?', isSent: false, currentTime: new Date() },
    { id: 3, user_id: 'Me', text: 'You know *******', isSent: true, currentTime: new Date() },
    { id: 4, user_id: 'Danny', text: 'o shoot, them???', isSent: false, currentTime: new Date() },
  ]);
  const chatContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const sendMessage = {
        id: messages.length + 1,
        user_id: "Me",
        text: inputText,
        isSent: true,
        currentTime: new Date()
      };
      setMessages([...messages, sendMessage]);
      setInputText('');
      // Simulate a received message after a short delay
//       setTimeout(() => {
//         setMessages([...messages, sendMessage, { user_id: "Danny", text: 'Received: ' + inputText, isSent: false }]);
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
    elem.style.whiteSpace = 'pre-wrap';

    // Replace spaces with a non-breaking space to preserve multiple spaces
    elem.innerText = text.replace(/ /g, '\u00A0');

    document.body.appendChild(elem);
    const width = elem.offsetWidth;
    document.body.removeChild(elem);

    return width;
  };


  const formatTimestamp = (timestamp) => {
    const options = { hour: '2-digit', minute: '2-digit'};
    return new Intl.DateTimeFormat('en-US', options).format(timestamp);
  };

  const shouldDisplayUserInfo = (message, index) => {
    if (index === 0) {
      // Always display user info and timestamp for the first message
      return { displayUserId: true, displayTimestamp: true };
    }

    const prevMessage = messages[index - 1];

    // Check if the user_id should be displayed
    const shouldDisplayUserId = message.user_id !== prevMessage.user_id;

    // Check if the timestamp should be displayed (if the messages are from different senders)
    const shouldDisplayTimestamp =
      shouldDisplayUserId || (message.currentTime - prevMessage.currentTime) > 180000;

    // If the timestamp difference is less than 3 minutes, don't display timestamp
    const displayTimestamp =
      shouldDisplayTimestamp && (message.currentTime - prevMessage.currentTime) > 180000;

    return {
      displayUserId: shouldDisplayUserId,
      displayTimestamp: displayTimestamp,
    };
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span className="flex alignItems-center" onClick={goBack}>
          <ArrowLeftIcon className="h-6 w-6" />
          PM Rulers
        </span>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((message, index) => {
          const { displayUserId, displayTimestamp } = shouldDisplayUserInfo(message, index);
          return (
            <div
              key={index}
              className={`chat-message ${message.isSent ? 'sent' : 'received'}
                ${(!shouldDisplayUserInfo(message, index)) ? 'compact-message' : ''}`
              }
            >
              {message.isSent ? (
                <div className="message-sent">
                  <span className="user-info">
                    <span className="user-id sender">
                      {displayUserId && message.user_id}
                    </span>
                  </span>
                  <span className="message-text-sent"
                    style={{ width: `${calculateTextWidth(message.text) + 20}px` }}>
                    {message.text}
                  </span>
                  <span className="timestamp sender">
                    {displayTimestamp && formatTimestamp(message.currentTime)}
                  </span>
                </div>
              ) : (
                <div className="message-received">
                  <span className="user-info">
                    <span className="user-id">
                      {displayUserId && message.user_id}
                    </span>
                  </span>
                  <span className="message-text-received"
                    style={{ width: `${calculateTextWidth(message.text) + 20}px` }}>
                    {message.text}
                  </span>
                  <span className="timestamp">
                    {displayTimestamp && formatTimestamp(message.currentTime)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
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
