'use client'; 

import { useState, useRef, useEffect } from 'react';


export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'bot', content: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { role: 'bot', content: "Sorry, I couldn't reach the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* --- Launcher Pill --- */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 flex items-center gap-3 px-6 py-3.5 rounded-full shadow-2xl transition-all duration-300 z-[9999] group
          ${isOpen 
            ? 'rotate-0 bg-zinc-800 text-white dark:bg-zinc-700' 
            : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:scale-105 hover:shadow-indigo-500/40 dark:shadow-indigo-900/40'
          }`}
      >
        <div className="relative">
           {/* Simple Robot/Chat Icon */}
           <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
           </svg>
           {/* Notification Dot (Optional visual flair) */}
           {!isOpen && <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>}
        </div>
        
        <span className={`font-semibold tracking-wide ${isOpen ? 'hidden' : 'block'}`}>
          Chat AI
        </span>
      </button>

      {/* --- Chat Window --- */}
      <div
        className={`fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col overflow-hidden z-[9999] transition-all duration-300 origin-bottom-right shadow-2xl rounded-2xl border
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
          }
          bg-white/80 backdrop-blur-xl border-white/20 
          dark:bg-zinc-900/90 dark:backdrop-blur-xl dark:border-zinc-700/50
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-5 flex justify-between items-center text-white shadow-lg shrink-0">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
             </div>
             <div>
                <h3 className="font-bold text-lg leading-tight">AI Assistant</h3>
                <p className="text-xs text-indigo-100 opacity-80">Get your questions answered about DUITS</p>
             </div>
          </div>
          <button 
            onClick={toggleChat} 
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 scroll-smooth space-y-4 
          bg-gray-50/50 dark:bg-zinc-900/50">
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-sm shadow-sm relative leading-relaxed
                  ${msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white text-zinc-800 border border-gray-100 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 rounded-bl-none'
                  }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1 shadow-sm">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-full bg-gray-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-gray-500 dark:placeholder-zinc-400 border-0 rounded-full pl-5 pr-12 py-3.5 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none transition-all"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400 dark:text-zinc-500">
               AI can make mistakes. Check important info.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}