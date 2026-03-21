import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';

function CoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setCourses(data);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      <div className="container" style={{padding: '4rem 1.5rem'}}>
        <div style={{marginBottom: '4rem', textAlign: 'center'}}>
           <h1 className="hero-title" style={{margin: '0 auto 1rem'}}>All Curriculum</h1>
           <p style={{color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto'}}>Explore specialized programs designed by industry veterans.</p>
        </div>

        <div className="courses-grid">
           {courses.length === 0 ? (
             <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '6rem', background: 'var(--bg-muted)', borderRadius: '1.5rem'}}>
                <p style={{color: 'var(--text-muted)'}}>The catalog is currently being updated.</p>
             </div>
           ) : (
             courses.map(course => (
               <div key={course._id} className="course-card">
                 <div className="card-image" style={{backgroundImage: `url(${course.thumbnailUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'})`}}></div>
                 <div className="card-content">
                  <span className="tag">{course.category}</span>
                  <h3 style={{margin: '1rem 0 0.5rem'}}>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="card-footer">
                    <span style={{fontWeight: '700', color: 'var(--primary)'}}>${course.price}</span>
                    <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{course.instructor?.username || 'Admin'}</span>
                  </div>
                  <Link to={`/courses/${course._id}`} className="btn btn-primary btn-block" style={{marginTop: '1.25rem'}}>View Curriculum</Link>
                 </div>
               </div>
             ))
           )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default CoursesList;
