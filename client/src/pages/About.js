import React from 'react';

function About() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>About Me</h1>
      
      {/* Profile Image */}
      <img 
        src={process.env.PUBLIC_URL + '/sara.jpg'}
        alt="Sara Aboudeeb" 
        style={{ width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover', margin: '15px 0' }} 
      />
      
      <h2>Sara Aboudeeb</h2>
      
      {/* Short Professional Biography in Level 2 English */}
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
        Hello! I am an IT professional with a Bachelor's degree in Information Technology and Computing. 
        I have experience in web applications, network support, and data management. 
        I like solving technical problems, building modern web pages, and working on innovative projects.
      </p>

      {/* Download Resume Button */}
      <div style={{ marginTop: '20px' }}>
        <a 
          href="/resume.pdf" 
          download 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: '#fff', 
            borderRadius: '5px', 
            textDecoration: 'none', 
            display: 'inline-block',
            fontWeight: 'bold'
          }}
        >
          Download Resume (PDF)
        </a>
      </div>
    </div>
  );
}

export default About;