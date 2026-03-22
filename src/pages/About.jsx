import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';

function About() {
  return (
    <div className="app-container">
      <Navbar />

      <div className="container" style={{maxWidth: '800px', padding: '6rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
        <h1 className="hero-title" style={{color: 'white', maxWidth: 'none'}}>Our Mission at <span className="highlight">MHLMS</span></h1>
        <p style={{fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '4rem'}}>
          We are dedicated to democratizing education. The modern learning environment requires cutting edge tools, uninterrupted video playback, structure, and accessibility. We provide an enterprise-grade learning management platform designed specifically for the builders of tomorrow.
        </p>

        <div className="glass" style={{padding: '3rem 1.5rem', borderRadius: '24px'}}>
           <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '2rem'}}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
           <h2 className="section-title" style={{color: 'white', margin: 0}}>Empowering Instructors & Students</h2>
           <p style={{color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1rem', lineHeight: '1.6'}}>
             Whether you are an expert looking to share your knowledge via video lectures and rigorous quizzes, or a student striving for mastery and certification, MHLMS is exactly what you need.
           </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default About;
