import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import aiService from '../services/aiService';
import { Bot, Send, User } from 'lucide-react';

export const AIAssistant = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaste! I am your SevaSetu Government Scheme Assistant. Ask me anything about eligibility criteria, required documents, or application steps.' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setInputMsg('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const response = await aiService.sendMessage(userText);
      setMessages((prev) => [...prev, { sender: 'bot', text: response.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Unable to connect to AI Assistant. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-4 flex-1 flex flex-col max-w-4xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Bot className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              SevaSetu AI Assistant
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Grounded in official scheme data to help you understand complex eligibility rules.
            </p>
          </div>

          <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-xs min-h-[450px]">
            
            {/* Chat Box */}
            <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`p-3.5 rounded-2xl text-xs max-w-md leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 items-center text-xs text-slate-400 font-medium">
                  <Bot className="w-4 h-4 animate-spin text-brand-600" />
                  <span>Thinking...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <input
                type="text"
                placeholder="Ask about scholarships, income limits, or document verification..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </main>
      </div>
    </div>
  );
};

export default AIAssistant;
