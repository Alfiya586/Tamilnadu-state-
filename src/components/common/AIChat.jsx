import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Sparkles, User, ExternalLink, RefreshCw, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const QUICK_SUGGESTIONS = [
  "Find tourist places near Chennai.",
  "How can I apply for a certificate?",
  "What scholarships are available?",
  "Find colleges in Madurai.",
  "Where can I report a road problem?"
];

// Smart sample response generator based on query keywords
function generateAIResponse(query, navigate, openModalAction) {
  const lower = query.toLowerCase();

  if (lower.includes('chennai') && (lower.includes('tour') || lower.includes('place') || lower.includes('visit'))) {
    return {
      text: "Chennai offers iconic heritage and coastal attractions! Here are top recommendations:\n\n1. **Marina Beach & Promenade**: World's 2nd longest urban beach, great in evenings for sundal and seaside strolls.\n2. **Kapaleeshwarar Temple (Mylapore)**: Ancient 7th-century Dravidian temple with majestic gopuram and vibrant cultural streets.\n3. **Mahabalipuram (1 hour drive)**: UNESCO Shore Temple and monolithic rock-cut cave rathas.\n4. **DakshinaChitra**: Living heritage museum showcasing traditional South Indian houses.\n5. **Guindy National Park**: Rare protected urban forest sanctuary.",
      action: { label: "Explore Chennai Tourism", path: "/tourism?category=All" }
    };
  }

  if (lower.includes('certificate') || lower.includes('patta') || lower.includes('income') || lower.includes('community') || lower.includes('nativity')) {
    return {
      text: "You can apply for 20+ revenue certificates online through Tamil Nadu e-Sevai / e-District portal:\n\n• **Required Documents**: Aadhaar Card, Ration Card / Smart Card, Address Proof, and Photo.\n• **Key Certificates**: Community, Nativity, Income, First Graduate, and Legal Heir.\n• **Official Portal**: tnesevai.tn.gov.in or visit your nearest Arasu e-Sevai Centre.\n• **Timeline**: Standard digital processing takes 3 to 7 working days.",
      action: { label: "Go to Services & Certificates", path: "/services" }
    };
  }

  if (lower.includes('scholarship') || lower.includes('student') || lower.includes('naan mudhalvan') || lower.includes('penn')) {
    return {
      text: "Tamil Nadu offers state-leading student empowerment scholarships:\n\n1. **Naan Mudhalvan**: Industry skill training and certification in emerging tech for college students.\n2. **Moovalur Ramamirtham (Puthumai Penn)**: ₹1,000/month financial aid for girl students from government schools.\n3. **Tamil Pudhalvan**: ₹1,000/month for male government school students pursuing higher education.\n4. **First Graduate (Muthal Pattathari)**: Complete tuition fee waiver in engineering and medical programs.",
      action: { label: "View All Scholarships", path: "/students?tab=Scholarships" }
    };
  }

  if (lower.includes('madurai') && (lower.includes('college') || lower.includes('study') || lower.includes('university'))) {
    return {
      text: "Madurai is a major academic hub in Southern Tamil Nadu:\n\n• **Madurai Kamaraj University (MKU)**: Renowned state university for Arts, Sciences, and Genomics.\n• **Thiagarajar College of Engineering (TCE)**: Premier autonomous government-aided engineering college.\n• **Madurai Medical College (est. 1954)**: Top tertiary hospital and medical training centre.\n• **The American College (est. 1881)**: Historic heritage institution with NAAC A+ accreditation.\n• **Thiagarajar School of Management (TSM)**: Leading business school in South TN.",
      action: { label: "Explore Madurai District Hub", path: "/districts?id=madurai" }
    };
  }

  if (lower.includes('road') || lower.includes('pothole') || lower.includes('problem') || lower.includes('complaint') || lower.includes('report') || lower.includes('garbage') || lower.includes('light')) {
    return {
      text: "You can report civic infrastructure grievances directly on our citizen reporting portal!\n\n• **What you can report**: Potholes, damaged streetlights, garbage overflow, broken water pipes, and drainage issues.\n• **Features**: Upload live site photos, auto-detect GPS / district location, and receive an instant **Tracking ID** to monitor municipal repair progress.",
      action: { label: "Open Report a Problem", path: "/report-problem" }
    };
  }

  if (lower.includes('hospital') || lower.includes('emergency') || lower.includes('ambulance') || lower.includes('police')) {
    return {
      text: "For immediate emergencies across Tamil Nadu:\n\n• **108**: Medical Ambulance & Emergency Trauma Care (Free 24/7)\n• **100 / 112**: Tamil Nadu Police Control Room\n• **101**: Fire & Rescue Services\n• **1070**: State Disaster Management Authority (TNSDMA)\n• **181**: Women Safety Helpline",
      action: { label: "Open Emergency Hub", path: "/emergency" }
    };
  }

  // Fallback intelligent general assistant response
  return {
    text: `Here is information on "${query}":\n\nTamil Nadu is India's second-largest state economy and a pioneer in public healthcare, digital e-governance, higher education enrollment, and world heritage tourism. You can explore our unified portal to access government welfare schemes, inspect 38 districts, discover tourism trails, or connect with business corridors.`,
    action: { label: "Browse All Services", path: "/services" }
  };
}

