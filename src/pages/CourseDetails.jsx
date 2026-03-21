import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuizComponent from '../components/QuizComponent';
import CertificateTemplate from '../components/CertificateTemplate';
import '../App.css';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [certificateEarned, setCertificateEarned] = useState(false);
  const [studentName, setStudentName] = useState('STUDENT');

  useEffect(() => {
    fetchCourse();
    checkEnrollment();
    const userStr = localStorage.getItem('user');
    if (userStr) setStudentName(JSON.parse(userStr).username);
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await fetch(`https://backendmhlms-production.up.railway.app/api/courses/${id}`);
      const data = await res.json();
      setCourse(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const checkEnrollment = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.enrolledCourses && user.enrolledCourses.some(cid => (cid._id || cid) === id)) {
        setEnrolled(true);
      }
    }
  };

  const handleEnroll = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      const res = await fetch(`https://backendmhlms-production.up.railway.app/api/courses/${id}/enroll`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setEnrolled(true);
        const user = JSON.parse(localStorage.getItem('user'));
        user.enrolledCourses = data.enrolledCourses;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        alert(data.error || "Enrollment failed.");
      }
    } catch (err) {
      alert("Network Error");
    }
    setEnrolling(false);
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) return url.replace('watch?v=', 'embed/');
    if (url.includes('youtu.be/')) return `https://www.youtube.com/embed/${url.split('/').pop()}`;
    return url;
  };

  const handleQuizComplete = () => {
    setCertificateEarned(true);
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      const passedKey = `passed_${user.id || user._id}`;
      const existingPassed = JSON.parse(localStorage.getItem(passedKey) || '[]');
      if (!existingPassed.includes(id)) {
        const newPassed = [...existingPassed, id];
        localStorage.setItem(passedKey, JSON.stringify(newPassed));
      }
    }
  };

  if (loading) return <div style={{padding: '4rem', textAlign: 'center'}}>Syncing curriculum...</div>;
  if (!course || course.error) return <div style={{padding: '4rem', textAlign: 'center'}}>Course Not Found</div>;

  const embedUrl = getEmbedUrl(course.videoUrl);

  return (
    <div className="app-container">
      <Navbar />

      <div className="container" style={{maxWidth: '1200px', padding: '4rem 1.5rem'}}>
        
        {certificateEarned ? (
          <div className="certificate-area animate-fade-in" style={{textAlign: 'center'}}>
             <div style={{marginBottom: '2rem'}}>
                <h1 style={{color: 'var(--secondary)'}}>Congratulations, Graduate!</h1>
                <p style={{color: 'var(--text-muted)'}}>Your professional certification is ready. Download it below.</p>
             </div>
             <CertificateTemplate studentName={studentName} courseTitle={course.title} />
             <div style={{marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center'}}>
                <button className="btn btn-primary btn-large" onClick={() => window.print()}>Save as PDF</button>
                <button className="btn btn-outline" onClick={() => setCertificateEarned(false)}>Back to Course</button>
                <Link to="/dashboard" className="btn btn-outline">Go to Dashboard</Link>
             </div>
          </div>
        ) : !showQuiz ? (
          <>
            <div className="course-header animate-fade-in" style={{marginBottom: '3rem'}}>
              <span className="tag" style={{marginBottom: '1rem'}}>{course.category}</span>
              <h1 className="hero-title" style={{textAlign: 'left', fontSize: '3.5rem', marginBottom: '1rem'}}>{course.title}</h1>
              <p style={{fontSize: '1.25rem', color: 'var(--text-muted)'}}>Premium program by <strong>{course.instructor?.username || 'Official Admin'}</strong></p>
            </div>

            <div className="video-section">
              {embedUrl ? (
                <div className="video-wrapper animate-fade-in" style={{width: '100%', maxWidth: '100%'}}>
                  <iframe src={embedUrl} title={course.title} allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
              ) : (
                <div className="video-wrapper" style={{background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                   <p style={{color: 'var(--text-muted)'}}>Video material pending publication.</p>
                </div>
              )}
            </div>

            <div className="course-interact glass" style={{padding: '3rem', marginTop: '2.5rem'}}>
               <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem'}}>
                  <div>
                    <h2 style={{fontSize: '2rem', fontWeight: '800'}}>Module Overview</h2>
                    <p style={{color: 'var(--text-muted)'}}>Includes full access, lifetime updates, and verified certificate.</p>
                  </div>
                  {enrolled && (
                    <button className="btn btn-primary" onClick={() => setShowQuiz(true)}>Start Evaluation Quiz</button>
                  )}
                  {!enrolled && (
                    <div style={{textAlign: 'right'}}>
                       <span style={{fontSize: '2.5rem', fontWeight: '900'}}>${course.price}</span>
                       <button onClick={handleEnroll} disabled={enrolling} className="btn btn-primary btn-block" style={{marginTop: '1rem'}}>{enrolling ? 'Processing...' : 'Enroll Program'}</button>
                    </div>
                  )}
               </div>
               
               <p style={{fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8', whiteSpace: 'pre-wrap'}}>{course.description}</p>
            </div>
          </>
        ) : (
          <div className="quiz-section animate-fade-in">
             <div style={{marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <button onClick={() => setShowQuiz(false)} className="btn btn-outline" style={{padding: '0.4rem 0.75rem'}}>← Back to Lessons</button>
                <h2 style={{margin: 0}}>Course Evaluation</h2>
             </div>
             <QuizComponent course={course} onComplete={handleQuizComplete} />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default CourseDetails;
