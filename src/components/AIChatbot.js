import { useState } from 'react';
import groqService from '../services/groqService';

const QUICK_QUESTIONS = [
  'How can I increase revenue by 20%?',
  'Which customer segment should I focus on?',
  'Is my current price optimal?',
  'What are the top 3 launch risks?',
  'How does ML compare to rule-based predictions?',
];

function AIChatbot({ results, config }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your AI Market Analyst powered by Groq + Llama 3.1. Run the simulation and ask me anything about your results!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question) => {
    const text = question || input.trim();
    if (!text) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);

    const reply = await groqService.answerQuestion(text, results, config);

    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="ai-chatbot">
      <div className="chatbot-header">
        <div className="chatbot-title-row">
          <span className="groq-badge">⚡ Groq</span>
          <div>
            <strong>AI Market Analyst</strong>
            <span className="chatbot-subtitle"> · Llama 3.1 · Real-time</span>
          </div>
        </div>
      </div>

      <div className="quick-questions">
        {QUICK_QUESTIONS.map((q, i) => (
          <button
            key={i}
            className="quick-q-btn"
            onClick={() => sendMessage(q)}
            disabled={loading}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.role}`}>
            <div className="msg-bubble">
              {msg.content.split('\n').map((line, j) => (
                <span key={j}>{line}<br /></span>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-msg assistant">
            <div className="msg-bubble typing">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={results ? 'Ask about your simulation...' : 'Run simulation first...'}
          disabled={loading}
          className="chat-input"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          className="chat-send-btn"
        >
          {loading ? '⏳' : '➤'}
        </button>
      </div>
    </div>
  );
}

export default AIChatbot;
