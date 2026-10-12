import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to My Portfolio</h1>
      <p style={{ fontSize: '1.2rem', margin: '20px 0', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
        <strong>Mission Statement:</strong> Dedicated to creating intuitive, responsive, and innovative web applications that deliver great user experiences and solve real-world problems.
      </p>
      <Link to="/about">
        <button style={{ padding: '10px 20px', fontSize: '1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Learn More About Me
        </button>
      </Link>
    </div>
  );
}

export default Home;