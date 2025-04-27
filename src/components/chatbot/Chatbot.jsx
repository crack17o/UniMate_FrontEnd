import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../layout/Navbar';
import '../../styles/chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Charger les conversations sauvegardées
    const savedConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    setConversations(savedConversations);
    
    // Créer une nouvelle conversation si aucune n'existe
    if (!currentConversationId) {
      handleNewChat();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleNewChat = () => {
    const newId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    setCurrentConversationId(newId);
    setMessages([]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simuler la réponse du bot
    setIsTyping(true);
    setTimeout(() => {
      const botMessage = {
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Sauvegarder la conversation
      saveConversation([userMessage, botMessage]);
    }, 1500);
  };

  const generateBotResponse = (userMessage) => {
    const responses = [
      `Je comprends ta question sur "${userMessage}". Je peux t'aider avec ça.`,
      `Voici ce que je peux te dire à propos de "${userMessage}"...`,
      `Intéressante question ! Concernant "${userMessage}", voici ce que je sais.`,
      `Je vais t'expliquer "${userMessage}" de manière simple.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const saveConversation = (newMessages) => {
    const updatedConversations = [...conversations];
    const existingConv = updatedConversations.find(c => c.id === currentConversationId);
    
    if (existingConv) {
      existingConv.messages.push(...newMessages);
    } else {
      updatedConversations.unshift({
        id: currentConversationId,
        title: newMessages[0].content.slice(0, 30) + '...',
        messages: [...newMessages]
      });
    }
    
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
  };

  const loadConversation = (id) => {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setCurrentConversationId(id);
      setMessages(conversation.messages);
    }
  };

  return (
    <>
      <Navbar />
      <div className="chatbot-container">
        <div className="chat-history-sidebar">
          <button className="new-chat-btn" onClick={handleNewChat}>
            <i className="fas fa-plus"></i>
            Nouvelle conversation
          </button>
          <div className="history-list">
            {conversations.map(conv => (
              <div
                key={conv.id}
                className={`history-item ${conv.id === currentConversationId ? 'active' : ''}`}
                onClick={() => loadConversation(conv.id)}
              >
                <i className="fas fa-comment"></i>
                <span>{conv.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-main">
          <div className="messages-container">
            {messages.length === 0 && (
              <div className="welcome-message">
                <h1>UniBot Assistant</h1>
                <p>Je suis là pour t'aider dans tes études. Que puis-je faire pour toi ?</p>
              </div>
            )}
            <div className="messages-list">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  <div className={`message-avatar ${message.type}`}>
                    <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'}`}></i>
                  </div>
                  <div className="message-content">{message.content}</div>
                </div>
              ))}
              {isTyping && (
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="chat-input-area">
            <div className="input-container">
              <textarea
                className="chat-input"
                placeholder="Pose ta question ici..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                rows={1}
              />
              <button 
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <p className="input-info">
              Appuie sur Entrée pour envoyer, Shift + Entrée pour un nouveau paragraphe
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;