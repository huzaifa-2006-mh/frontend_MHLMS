import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload(); // Refresh to clear states
  };

  return (
    <nav className="glass nav-bar animate-fade-in" style={{margin: '1rem', position: 'sticky', top: '1rem', zIndex: 100}}>
      <Link to="/" className="logo" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
        <h2 style={{fontWeight: 800, margin: 0, color: '#fff'}}>MH<span style={{color: 'var(--primary)'}}>LMS</span></h2>
      </Link>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/about">About Us</Link>
      </div>

      <div className="nav-actions" style={{display: 'flex', gap: '1rem'}}>
        {user ? (
          <>
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="btn btn-outline" style={{padding: '0.5rem 1rem'}}>Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-primary" style={{padding: '0.5rem 1rem'}}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline" style={{padding: '0.5rem 1rem'}}>Log In</Link>
            <Link to="/signup" className="btn btn-primary" style={{padding: '0.5rem 1rem'}}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
