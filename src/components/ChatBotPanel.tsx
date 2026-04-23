import { useState, useEffect, useRef } from 'react';
import type { Message } from '../types';

interface ChatbotPanelProps {
  onClose?: () => void;
  full?: boolean;
}
const QUICK_REPLIES = [
  'Tour packages',
  'Hunza Valley',
  'Prices',
  'K2 Base Camp',
  'Fairy Meadows',
  'Contact info',
];
const getBotResponse = async (msg: string): Promise<string> => {
  try {
    const res = await fetch('http://localhost:5001/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg }),
    });
    if (!res.ok) throw new Error('Server error');
    const data = await res.json();
    return data.response || 'Sorry, I could not understand that. Please try again.';
  } catch {
    return 'Our AI assistant is temporarily offline. Please call us at +92 343 4106919 or WhatsApp for help!';
  }
};
export default function ChatbotPanel({ onClose, full = false }: ChatbotPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Assalam o Alaikum! I am Safi, your SafarWise AI travel assistant. How can I help you today?',
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 2,
      text: 'I can help you with:\n• Tour packages and prices\n• Destinations across Pakistan\n• Booking inquiries\n• Travel tips \n\nJust type your question or choose from the quick options below.',
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput]         = useState('');
  const [showQuick, setShowQuick] = useState(true);
  const [isTyping, setIsTyping]   = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { id: Date.now(), text: msg, sender: 'user', time };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setShowQuick(false);
    setIsTyping(true);
    const typingId = Date.now() + 1;
    setMessages(m => [...m, { id: typingId, text: '...', sender: 'bot', time }]);
    const response = await getBotResponse(msg);
    setIsTyping(false);
    setMessages(m => m.map(item =>
      item.id === typingId
        ? { ...item, text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        : item
    ));
  };
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);
  const SendIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
  const panel = (
    <>
      <div className="chatbot-header">
        <div style={{
          width: 38, height: 38, borderRadius: '50%', background: 'var(--amber)',
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', fontWeight: 700, flexShrink: 0,
        }}>
          S
        </div>
        <div className="chatbot-header-info">
          <div className="chatbot-header-name">Safi | AI Travel Assistant</div>
          <div className="chatbot-header-status">
            {isTyping ? '● Typing...' : '● Online now'}
          </div>
        </div>
        {onClose && (
          <button className="chatbot-close" onClick={onClose} title="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>
      <div className="chatbot-messages" ref={messagesRef}>
        {messages.map(m => (
          <div key={m.id} className={`chat-msg ${m.sender}`}>
            <div
              className="chat-bubble"
              style={{
                whiteSpace: 'pre-line',
                fontStyle: m.text === '...' ? 'italic' : 'normal',
                opacity: m.text === '...' ? 0.6 : 1,
              }}
            >
              {m.text === '...' ? 'Safi is typing...' : m.text}
            </div>
            <div className="chat-time">{m.time}</div>
          </div>
        ))}
        {showQuick && (
          <div style={{ padding: '0.5rem 0.75rem 0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {QUICK_REPLIES.map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                style={{
                  background: 'white', border: '1.5px solid var(--amber)', color: 'var(--amber)',
                  borderRadius: 50, padding: '0.3rem 0.9rem', fontSize: '0.75rem',
                  cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--amber)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'white';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'white';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--amber)';
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="chatbot-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about packages, prices, destinations..."
          onKeyDown={e => e.key === 'Enter' && !isTyping && send()}
          disabled={isTyping}
        />
        <button
          className="chatbot-send"
          onClick={() => send()}
          disabled={isTyping || !input.trim()}
          title="Send"
        >
          <SendIcon />
        </button>
      </div>
    </>
  );
  if (full) {
    return (
      <div style={{
        background: 'white', borderRadius: 20, overflow: 'hidden',
        maxWidth: 600, margin: '0 auto', height: '75vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 8px 48px rgba(61,43,31,0.15)',
      }}>
        {panel}
      </div>
    );
  }
  return <div className="chatbot-window">{panel}</div>;
}