import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('https://backendmhlms-production.up.railway.app/api/courses')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setCourses(data.slice(0, 3)); // Show 3 courses in row
      })
      .catch(console.log);
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      <main className="hero-section container">
        <div className="hero-content animate-fade-in">
          <div className="badge glass" style={{borderRadius: '0.5rem', fontSize: '0.75rem'}}>PLATFORM UPDATE 2.1</div>
          <h1 className="hero-title">
            The World-Class <span className="highlight">LMS</span> For Builders
          </h1>
          <p className="hero-subtitle">
            Experience structured programming, design, and business courses. Designed to take you from a complete beginner to a production-ready professional.
          </p>
          <div className="hero-cta">
            <Link to="/courses" className="btn btn-primary btn-large">
              Explore Catalog
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/signup" className="btn btn-outline btn-large">Join Community</Link>
          </div>
        </div>
      </main>

      <section className="container" id="courses" style={{padding: '4rem 1.5rem'}}>
        <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem'}}>
           <div>
              <h2 className="section-title">Trending Programs</h2>
              <p style={{color: 'var(--text-muted)'}}>The most high-demand skills being taught right now.</p>
           </div>
           <Link to="/courses" className="btn btn-outline">See All</Link>
        </div>
        
        <div className="courses-grid">
           {courses.length === 0 ? (
             <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'var(--bg-muted)', borderRadius: '1.25rem'}}>
                <p style={{color: 'var(--text-muted)'}}>Loading official courses from database...</p>
             </div>
           ) : (
             courses.map(course => (
               <div key={course._id} className="course-card">
                 <div className="card-image" style={{backgroundImage: `url(${course.thumbnailUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'})`}}></div>
                 <div className="card-content">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                       <span className="tag">{course.category}</span>
                       <span style={{fontWeight: '800', color: 'var(--primary)'}}>${course.price}</span>
                    </div>
                    <h3 style={{margin: '1rem 0 0.5rem'}}>{course.title}</h3>
                    <p>{course.description}</p>
                    <Link to={`/courses/${course._id}`} className="btn btn-primary btn-block" style={{marginTop: 'auto'}}>
                       Enroll Program
                    </Link>
                 </div>
               </div>
             ))
           )}
        </div>
      </section>

      <section className="container" style={{padding: '4rem 1.5rem', textAlign: 'center'}}>
        <div className="glass cta-box" style={{padding: '3rem 1.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), transparent)', border: '1px solid var(--border)'}}>
           <h2 className="section-title">Ready to accelerate career?</h2>
           <p style={{color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem'}}>Join 3,000+ students already learning on MHLMS.</p>
           <div className="hero-cta" style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <Link to="/signup" className="btn btn-primary btn-large">Get Started Now</Link>
              <Link to="/about" className="btn btn-outline btn-large">Learn More</Link>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
