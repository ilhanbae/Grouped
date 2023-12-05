import React, { useState } from 'react';
import './Chat.css'; // Import a CSS file for styling

const Chat = ({ onClose }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello!', isSent: true },
    { text: 'Hi there!', isSent: false },
    { text: 'How are you?', isSent: true },
    { text: 'I\'m good, thanks!', isSent: false },
  ]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const sendMessage = { text: inputText, isSent: true };
      setMessages([...messages, sendMessage]);
      setInputText('');
      // Simulate a received message after a short delay
      setTimeout(() => {
        setMessages([...messages, sendMessage, { text: 'Received: ' + inputText, isSent: false }]);
      }, 500);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span>Chat</span>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.isSent ? 'sent' : 'received'}`}>
            {message.isSent ? (
              <div className="message-sent">
                <span className="message-text">{message.text}</span>
                <span className="profile-icon sent-icon float-right">👤</span>
              </div>
            ) : (
              <div className="message-received">
                <span className="profile-icon received-icon">👥</span>
                <span className="message-text">{message.text}</span>
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
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
