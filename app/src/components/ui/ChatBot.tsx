import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { askAI } from '@/lib/rag';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hey! I'm an AI trained on Manish's background. Ask me about his projects, skills, experience, or use the tool below to analyze a Job Description."
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [jdMode, setJdMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Emerge (start open) on desktop onload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    }
  }, []);

  // Listen to open event from Hero button
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    };

    window.addEventListener('open-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-chatbot', handleOpenChat);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (customMessage?: string, isJDRequest?: boolean) => {
    const userMessage = (customMessage || input).trim();
    if (!userMessage || isTyping) return;

    if (!customMessage) {
      setInput('');
    }

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    const checkJD = isJDRequest !== undefined ? isJDRequest : jdMode;
    if (jdMode) {
      setJdMode(false); // Reset JD matching mode
    }

    // Call RAG engine
    const history = messages.slice(1); // Exclude welcome message for cleaner history
    const reply = await askAI(userMessage, history, checkJD);

    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', content: reply }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSuggestionClick = (type: 'jd' | 'project' | 'skills') => {
    if (type === 'jd') {
      // Trigger JD Mode flow
      setMessages(prev => [
        ...prev,
        { role: 'user', content: 'Check JD Compatibility' },
        {
          role: 'model',
          content: "I'd love to help analyze Manish's compatibility! Please paste your Job Description (JD) or list of key requirements in the chat below. I'll run a gap and alignment analysis for you."
        }
      ]);
      setJdMode(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (type === 'project') {
      handleSend("Explain Manish's RAG projects", false);
    } else if (type === 'skills') {
      handleSend("What are Manish's core technical skills?", false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-glow-amber transition-all duration-300"
            style={{
              backgroundColor: '#161B22',
              border: '1px solid #E8C54744',
              zIndex: 100,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            title="Chat with Manish's AI"
          >
            {/* Animated Pulsing Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#E8C547]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            {/* Synapse Core Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8C547" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742a3 3 0 00-2.22 3.684m8.684-3.684a3 3 0 012.22 3.684M15 13a3 3 0 11-6 0 3 3 0 016 0zm-3-9a3 3 0 110 6 3 3 0 010-6z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-[90%] sm:w-[400px] h-[560px] flex flex-col rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-[#21262D] z-[100]"
            style={{
              backgroundColor: '#161B22',
            }}
            initial={{ scale: 0.8, opacity: 0, transformOrigin: 'bottom right' }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="h-12 border-b border-[#21262D] px-4 flex items-center justify-between z-10" style={{ backgroundColor: '#0D1117' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#39D353] animate-pulse" />
                <span className="font-display font-semibold text-sm text-[#E6EDF3]">Manish's AI</span>
                {jdMode && (
                  <span className="font-mono text-[10px] bg-[#E8C54722] border border-[#E8C54744] text-[#E8C547] px-2 py-0.5 rounded-full">
                    JD Matcher Active
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-transparent hover:border-[#21262D] hover:bg-[#1C2128] transition-all duration-200"
                style={{ color: '#8B949E' }}
                aria-label="Minimize"
              >
                ✕
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar relative z-0">
              
              {/* Ambient Spores floating in background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: i % 2 === 0 ? '4px' : '6px',
                      height: i % 2 === 0 ? '4px' : '6px',
                      backgroundColor: i % 3 === 0 ? '#E8C547' : '#39D353',
                      left: `${15 + i * 15}%`,
                      top: `${20 + i * 12}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, i % 2 === 0 ? 15 : -15, 0],
                      opacity: [0.2, 0.8, 0.2]
                    }}
                    transition={{
                      duration: 6 + i * 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
              </div>

              {/* Chat Bubble List */}
              <div className="relative z-10 flex flex-col gap-4">
                {messages.map((msg, i) => {
                  const isUser = msg.role === 'user';
                  return (
                    <motion.div 
                      key={i} 
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-2.5 text-sm font-body leading-relaxed border whitespace-pre-line ${
                          isUser
                            ? 'bg-[#E8C54720] border-[#E8C54740] text-[#E6EDF3] rounded-[12px] rounded-br-[4px]'
                            : 'bg-[#39D35315] border-[#39D35330] text-[#E6EDF3] rounded-[12px] rounded-bl-[4px]'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#39D35315] border border-[#39D35330] rounded-[12px] rounded-bl-[4px] px-4 py-3 flex gap-1">
                      {[0, 1, 2].map(dot => (
                        <motion.span
                          key={dot}
                          className="w-1.5 h-1.5 rounded-full bg-[#39D353]"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: dot * 0.2,
                            ease: 'easeInOut'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Suggestions Row */}
            <div className="px-3 py-2 border-t border-[#21262D] flex gap-2 overflow-x-auto whitespace-nowrap bg-[#0D1117] custom-scrollbar z-10">
              <motion.button
                onClick={() => handleSuggestionClick('jd')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1 px-3 py-1 text-[11px] font-mono rounded-full border border-[#E8C54744] bg-[#E8C54711] text-[#E8C547] cursor-pointer hover:border-[#E8C547] transition-all duration-200"
              >
                Check JD Fit 💼
              </motion.button>
              <motion.button
                onClick={() => handleSuggestionClick('project')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1 px-3 py-1 text-[11px] font-mono rounded-full border border-[#39D35344] bg-[#39D35311] text-[#39D353] cursor-pointer hover:border-[#39D353] transition-all duration-200"
              >
                RAG Projects 🤖
              </motion.button>
              <motion.button
                onClick={() => handleSuggestionClick('skills')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1 px-3 py-1 text-[11px] font-mono rounded-full border border-[#21262D] bg-[#161B22] text-[#8B949E] cursor-pointer hover:border-[#39D353] hover:text-[#E6EDF3] transition-all duration-200"
              >
                Main Skills ⚡
              </motion.button>
            </div>

            {/* Input Row */}
            <div className="h-16 border-t border-[#21262D] p-3 flex gap-2 z-10" style={{ backgroundColor: '#0D1117' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={jdMode ? "Paste JD description/requirements here..." : "Ask about Manish's experience or skills..."}
                className={`flex-1 bg-[#161B22] border rounded-lg px-3 text-sm text-[#E6EDF3] focus:outline-none transition-all duration-200 ${
                  jdMode ? 'border-[#E8C547] focus:border-[#E8C547] placeholder:text-[#E8C54788]' : 'border-[#21262D] focus:border-[#39D353]'
                }`}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className={`w-10 rounded-lg flex items-center justify-center bg-[#161B22] border cursor-pointer transition-all duration-200 ${
                  jdMode 
                    ? 'border-[#E8C547] text-[#E8C547] hover:bg-[#E8C54711] disabled:opacity-40' 
                    : 'border-[#21262D] text-[#39D353] hover:border-[#39D353] disabled:opacity-40 disabled:hover:border-[#21262D]'
                }`}
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