export default function AIChat() {
  const { isAIChatOpen, setIsAIChatOpen, aiInitialPrompt, setAiInitialPrompt, t, language } = useApp();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: "msg-welcome",
      sender: "ai",
      text: language === 'ta' 
        ? "வணக்கம்! நான் தமிழ்நாடு AI உதவியாளர். அரசு சேவைகள், மாவட்ட தகவல்கள், சுற்றுலா, கல்வி மற்றும் குறை தீர்ப்பு பற்றி என்னிடம் கேட்கலாம்."
        : "Vanakkam! I am your Tamil Nadu AI Assistant. Ask me about government services, tourist destinations, college scholarships, district data, or civic issue reporting.",
      timestamp: "Just now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAIChatOpen) {
      scrollToBottom();
    }
  }, [messages, isAIChatOpen, isTyping]);

  useEffect(() => {
    if (aiInitialPrompt && isAIChatOpen) {
      handleSend(aiInitialPrompt);
      setAiInitialPrompt("");
    }
  }, [aiInitialPrompt, isAIChatOpen]);

  const handleSend = (textToSend = inputValue) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay for natural conversational rhythm
    setTimeout(() => {
      const reply = generateAIResponse(trimmed, navigate);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply.text,
        action: reply.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isAIChatOpen && (
        <button
          id="open-ai-chat-btn"
          onClick={() => setIsAIChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-xl shadow-emerald-900/20 hover:shadow-2xl transition-all duration-200 group border border-emerald-400/30"
          aria-label="Open Tamil Nadu AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-emerald-600 animate-ping"></span>
          </div>
          <span className="text-sm font-semibold tracking-wide">Tamil Nadu AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isAIChatOpen && (
        <div
          id="ai-chat-window"
          className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-scaleUp"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white px-4 py-3.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-wide">Tamil Nadu AI</h3>
                  <span className="text-[10px] uppercase font-semibold bg-emerald-500/40 text-emerald-100 px-1.5 py-0.5 rounded-full border border-emerald-300/30">Assistant</span>
                </div>
                <p className="text-[11px] text-emerald-100/80">Unified State Digital Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                title="Clear Chat"
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAIChatOpen(false)}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick prompt suggestions bar */}
          <div className="bg-slate-50 dark:bg-slate-800/60 px-3 py-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto whitespace-nowrap flex gap-1.5 text-xs">
            {QUICK_SUGGESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full shrink-0 text-[11px] hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                <span>{q}</span>
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  {msg.action && (
                    <button
                      onClick={() => {
                        navigate(msg.action.path);
                        setIsAIChatOpen(false);
                      }}
                      className="mt-2.5 inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-300/60 dark:border-emerald-700/60 text-xs transition-colors"
                    >
                      <span>{msg.action.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                  <div
                    className={`text-[10px] mt-1.5 ${
                      msg.sender === 'user' ? 'text-emerald-100 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-xs px-3.5 py-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                  <span className="text-[11px] text-slate-400 ml-1">Tamil Nadu AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              id="ai-chat-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about Tamil Nadu..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-transparent focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white p-2.5 rounded-xl transition-all shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
