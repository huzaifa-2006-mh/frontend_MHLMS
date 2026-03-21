import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

import Footer from '../components/Footer';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
        window.location.reload(); // Force refresh to update navbar
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection refused. Check terminal.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card glass animate-fade-in">
          <div className="auth-header">
             <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'center'}}>
                <svg width="48" height="48" fill="none" stroke="var(--primary)" strokeWidth="3" viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
             </div>
             <h2>Welcome back</h2>
             <p style={{color: 'var(--text-muted)'}}>Enter your credentials to continue</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" className="glass-input" required onChange={handleChange} placeholder="admin" />
            </div>
            <div className="form-group" style={{marginBottom: '2rem'}}>
              <label>Password</label>
              <input type="password" name="password" className="glass-input" required onChange={handleChange} placeholder="••••" />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary btn-block">
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer" style={{marginTop: '2rem'}}>
            <p>Don't have an account? <Link to="/signup" style={{color: 'var(--primary)', fontWeight: '700'}}>Create one</Link></p>
            <Link to="/" style={{fontSize: '0.875rem', marginTop: '1rem'}}>Back to Marketing Site</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
