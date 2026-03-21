import React from 'react';

function CertificateTemplate({ studentName, courseTitle, date }) {
  return (
    <div className="certificate-wrapper" style={{display: 'flex', justifyContent: 'center', padding: '2rem'}}>
      <div id="certificate" className="animate-fade-in shadow-premium" style={{
        width: '800px',
        background: '#fff',
        padding: '3rem',
        border: '15px solid #C5A028',
        position: 'relative',
        color: '#000',
        fontFamily: "'Playfair Display', serif",
        textAlign: 'center'
      }}>
        {/* Border Inner Line */}
        <div style={{border: '2px solid #C5A028', padding: '2rem', height: '100%'}}>
           <div style={{marginBottom: '2rem'}}>
              <h2 style={{color: '#C5A028', fontSize: '1.25rem', letterSpacing: '0.2rem', fontWeight: '800'}}>MHLMS OFFICIAL RECOGNITION</h2>
           </div>
           
           <h1 style={{fontSize: '3.5rem', fontWeight: '900', margin: '1rem 0', color: '#1a1a1a'}}>Certificate</h1>
           <p style={{fontSize: '1.25rem', color: '#555', letterSpacing: '0.1rem', margin: '1rem 0'}}>OF COMPLETION</p>
           
           <div style={{margin: '3rem 0'}}>
             <p style={{fontStyle: 'italic', fontSize: '1.1rem', color: '#666'}}>This is to certify that</p>
             <h3 style={{fontSize: '2.5rem', fontWeight: '800', borderBottom: '2px solid #eee', display: 'inline-block', padding: '0 2rem', marginTop: '1rem', color: '#000'}}>
               {studentName.toUpperCase()}
             </h3>
           </div>
           
           <p style={{fontSize: '1.2rem', color: '#444', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6'}}>
              has successfully completed all modules and passed the professional-grade assessment for the curriculum:
           </p>
           
           <h4 style={{fontSize: '1.8rem', fontWeight: '800', color: '#C5A028', marginBottom: '3rem'}}>
             {courseTitle}
           </h4>
           
           <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '4rem'}}>
              <div style={{textAlign: 'center'}}>
                 <div style={{borderBottom: '1px solid #000', width: '150px', marginBottom: '0.5rem'}}></div>
                 <p style={{fontSize: '0.8rem', fontWeight: '700'}}>MUHAMMAD HUZAIFA</p>
                 <p style={{fontSize: '0.7rem', color: '#777'}}>MHLMS DIRECTOR</p>
              </div>
              
              <div style={{width: '100px', height: '100px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                 <div style={{width: '80px', height: '80px', borderRadius: '50%', border: '4px double #C5A028', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <span style={{color: '#C5A028', fontWeight: '900', fontSize: '0.6rem'}}>VERIFIED PLATFORM</span>
                 </div>
              </div>
              
              <div style={{textAlign: 'center'}}>
                 <div style={{borderBottom: '1px solid #000', width: '150px', marginBottom: '0.5rem'}}>
                   <p style={{fontSize: '0.9rem', paddingBottom: '0.25rem'}}>{date || new Date().toLocaleDateString()}</p>
                 </div>
                 <p style={{fontSize: '0.8rem', fontWeight: '700'}}>ISSUE DATE</p>
                 <p style={{fontSize: '0.7rem', color: '#777'}}>SYSTEM GENERATED</p>
              </div>
           </div>
        </div>
        
        {/* Background watermark */}
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: '0.04', pointerEvents: 'none'}}>
            <svg width="400" height="400" viewBox="0 0 24 24" fill="#C5A028"><path d="M12 2v8l3-4"/><circle cx="12" cy="14" r="8"/><path d="M12 11v6"/></svg>
        </div>
      </div>
    </div>
  );
}

export default CertificateTemplate;
