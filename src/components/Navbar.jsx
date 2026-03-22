import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <nav className="glass nav-bar animate-fade-in">
      <Link to="/" className="logo" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
        <h2 style={{fontWeight: 800, margin: 0, color: '#fff'}}>MH<span style={{color: 'var(--primary)'}}>LMS</span></h2>
      </Link>
      
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isMenuOpen ? <line x1="18" y1="6" x2="6" y2="18"></line> : <line x1="3" y1="12" x2="21" y2="12"></line>}
          {isMenuOpen ? <line x1="6" y1="6" x2="18" y2="18"></line> : <><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>}
        </svg>
      </button>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/courses" onClick={() => setIsMenuOpen(false)}>Courses</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
        {isMenuOpen && (
          <div className="nav-actions active">
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
        )}
      </div>

      <div className="nav-actions">
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
