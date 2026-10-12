import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirects back to the Home page after submission
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Contact Me</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" 
          name="firstName" 
          placeholder="First Name" 
          required 
          onChange={handleChange} 
          value={formData.firstName} 
          style={{ padding: '0.5rem' }} 
        />
        <input 
          type="text" 
          name="lastName" 
          placeholder="Last Name" 
          required 
          onChange={handleChange} 
          value={formData.lastName} 
          style={{ padding: '0.5rem' }} 
        />
        <input 
          type="tel" 
          name="phone" 
          placeholder="Contact Number" 
          required 
          onChange={handleChange} 
          value={formData.phone} 
          style={{ padding: '0.5rem' }} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          required 
          onChange={handleChange} 
          value={formData.email} 
          style={{ padding: '0.5rem' }} 
        />
        <textarea 
          name="message" 
          placeholder="Your Message" 
          rows="4" 
          required 
          onChange={handleChange} 
          value={formData.message} 
          style={{ padding: '0.5rem', height: '100px' }}
        ></textarea>
        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;