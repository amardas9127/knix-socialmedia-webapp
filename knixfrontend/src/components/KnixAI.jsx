import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import SendMsgContainer from "../widgets/SendMsgContainer";
import RecMsgContainer from "../widgets/RecMsgContainer";

// Your Gemini API Key (CAUTION: Not recommended for production!)
const API_KEY = 'AIzaSyC-jdJbSifnhPRjpgtnPFpnIcitgnqOEsw';

export default function KnixAI() {
  // Load messages from localStorage or use default initial message
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('knixai-messages');
    return savedMessages 
      ? JSON.parse(savedMessages) 
      : [{ 
          type: 'received', 
          text: 'Hi There! 👋 I am KnixAI, your intelligent assistant. How can I help you today?', 
          date: '12/10/2024', 
          time: '12:30 PM' 
        }];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('knixai-messages', JSON.stringify(messages));
  }, [messages]);

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Format and clean up the AI response
  const formatResponse = (text) => {
    // Remove any leading/trailing whitespace
    let formattedText = text.trim();

    // Split into paragraphs
    const paragraphs = formattedText.split('\n').filter(p => p.trim() !== '');

    // Improve readability
    const cleanedParagraphs = paragraphs.map(para => {
      // Remove any markdown-like formatting
      para = para.replace(/\*\*/g, '');
      
      // Capitalize first letter of each paragraph
      para = para.charAt(0).toUpperCase() + para.slice(1);
      
      return para;
    });

    // Join paragraphs with line breaks
    return cleanedParagraphs.join('\n\n');
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clear messages function
  const clearMessages = () => {
    const initialMessage = { 
      type: 'received', 
      text: 'Hi There! 👋 I am KnixAI, your intelligent assistant. How can I help you today?', 
      date: '12/10/2024', 
      time: '12:30 PM' 
    };
    setMessages([initialMessage]);
    localStorage.removeItem('knixai-messages');
  };

  // Send message handler
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: 'sent',
      text: inputMessage,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Use Gemini to generate response
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      // Add context to improve response quality
      const contextualPrompt = `
        You are KnixAI, an helpful and friendly AI assistant. 
        Provide a clear, concise, and helpful response to the following query:
        ${inputMessage}
      `;

      const result = await model.generateContent(contextualPrompt);
      const response = await result.response;
      const rawText = response.text();

      // Format the response
      const formattedText = formatResponse(rawText);

      // Add AI response
      const aiMessage = {
        type: 'received',
        text: formattedText,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = {
        type: 'received',
        text: 'Oops! 🤖 I encountered an issue generating a response. Could you please try again?',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-[2vh] flex justify-between overflow-hidden">
      <div className="w-[100vw] h-[88vh] flex flex-col">
        {/* Clear Messages Button */}
        <button 
          className="w-[5vw] h-[5vh] ms-[89vw] bg-red-500 text-white rounded"
          onClick={clearMessages}
        >
          Clear
        </button>

        {/* Message List */}
        <div className="h-[78vh] w-full overflow-y-scroll flex flex-col overflow-x-hidden">
          {messages.map((msg, index) => (
            msg.type === 'sent' ? (
              <SendMsgContainer 
                key={index} 
                sndmsg={msg.text} 
                sndmsgtime={msg.time} 
                sndmsgdate={msg.date} 
              />
            ) : (
              <RecMsgContainer 
                key={index} 
                recmsg={msg.text} 
                recmsgtime={msg.time} 
                recmsgdate={msg.date} 
              />
            )
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-apptheme h-[8vh] w-[94vw] shadow-neusmrev rounded-[2vh] mt-[2vh] flex justify-between items-center animate-slideInUp ms-[2vw]">
          <input
            className="h-[8vh] w-full ms-[1vw] text-[2.5vh] text-textclr bg-transparent outline-none font-mono"
            placeholder="Type a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            className="shadow-neusm bg-apptheme w-[6vh] h-[6vh] rounded-[2vh] flex justify-center items-center me-[.5vw]"
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin">O</div>
            ) : (
              <i className="fa-solid fa-paper-plane"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}