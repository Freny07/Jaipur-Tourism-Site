import { useState, useEffect } from 'react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    // Add floating animation keyframes dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes floatAnimation {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(161, 103, 63, 0.4); }
        70% { box-shadow: 0 0 0 15px rgba(161, 103, 63, 0); }
        100% { box-shadow: 0 0 0 0 rgba(161, 103, 63, 0); }
      }
    `;
    document.head.appendChild(styleSheet);

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 8000);
    return () => {
      clearTimeout(timer);
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (showToast) setShowToast(false);
  };

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    const userMsg = { sender: 'user', text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsBotTyping(true);

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      const botMsg = { sender: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg = { sender: 'bot', text: 'Oops! The servers are currently resting. Please try again later.' };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setIsBotTyping(false);
  };

  // Primary Theme Color: #A1673F (Matches website header)
  // Secondary Light Color: #f4ece6
  const styles = {
    container: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    toast: {
      position: 'absolute',
      right: '80px',
      bottom: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      color: '#333',
      padding: '12px 18px',
      borderRadius: '20px',
      borderBottomRightRadius: '0',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(161, 103, 63, 0.2)',
      fontSize: '15px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      opacity: showToast && !isOpen ? 1 : 0,
      transform: showToast && !isOpen ? 'translateX(0) translateY(-5px)' : 'translateX(20px) translateY(0)',
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      pointerEvents: showToast && !isOpen ? 'auto' : 'none',
      animation: 'floatAnimation 3s ease-in-out infinite',
    },
    toggleBtn: {
      width: '65px',
      height: '65px',
      borderRadius: '50%',
      backgroundColor: '#A1673F',
      color: 'white',
      border: 'none',
      fontSize: '28px',
      cursor: 'pointer',
      boxShadow: '0 6px 15px rgba(161, 103, 63, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      marginTop: '15px',
      animation: !isOpen ? 'pulse 2.5s infinite' : 'none',
    },
    chatWindow: {
      width: '380px',
      height: '550px',
      maxHeight: '75vh',
      marginBottom: '15px',
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
      overflow: 'hidden',
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      pointerEvents: isOpen ? 'auto' : 'none',
      transformOrigin: 'bottom right'
    },
    header: {
      background: 'linear-gradient(135deg, #A1673F 0%, #8c5631 100%)',
      color: 'white',
      padding: '18px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    body: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      background: 'rgba(255, 255, 255, 0.4)',
      scrollbarWidth: 'thin',
      scrollbarColor: '#A1673F transparent'
    },
    footer: {
      padding: '15px',
      display: 'flex',
      gap: '10px',
      borderTop: '1px solid rgba(161, 103, 63, 0.1)',
      background: 'rgba(255, 255, 255, 0.95)',
      alignItems: 'center'
    },
    input: {
      flex: 1,
      padding: '12px 15px',
      border: '1px solid rgba(161, 103, 63, 0.3)',
      borderRadius: '25px',
      outline: 'none',
      backgroundColor: '#fff',
      fontSize: '14px',
      boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.05)',
      transition: 'border-color 0.3s ease',
    },
    sendBtn: {
      backgroundColor: '#A1673F',
      color: 'white',
      border: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 3px 8px rgba(161, 103, 63, 0.3)',
      transition: 'transform 0.2s, background-color 0.2s',
    },
    bubbleUser: {
      padding: '12px 16px',
      borderRadius: '18px',
      fontSize: '14.5px',
      background: 'linear-gradient(135deg, #A1673F 0%, #ba7e54 100%)',
      color: 'white',
      alignSelf: 'flex-end',
      borderBottomRightRadius: '4px',
      maxWidth: '82%',
      lineHeight: '1.5',
      boxShadow: '0 2px 5px rgba(161, 103, 63, 0.2)',
    },
    bubbleBot: {
      padding: '12px 16px',
      borderRadius: '18px',
      fontSize: '14.5px',
      backgroundColor: '#ffffff',
      color: '#333',
      alignSelf: 'flex-start',
      borderBottomLeftRadius: '4px',
      maxWidth: '82%',
      lineHeight: '1.5',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(161, 103, 63, 0.1)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.toast}>
        Namaste! 🏰 Need help exploring the Pink City?
      </div>
      
      <div style={styles.chatWindow}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🐪</span>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', letterSpacing: '0.5px' }}>Jaipur Virtual Guide</h4>
          </div>
          <button 
            onClick={toggleChat} 
            style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: '18px' }}
            onMouseOver={(e) => e.target.style.color = 'white'}
            onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
          >
            ✕
          </button>
        </div>
        
        <div style={styles.body}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>✨</div>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                Welcome to Jaipur! Ask me about majestic forts, royal cuisine, or the best bazaars.
              </p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} style={msg.sender === 'user' ? styles.bubbleUser : styles.bubbleBot}>
              {msg.text}
            </div>
          ))}
          {isBotTyping && (
            <div style={{ ...styles.bubbleBot, color: '#888', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ animation: 'floatAnimation 1s infinite' }}>•</span>
              <span style={{ animation: 'floatAnimation 1s infinite 0.2s' }}>•</span>
              <span style={{ animation: 'floatAnimation 1s infinite 0.4s' }}>•</span>
            </div>
          )}
        </div>
        
        <div style={styles.footer}>
          <input
            type="text"
            placeholder="Type your question..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#A1673F'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(161, 103, 63, 0.3)'}
          />
          <button 
            onClick={handleSend} 
            style={styles.sendBtn}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>

      <button 
        style={styles.toggleBtn} 
        onClick={toggleChat}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? '💬' : '🐪'}
      </button>
    </div>
  );
}

export default Chatbot;
