import React, { useState } from 'react';

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I'm your MHLMS AI Guide. How can I help you in your learning journey today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input) return;
    
    setMessages(m => [...m, { role: 'user', content: input }]);
    const userMsg = input;
    setInput('');
    
    setTimeout(() => {
      let aiContent = "I'm analyzing your request...";
      if(userMsg.toLowerCase().includes("certificate")) aiContent = "You'll earn your certificate once you complete the course and pass the final MCQ quiz with at least 70%. Best of luck!";
      else if(userMsg.toLowerCase().includes("video")) aiContent = "Videos are in the Course Details page. Once watched, a quiz will appear automatically for your evaluation.";
      else if(userMsg.toLowerCase().includes("hi")) aiContent = "Hi there! I'm here to support your coding, design, and business studies on MHLMS.";
      else aiContent = "I understand. I'm trained on your current curriculum. Feel free to ask about specific lessons or your learning progress!";
      
      setMessages(m => [...m, { role: 'ai', content: aiContent }]);
    }, 1000);
  };

  return (
    <div style={{position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
      {open && (
        <div className="glass" style={{width: '350px', height: '450px', marginBottom: '1rem', display: 'flex', flexDirection: 'column', background: 'rgba(9,9,11,0.95)', border: '1px solid var(--primary)', overflow: 'hidden', boxShadow: '0 0 40px rgba(99,102,241,0.2)'}}>
           <div style={{padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--primary)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff'}}>
                 <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2v8l3-4"/><circle cx="12" cy="14" r="8"/><path d="M12 11v6"/></svg>
                 <span style={{fontWeight: '800'}}>MHLMS AI GUIDE</span>
              </div>
              <button onClick={() => setOpen(false)} style={{background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.5rem', fontWeight: '800'}}>×</button>
           </div>
           
           <div style={{flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {messages.map((m, idx) => (
                <div key={idx} style={{alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end', maxWidth: '80%', padding: '0.75rem 1rem', borderRadius: '1rem', background: m.role === 'ai' ? 'rgba(255,255,255,0.05)' : 'var(--primary)', color: '#fff', fontSize: '0.875rem'}}>
                   {m.content}
                </div>
              ))}
           </div>
           
           <form onSubmit={handleSend} style={{padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem'}}>
              <input type="text" className="glass-input" style={{fontSize: '0.875rem'}} placeholder="Ask AI anything..." value={input} onChange={(e) => setInput(e.target.value)} />
              <button type="submit" className="btn btn-primary" style={{padding: '0.5rem'}}><svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button>
           </form>
        </div>
      )}
      <button 
        onClick={() => setOpen(!open)}
        className="glass animate-fade-in" 
        style={{width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 32px rgba(99,102,241,0.5)'}}
      >
        <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
    </div>
  );
}

export default AIAssistant;
