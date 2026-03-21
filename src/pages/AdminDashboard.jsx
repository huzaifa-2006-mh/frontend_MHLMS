import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Programming', price: 0, videoUrl: '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'admin') {
        navigate('/dashboard'); 
      } else {
        setUser(parsedUser);
        fetchCourses();
      }
    }
  }, [navigate]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/courses');
      const data = await res.json();
      if(res.ok) setCourses(data);
    } catch(err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append('category', formData.category);
      payload.append('price', formData.price);
      payload.append('videoUrl', formData.videoUrl);
      if(imageFile) payload.append('imageFile', imageFile);
      
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: payload
      });
      
      if(res.ok) {
        setShowAddModal(false);
        setFormData({ title: '', description: '', category: 'Programming', price: 0, videoUrl: '' });
        setImageFile(null);
        fetchCourses();
      } else {
        alert("Failed to create course");
      }
    } catch(err) {
      alert("Server Error");
    }
    setLoading(false);
  };

  if (!user) return <div style={{padding: '2rem', textAlign: 'center'}}>Loading portal...</div>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
           <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <svg width="28" height="28" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            <h2 style={{fontWeight: 800}}>MH<span style={{color: 'var(--primary)'}}>LMS</span></h2>
          </div>
          <p style={{fontSize: '0.75rem', fontWeight: 700, color: '#a1a1aa', marginTop: '0.5rem', letterSpacing: '0.05em'}}>ADMINISTRATOR CONTROL</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" style={{marginBottom: '1rem'}}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Public Site
          </Link>
          <a href="#" className="active">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            Course Catalog
          </a>
          <a href="#">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            UserManager
          </a>
        </nav>
        <button onClick={handleLogout} className="btn btn-outline sidebar-logout">Log Out</button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Overview</h1>
            <p>Platform summary and management tools.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ New Course</button>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Students</span>
            <p className="stat-value">1,245</p>
          </div>
          <div className="stat-card">
            <span className="stat-label">Courses</span>
            <p className="stat-value">{courses.length}</p>
          </div>
          <div className="stat-card">
            <span className="stat-label">Gross Revenue</span>
            <p className="stat-value">$12.4k</p>
          </div>
        </section>

        <section className="animate-fade-in">
           <h2 style={{marginBottom: '1.5rem', fontWeight: 700}}>Platform Curated Content</h2>
           {courses.length === 0 ? (
             <div style={{padding: '4rem', background: '#fff', border: '1px solid #e4e4e7', borderRadius: '1.5rem', textAlign: 'center'}}>
                <p style={{color: '#71717a'}}>No production courses found.</p>
             </div>
           ) : (
             <div className="dashboard-course-grid">
               {courses.map(course => (
                 <div key={course._id} className="dashboard-course-card">
                    <div className="course-card-banner" style={{backgroundImage: `url(${course.thumbnailUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'})`}}></div>
                    <div className="card-p">
                      <span className="tag" style={{background: '#f4f4f5', color: '#52525b', padding: '0.125rem 0.5rem'}}>{course.category}</span>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <div className="flex-between" style={{marginTop: 'auto', borderTop: '1px solid #e4e4e7', paddingTop: '1rem', fontSize: '0.875rem', fontWeight: 700}}>
                        <span>${course.price}</span>
                        <span style={{color: '#71717a'}}>ID: {course.instructor?.username?.substring(0, 5)}</span>
                      </div>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </section>
      </main>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <h2>Add New Course</h2>
            <p style={{color: '#71717a', marginBottom: '2rem'}}>Define curriculum and upload assets.</p>
            <form onSubmit={handleCreateCourse}>
              <div className="form-group">
                <label>Course Title</label>
                <input type="text" name="title" className="modal-input" required value={formData.title} onChange={handleChange} />
              </div>
              
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
                 <div className="form-group">
                   <label>Upload Thumbnail</label>
                   <input type="file" accept="image/*" className="modal-input" style={{padding: '0.65rem'}} onChange={handleFileChange} />
                 </div>
                 <div className="form-group">
                   <label>Video Embed/URL</label>
                   <input type="url" name="videoUrl" className="modal-input" placeholder="YouTube URL..." value={formData.videoUrl} onChange={handleChange} />
                 </div>
              </div>

              <div className="form-group" style={{marginTop: '1rem'}}>
                <label>Description</label>
                <textarea name="description" className="modal-input" rows="3" required value={formData.description} onChange={handleChange}></textarea>
              </div>
              
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginTop:'1rem', marginBottom:'2rem'}}>
                 <div className="form-group">
                  <label>Category</label>
                  <select name="category" className="modal-input" value={formData.category} onChange={handleChange}>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input type="number" name="price" className="modal-input" required value={formData.price} onChange={handleChange} />
                </div>
              </div>

              <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Uploading...' : 'Publish Course'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
