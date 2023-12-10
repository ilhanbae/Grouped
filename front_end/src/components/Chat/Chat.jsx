import React, { useState, useEffect, useRef } from 'react';
import './Chat.css'; // Import a CSS file for styling
import {ArrowLeftIcon} from '@heroicons/react/24/outline';
import moment from "moment";
import axios from "axios";

const Chat = ({ onClose, goBack, selectedGroup }) => {
  const [inputText, setInputText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [charCount, setCharCount] = useState(255);

  // Fetch chat every second
  useEffect(() => {
    loadChatMessages();
    // Set up a polling mechanism to load chat every second
    const intervalId = setInterval(() => {
      loadChatMessages();
      // console.log("reloading");
    }, 1000);

    // Clean up the interval
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // useEffect(() => {
  //   loadChatMessages();
  // }, []);

  const loadChatMessages = async () => {
    // setIsLoaded(false);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/messages.php`, {
        params: {
          group_id: selectedGroup.id,
        },
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        const formattedMessages = response.data.map((message) => ({
          ...message,
          text: message.message,
          timestamp: moment(message.timestamp).toDate(),
        }));

        setMessages(formattedMessages);
      })
      .catch((error) => console.error(error));
    // setIsLoaded(true);
  };

  // Send message
  const sendChatMessage = async () => {
    if (inputText.trim() !== "") {
      const data = {
        user_id: sessionStorage.getItem("id"),
        group_id: selectedGroup.id,
        username: sessionStorage.getItem("username"),
        message: inputText,
      };

      await axios
        .post(`${process.env.REACT_APP_API_URL}/messages.php`, data, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });

      // Reset input text
      setInputText("");
    }
  };

  // Scroll down to latest chat message if message updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages.length]);

  // Send chat message on enter key
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      sendChatMessage();
      setCharCount(255);
    }
  };

  // Update input text when chat input change
  const handleInputChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= 255) {
        setInputText(e.target.value);
        setCharCount(255-newText.length);
    }
  };

  // Function to calculate the approximate visual width of a text string
  const calculateTextWidth = (text) => {
    const elem = document.createElement("span");
    elem.style.visibility = "hidden";
    elem.style.position = "absolute";
    elem.style.whiteSpace = "pre-wrap";

    // Replace spaces with a non-breaking space to preserve multiple spaces
    elem.innerText = text.replace(/ /g, "\u00A0");

    document.body.appendChild(elem);
    const width = elem.offsetWidth;
    document.body.removeChild(elem);

    return width;
  };

  const formatTimestamp = (timestamp) => {
    const options = {
        weekday:'short',
        month: "short",
        day: "numeric",
        year: 'numeric',
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(timestamp);
  };

  const shouldDisplayUserInfo = (message, index) => {
    if (index === 0) {
      // Always display user info and timestamp for the first message
      return { displayUsername: true, displayTimestamp: true };
    }

    const prevMessage = messages[index - 1];

    // Check if the username should be displayed
    const shouldDisplayUsername = message.username !== prevMessage.username;

    // Check if the timestamp should be displayed (if the messages are from different senders)
    const shouldDisplayTimestamp =
      // shouldDisplayUsername ||
      message.timestamp - prevMessage.timestamp > 180000;

    // If the timestamp difference is less than 3 minutes, don't display timestamp
    const displayTimestamp =
      // shouldDisplayTimestamp &&
      message.timestamp - prevMessage.timestamp > 180000;

    return {
      displayUsername: shouldDisplayUsername,
      displayTimestamp: shouldDisplayTimestamp,
    };
  };

  // Check if message is mine
  const isMyMessage = (message) =>
    message.user_id === parseInt(sessionStorage.getItem("id"));

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <span className="flex items-center" onClick={goBack}>
          <ArrowLeftIcon className="h-6 w-6" />
          {selectedGroup.title}
        </span>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      {/* Chat messages */}
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((message, index) => {
          const { displayUsername, displayTimestamp } = shouldDisplayUserInfo(
            message,
            index
          );

          return (
            <div
              key={index}
              className={`chat-message ${
                isMyMessage(message) ? "sent" : "received"
              }
                ${
                  !shouldDisplayUserInfo(message, index)
                    ? "compact-message"
                    : ""
                }`}
            >
              {isMyMessage(message) ? (
                <div className="message-sent">
                  <span className="user-info">
                    <span className="user-id sender">
                      {displayUsername && message.username}
                    </span>
                  </span>
                  <span
                    className="message-text-sent"
                    style={{
                      width: `${calculateTextWidth(message.text) + 20}px`,
                    }}
                  >
                    {message.text}
                  </span>
                  <span className="timestamp sender">
                    {displayTimestamp && formatTimestamp(message.timestamp)}
                  </span>
                </div>
              ) : (
                <div className="message-received">
                  <span className="user-info">
                    <span className="user-id">
                      {displayUsername && message.username}
                    </span>
                  </span>
                  <span
                    className="message-text-received"
                    style={{
                      width: `${calculateTextWidth(message.text) + 20}px`,
                    }}
                  >
                    {message.text}
                  </span>
                  <span className="timestamp">
                    {displayTimestamp && formatTimestamp(message.timestamp)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Chat input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleEnterKey}
        />
        <div className="char-count mr-1">{charCount} chars </div>
        <button onClick={sendChatMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;