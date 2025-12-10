'use client'; 

import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Bot, Sparkles, ChevronDown } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Welcome to DUITS! 🚀 I am your virtual assistant. Ask me about membership, wings, or upcoming events.' }
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
      setMessages((prev) => [...prev, { role: 'bot', content: "I'm having trouble connecting to the mainframe. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      
      {/* --- 1. The Launcher (Modern Pill) --- */}
      <button
        onClick={toggleChat}
        className={`group relative flex items-center gap-3 pl-4 pr-6 py-4 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out
          ${isOpen 
            ? 'bg-red-600 rotate-90 scale-0 opacity-0 absolute bottom-0 right-0' 
            : 'bg-white dark:bg-slate-900 scale-100 opacity-100'
          }`}
      >
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 opacity-70 -z-10 group-hover:opacity-100 transition-opacity">
           <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full"></div>
        </div>

        {/* Status Dot */}
        <div className="absolute top-0 right-0 -mt-1 -mr-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white dark:border-slate-900"></span>
          </span>
        </div>

        {/* Icon & Text */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
           <Bot size={20} />
        </div>
        <div className="text-left">
           <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">DUITS AI</p>
           <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Ask Help</p>
        </div>
      </button>

      {/* --- 2. The Chat Window (Glassmorphism) --- */}
      <div
        className={`fixed bottom-6 right-6 w-[90vw] sm:w-[380px] h-[600px] max-h-[80vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) origin-bottom-right border border-white/20 dark:border-slate-700
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0 visible' 
            : 'opacity-0 scale-75 translate-y-10 invisible pointer-events-none'
          }
          bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
        `}
      >
        
        {/* Header */}
        <div className="relative bg-slate-50 dark:bg-slate-900/50 p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start shrink-0">
          <div className="flex items-center gap-4">
             {/* Avatar with Glow */}
             <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-md opacity-40"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-inner">
                   <Bot size={24} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
             </div>
             <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">DUITS Assistant</h3>
                <div className="flex items-center gap-1.5">
                   <Sparkles size={12} className="text-blue-500 animate-pulse" />
                   <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Always active</span>
                </div>
             </div>
          </div>
          
          <button 
            onClick={toggleChat}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          <div className="text-center text-xs text-slate-400 dark:text-slate-500 my-4">
             <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Today</span>
          </div>

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                 
                 {/* Tiny Avatar for Bot only */}
                 {msg.role === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mb-1">
                       <Bot size={14} />
                    </div>
                 )}

                 {/* Message Bubble */}
                 <div
                   className={`px-5 py-3 text-sm leading-relaxed shadow-sm relative
                     ${msg.role === 'user'
                       ? 'bg-blue-600 text-white rounded-2xl rounded-br-none'
                       : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-700'
                     }`}
                 >
                   {msg.content}
                 </div>
              </div>
            </div>
          ))}

          {/* Typing Animation */}
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="flex items-end gap-2">
                 <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <Bot size={14} />
                 </div>
                 <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1.5 shadow-sm">
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-white dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl border border-transparent focus-within:border-blue-500/50 focus-within:bg-white dark:focus-within:bg-slate-800 transition-all duration-300">
            <input
              type="text"
              className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm pl-4 pr-12 py-4 focus:outline-none"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md shadow-blue-600/20 active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
          
          <div className="text-center mt-3">
            <p className="text-[10px] font-medium text-slate-400 flex items-center justify-center gap-1.5">
               Powered by <span className="text-blue-600 dark:text-blue-400 font-bold">DUITS AI</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}