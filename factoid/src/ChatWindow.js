import React, { useState, useContext } from 'react';
import MessageList from './MessageList';
import InputBar from './InputBar';
import './ChatWindow.css'; // Make sure to have this CSS file
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const fetchChatCompletion = async (userInput) => {
    const OPENAI_API_KEY = process.env.SECRET_KEY; // Store API key securely
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
          { role: "user", content: userInput },
          {role: "system", content: "Your name is Factoid, a helpful assistant designed to teach high school students about personal finance. You should not deviate from your goal."}
        ],
          temperature: 0.7
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data["choices"][0]["message"]["content"]; // Process the response as needed
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; // Handle the error appropriately
    }
  };

  
const ChatWindow = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [messages, setMessages] = useState([]);

    const sendMessage = async (message) => {
        setMessages([...messages, { text: message, sender: 'user' }]);
        // Fetch response from the API
        const botResponse = await fetchChatCompletion(message);
        console.log(botResponse);
        setMessages(messages => [...messages, { text: botResponse, sender: 'bot' }]);
        // Chatbot response logic goes here
    };

    return (
        <div className={`chat-window card shadow ${theme}`}>
            <div className="card-header">
                <h4>Ask us personal finance questions!</h4>
                <button onClick={toggleTheme} className="theme-toggle-btn">
                    Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
            </div>

            <div className="card-body p-3" style={{ height: '500px', overflowY: 'auto' }}>
                <MessageList messages={messages} />
            </div>
            <div className="card-footer bg-white">
                <InputBar onSend={sendMessage} />
            </div>
        </div>
    );
};

export default ChatWindow;
