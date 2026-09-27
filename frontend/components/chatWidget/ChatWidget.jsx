'use client'; 

import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, ChevronDown } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello. I can help with DUITS membership, events, and society information.' }
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
    <div className="fixed bottom-4 right-4 z-[9999] font-sans sm:bottom-6 sm:right-6">
      
      {/* --- 1. The Launcher (Modern Pill) --- */}
      <button
        onClick={toggleChat}
        aria-label={isOpen ? "Close DUITS assistant" : "Open DUITS assistant"}
        aria-expanded={isOpen}
        className={`group relative flex items-center gap-3 rounded-md border border-slate-300 bg-white p-2.5 shadow-lg transition-all duration-200 hover:border-blue-700 dark:border-slate-700 dark:bg-slate-900
          ${isOpen 
            ? 'pointer-events-none scale-95 opacity-0'
            : 'scale-100 opacity-100'
          }`}
      >
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-blue-800 text-white"><Bot size={19} /></div>
        <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">DUITS assistant</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ask a question</p>
        </div>
      </button>

      {/* --- 2. The Chat Window (Glassmorphism) --- */}
      <div
        className={`fixed bottom-4 right-4 flex h-[min(36rem,calc(100dvh-2rem))] w-[min(24rem,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl transition-all duration-200 dark:border-slate-700 dark:bg-slate-900 sm:bottom-6 sm:right-6
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0 visible' 
            : 'opacity-0 scale-75 translate-y-10 invisible pointer-events-none'
          }`}
      >
        
        {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
             <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-blue-800 text-white"><Bot size={19} /></div>
             <div>
               <h3 className="text-sm font-semibold text-slate-900 dark:text-white">DUITS assistant</h3>
               <p className="text-xs text-slate-500 dark:text-slate-400">Membership · events · society</p>
             </div>
          </div>
          
          <button 
            onClick={toggleChat}
            aria-label="Minimize assistant"
            className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Messages Body */}
           <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-950">
          <div className="text-center text-xs text-slate-400 dark:text-slate-500 my-4">
             <span>DUITS information assistant</span>
          </div>

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                 
                 {/* Tiny Avatar for Bot only */}
                 {msg.role === 'bot' && (
                    <div className="mb-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                       <Bot size={14} />
                    </div>
                 )}

                 {/* Message Bubble */}
                 <div
                   className={`px-5 py-3 text-sm leading-relaxed shadow-sm relative
                     ${msg.role === 'user'
                       ? 'bg-blue-800 text-white rounded-md'
                       : 'bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-800'
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
                 <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                    <Bot size={14} />
                 </div>
                 <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
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
        <div className="shrink-0 border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="relative flex items-center rounded-md border border-slate-300 bg-white focus-within:border-blue-700 dark:border-slate-700 dark:bg-slate-950">
            <input
              type="text"
              className="w-full bg-transparent py-3 pl-3 pr-12 text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-sm bg-blue-800 text-white transition-colors hover:bg-blue-900 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
          
          <div className="text-center mt-3">
            <p className="flex items-center justify-center gap-1.5 text-[10px] font-medium text-slate-400">
              DUITS virtual assistant
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}