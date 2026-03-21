import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import QuizComponent from '../components/QuizComponent';
import CertificateTemplate from '../components/CertificateTemplate';
import Footer from '../components/Footer';
import '../App.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('courses');
  
  const [activeQuizCourse, setActiveQuizCourse] = useState(null);
  const [activeCertificateCourse, setActiveCertificateCourse] = useState(null);
  const [passedCourses, setPassedCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === 'admin') navigate('/admin');
      else {
        setUser(parsedUser);
        fetchEnrolled();
        const storedPassed = localStorage.getItem(`passed_${parsedUser.id}`);
        if(storedPassed) setPassedCourses(JSON.parse(storedPassed));
      }
    }
  }, [navigate]);

  const fetchEnrolled = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://backendmhlms-production.up.railway.app/api/courses/enrolled', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setCourses(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handlePassed = (courseId) => {
    const newPassed = [...passedCourses, courseId];
    setPassedCourses(newPassed);
    localStorage.setItem(`passed_${user.id}`, JSON.stringify(newPassed));
    setActiveQuizCourse(null);
    setCurrentTab('certificates');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  if (!user || loading) return <div style={{padding: '4rem', textAlign: 'center'}}>Syncing session...</div>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            <h2 style={{fontWeight: 800}}>MH<span style={{color: 'var(--primary)'}}>LMS</span></h2>
          </div>
          <p style={{fontSize: '0.75rem', fontWeight: 700, color: '#a1a1aa', marginTop: '0.5rem'}}>{user.role.toUpperCase()} PORTAL</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" style={{marginBottom: '1rem'}}>Main Site</Link>
          <button className={`sidebar-btn ${currentTab === 'courses' ? 'active' : ''}`} onClick={() => {setCurrentTab('courses'); setActiveQuizCourse(null); setActiveCertificateCourse(null);}}>My Learning</button>
          <button className={`sidebar-btn ${currentTab === 'assignments' ? 'active' : ''}`} onClick={() => {setCurrentTab('assignments'); setActiveQuizCourse(null); setActiveCertificateCourse(null);}}>Assignments</button>
          <button className={`sidebar-btn ${currentTab === 'certificates' ? 'active' : ''}`} onClick={() => {setCurrentTab('certificates'); setActiveQuizCourse(null); setActiveCertificateCourse(null);}}>Certificates</button>
        </nav>
        <button onClick={handleLogout} className="btn btn-outline sidebar-logout">Log Out</button>
      </aside>

      <main className="dashboard-main">
        {activeQuizCourse ? (
           <div className="animate-fade-in" style={{maxWidth: '800px', margin: '0 auto'}}>
              <button onClick={() => setActiveQuizCourse(null)} className="btn btn-outline" style={{marginBottom: '2rem'}}>← Exit Quiz</button>
              <h2 style={{marginBottom: '1rem'}}>AI Quiz for {activeQuizCourse.title}</h2>
              <QuizComponent course={activeQuizCourse} onComplete={() => handlePassed(activeQuizCourse._id)} />
           </div>
        ) : activeCertificateCourse ? (
           <div className="animate-fade-in" style={{textAlign: 'center'}}>
              <button onClick={() => setActiveCertificateCourse(null)} className="btn btn-outline" style={{marginBottom: '2rem'}}>← Back to Certificates</button>
              <CertificateTemplate studentName={user.username} courseTitle={activeCertificateCourse.title} />
              <button className="btn btn-primary" style={{marginTop: '2rem'}} onClick={() => window.print()}>Save as PDF</button>
           </div>
        ) : (
          <>
            <header className="dashboard-header" style={{marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <h1 style={{fontSize: '2rem', fontWeight: 800}}>Portal Hub</h1>
                  <p style={{color: '#71717a'}}>Manage your curriculum and professional certifications.</p>
                </div>
                <Link to="/courses" className="btn btn-primary">Browse Apps</Link>
            </header>

            {currentTab === 'courses' && (
               <div className="animate-fade-in">
                  <h2 style={{marginBottom: '1.5rem', fontWeight: 700}}>Curated Learning</h2>
                  <div className="dashboard-course-grid">
                     {courses.map(course => (
                       <Link to={`/courses/${course._id}`} key={course._id} className="course-card" style={{background: '#fff', textDecoration: 'none'}}>
                          <div className="card-image" style={{backgroundImage: `url(${course.thumbnailUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'})`, height: '140px'}}></div>
                          <div className="card-p" style={{padding: '1rem'}}>
                             <h4 style={{fontSize: '1rem', color: '#000', margin: '0.5rem 0'}}>{course.title}</h4>
                             <p style={{fontSize: '0.75rem', color: '#71717a'}}>Resume curriculum progress</p>
                          </div>
                       </Link>
                     ))}
                  </div>
               </div>
            )}

            {currentTab === 'assignments' && (
               <div className="animate-fade-in">
                  <h2 style={{marginBottom: '1.5rem', fontWeight: 700}}>Pending AI Assessments</h2>
                  <div style={{display: 'grid', gap: '1rem'}}>
                    {courses.map(course => (
                      <div key={course._id} className="glass" style={{padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderColor: '#e4e4e7'}}>
                         <div>
                            <h4 style={{margin: 0}}>{course.title} Evaluation</h4>
                            <p style={{fontSize: '0.8rem', color: '#71717a'}}>Generated on {new Date().toLocaleDateString()}</p>
                         </div>
                         {passedCourses.includes(course._id) ? (
                            <span style={{color: 'var(--secondary)', fontWeight: '700'}}>COMPLETED ✓</span>
                         ) : (
                            <button className="btn btn-outline" onClick={() => setActiveQuizCourse(course)}>Start AI Quiz</button>
                         )}
                      </div>
                    ))}
                  </div>
               </div>
            )}

            {currentTab === 'certificates' && (
               <div className="animate-fade-in">
                  <h2 style={{marginBottom: '1.5rem', fontWeight: 700}}>Professional Certifications</h2>
                  <div style={{display: 'grid', gap: '1rem'}}>
                    {courses.filter(c => passedCourses.includes(c._id)).length === 0 ? (
                      <div style={{padding: '4rem', background: '#fff', border: '1px solid #e4e4e7', borderRadius: '1.5rem', textAlign: 'center'}}>
                         <p style={{color: '#71717a'}}>Pass an AI Assessment to unlock your certificate.</p>
                      </div>
                    ) : (
                      courses.filter(c => passedCourses.includes(c._id)).map(course => (
                        <div key={course._id} className="glass" style={{padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderColor: '#e4e4e7'}}>
                           <div>
                              <h4 style={{margin: 0}}>{course.title} Certificate</h4>
                              <p style={{fontSize: '0.8rem', color: '#71717a'}}>Verified by MHLMS Platform</p>
                           </div>
                           <button className="btn btn-primary" onClick={() => setActiveCertificateCourse(course)}>Show Official PDF</button>
                        </div>
                      ))
                    )}
                  </div>
               </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
