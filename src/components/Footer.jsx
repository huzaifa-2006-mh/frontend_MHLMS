import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Footer() {
  return (
    <footer className="footer-section glass" style={{marginTop: 'auto', background: 'rgba(9,9,11,0.98)', borderTop: '1px solid var(--border)'}}>
      <div className="container" style={{padding: '5rem 1.5rem'}}>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo" style={{justifyContent: 'flex-start', color: '#fff', textDecoration: 'none', marginBottom: '1.5rem'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--primary)'}}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              <h2 style={{marginLeft: '0.5rem', fontWeight: 900}}>MH<span style={{color: 'var(--primary)'}}>LMS</span></h2>
            </Link>
            <p style={{color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem', fontSize: '0.95rem'}}>
              The leading educational platform for specialized industrial skills. From design to deployment.
            </p>
          </div>
          
          <div className="footer-links">
            <h4 style={{marginBottom: '1.5rem', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', color: 'var(--primary)'}}>Discovery</h4>
            <Link to="/courses" style={{display: 'block', color: 'var(--text-muted)', marginBottom: '0.8rem', textDecoration: 'none'}}>All Courses</Link>
            <Link to="/courses" style={{display: 'block', color: 'var(--text-muted)', marginBottom: '0.8rem', textDecoration: 'none'}}>Free Lessons</Link>
            <Link to="/courses" style={{display: 'block', color: 'var(--text-muted)', marginBottom: '0.8rem', textDecoration: 'none'}}>Professional Certificates</Link>
          </div>

          <div className="footer-links">
            <h4 style={{marginBottom: '1.5rem', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', color: 'var(--primary)'}}>Support</h4>
            <Link to="/about" style={{display: 'block', color: 'var(--text-muted)', marginBottom: '0.8rem', textDecoration: 'none'}}>Help Center</Link>
            <Link to="/about" style={{display: 'block', color: 'var(--text-muted)', marginBottom: '0.8rem', textDecoration: 'none'}}>Terms of Service</Link>
            <Link to="/about" style={{display: 'block', color: 'var(--text-muted)', marginBottom: '0.8rem', textDecoration: 'none'}}>Privacy Policy</Link>
          </div>

          <div className="footer-links">
            <h4 style={{marginBottom: '1.5rem', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.1rem', textTransform: 'uppercase', color: 'var(--primary)'}}>Contact</h4>
            <div style={{color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6'}}>
              Email: info@mhlms.com<br />
              Location: Karachi, PK<br />
              Tel: 03152931751
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{marginTop: '5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#71717a', fontSize: '0.875rem'}}>
           <p>© 2026 MHLMS Professional. Created by Muhammad Huzaifa.</p>
           <div style={{display: 'flex', gap: '1.5rem'}}>
             <a href="#" style={{color: 'inherit'}}>Instagram</a>
             <a href="#" style={{color: 'inherit'}}>Twitter</a>
             <a href="#" style={{color: 'inherit'}}>LinkedIn</a>
           </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
