import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://backendmhlms-production.up.railway.app/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/login');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Connection refused.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass animate-fade-in">
        <div className="auth-header">
           <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'center'}}>
              <svg width="48" height="48" fill="none" stroke="var(--primary)" strokeWidth="3" viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
           </div>
           <h2>Create Account</h2>
           <p style={{color: 'var(--text-muted)'}}>Join MHLMS to start your journey</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" className="glass-input" required onChange={handleChange} placeholder="huzaifa" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="glass-input" required onChange={handleChange} placeholder="••••" />
          </div>
          <div className="form-group" style={{marginBottom: '2rem'}}>
            <label>Account Type</label>
            <select name="role" className="glass-input" onChange={handleChange} style={{background: 'transparent'}}>
              <option value="student" style={{color: '#000'}}>Student</option>
              <option value="teacher" style={{color: '#000'}}>Teacher</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-block">
            {loading ? 'Processing...' : 'Register Account'}
          </button>
        </form>

        <div className="auth-footer" style={{marginTop: '2rem'}}>
          <p>Already have an account? <Link to="/login" style={{color: 'var(--primary)', fontWeight: '700'}}>Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
