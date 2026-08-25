import React, { useState } from 'react';
import { Bot, X, Send, User, Sparkles } from 'lucide-react';
import aiService from '../../services/aiService';

const STUDENT_SUGGESTION_PROMPTS = [
  "Which scholarships am I eligible for?",
  "Find internships matching my skills.",
  "What government education schemes can I apply for?",
  "Why am I not eligible for this opportunity?",
  "What skills should I develop for this opportunity?",
  "Show me opportunities closing soon."
];

export const ChatbotDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! I'm SevaSetu Smart Student Assistant. Ask me anything about student scholarships, internship eligibility, required documents, or official application steps."
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessageText = async (text) => {
    if (!text.trim()) return;

    setInputMsg('');
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setLoading(true);

    try {
      const res = await aiService.sendMessage(text);
      setMessages((prev) => [...prev, { sender: 'bot', text: res.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Unable to connect to AI Assistant. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessageText(inputMsg);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-brand-600/30 hover:scale-105 transition-all group relative"
          title="SevaSetu AI Assistant"
          aria-label="Open SevaSetu AI Assistant"
        >
          <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-saffron-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[540px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-saffron-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <span>Student Opportunity Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
                </h3>
                <span className="text-[10px] text-brand-200">Grounded in verified student schemes data</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-brand-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-900/50 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">
                    S
                  </div>
                )}
                <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-brand-600 text-white font-medium rounded-tr-none shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/80 dark:border-slate-700/80 shadow-xs'
                }`}>
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold p-2">
                <Bot className="w-4 h-4 animate-spin text-brand-600" />
                <span>Searching student schemes criteria...</span>
              </div>
            )}
          </div>

          {/* Student Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-slate-100/60 dark:bg-slate-800/40 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {STUDENT_SUGGESTION_PROMPTS.map((promptText, idx) => (
              <button
                key={idx}
                onClick={() => sendMessageText(promptText)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-500 whitespace-nowrap flex-shrink-0 transition-colors"
              >
                {promptText}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask about scholarships, internships, skills..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
            <button
              type="submit"
              className="p-2.5 text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};

export default ChatbotDrawer;
