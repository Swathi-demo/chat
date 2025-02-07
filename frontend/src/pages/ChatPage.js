import React, { useState } from 'react';
import './ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateDynamicReply = (userMessage) => {
    // Analyze the user's message and generate a reply dynamically
    if (userMessage.toLowerCase().includes('how are you')) {
      return `I am fine, thank you! How can I assist you further?`;
    } else if (userMessage.toLowerCase().includes('hai') || userMessage.toLowerCase().includes('hello')) {
      return `Hi there! How can I assist you today?`;
    } else if (userMessage.toLowerCase().includes('fine')) {
      return `Great to hear! How can I help you further?`;
    } else if (userMessage.toLowerCase().includes('help')) {
      return `Sure! Could you please elaborate on what you need help with?`;
    } else if (userMessage.toLowerCase().includes('bye')) {
      return `Goodbye! Feel free to chat with me anytime.`;
    } else if (userMessage.toLowerCase().includes('play some music')) {
      return `Sure! I can't play music directly, but I can recommend some playlists or you can listen to music on platforms like Spotify.`;
    } else if (userMessage.toLowerCase().includes('add a new contact')) {
      return `To add a new contact, go to your contacts page and click on 'Add New Contact', then enter the contact details.`;
    } else if (userMessage.toLowerCase().includes('get a refund')) {
      return `Refund requests can be made through our customer support page. Just fill out the form and we will assist you.`;
    } else if (userMessage.toLowerCase().includes('ceo of tesla')) {
      return `The CEO of Tesla is Elon Musk.`;
    } else {
      // Default response for unknown input
      return `Hmm, that's interesting. Could you please explain more?`;
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return; // Prevent empty messages

    const userMessage = message.trim();

    // Add user's message
    setMessages((prev) => [...prev, { sender: 'You', content: userMessage }]);

    // Simulate Ziva's response with a delay
    setIsLoading(true);
    setTimeout(() => {
      const zivaReply = generateDynamicReply(userMessage); // Generate dynamic reply
      setMessages((prev) => [...prev, { sender: 'Ziva', content: zivaReply }]);
      setIsLoading(false);
    }, 1000); // 1 second delay

    // Clear the input field
    setMessage('');
  };

  return (
    <div className="chat-container">
      <h2>Chat with Ziva</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}
          >
            <strong>{msg.sender}: </strong> {msg.content}
          </div>
        ))}
        {isLoading && <div className="loading">Ziva is typing...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
