import React, { useState, useEffect } from 'react';

function QuizComponent({ course, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Simulated AI generation based on Course Title
    const generateSteps = () => {
      if (!course) return;
      const title = course.title || "General studies";
      const qset = [
        {
          question: `What is the core focus of the "${title}" curriculum?`,
          options: ["Creative theory", "Technical implementation", "Data mining", "Public speaking"],
          answer: 1
        },
        {
          question: `Which industry would benefit most from the skills taught in "${title}"?`,
          options: ["Tech & Development", "Fine Arts", "Agriculture", "Cooking"],
          answer: 0
        },
        {
          question: `What is the first step when implementing a project for "${title}"?`,
          options: ["Final build", "Planning & Logic", "Direct deployment", "No planning needed"],
          answer: 1
        }
      ];
      setQuestions(qset);
    };
    generateSteps();
  }, [course]);

  const handleNext = () => {
    if (selectedOption === questions[currentStep].answer) {
      setScore(score + 1);
    }
    
    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
    }
  };

  if (questions.length === 0) return <div>Analyzing course content...</div>;

  if (finished) {
    const finalScore = Math.round((score / questions.length) * 100);
    return (
      <div className="glass" style={{padding: '3rem', textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '1.5rem'}}>AI Assessment Results</h2>
        <div style={{fontSize: '4.5rem', fontWeight: '900', color: finalScore >= 70 ? 'var(--secondary)' : 'var(--accent)', marginBottom: '1rem'}}>
          {finalScore}%
        </div>
        <p style={{color: 'var(--text-muted)', marginBottom: '2.5rem'}}>
          {finalScore >= 70 ? "Brilliant! You've passed the assessment." : "Try again to qualify for the certification."}
        </p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
          {finalScore >= 70 && (
            <button className="btn btn-primary" onClick={() => onComplete(finalScore)}>Claim Certificate</button>
          )}
          <button className="btn btn-outline" onClick={() => { setCurrentStep(0); setScore(0); setFinished(false); }}>Retry</button>
        </div>
      </div>
    );
  }

  const q = questions[currentStep];

  return (
    <div className="glass" style={{padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1.5rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em'}}>
        <span style={{color: 'var(--primary)'}}>AI-GENERATED ASSESSMENT</span>
        <span style={{color: 'var(--text-muted)'}}>{currentStep + 1} / {questions.length}</span>
      </div>
      <h3 style={{fontSize: '1.75rem', marginBottom: '2.5rem', fontWeight: '800', lineHeight: '1.4'}}>{q.question}</h3>
      <div style={{display: 'grid', gap: '1rem', marginBottom: '3.5rem'}}>
        {q.options.map((opt, idx) => (
          <button 
            key={idx} 
            onClick={() => setSelectedOption(idx)}
            className="glass-input" 
            style={{
              textAlign: 'left', 
              cursor: 'pointer', 
              borderColor: selectedOption === idx ? 'var(--primary)' : 'var(--border)',
              background: selectedOption === idx ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,1)',
              color: '#000',
              fontWeight: selectedOption === idx ? '700' : '400'
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      <button 
        className="btn btn-primary btn-block btn-large" 
        disabled={selectedOption === null}
        onClick={handleNext}
      >
        {currentStep + 1 === questions.length ? 'Finalize Analysis' : 'Next Lesson Question'}
      </button>
    </div>
  );
}

export default QuizComponent;
