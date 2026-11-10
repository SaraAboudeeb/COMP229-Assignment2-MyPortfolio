import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import request from '../api/api';
import styles from '../styles';

const emptyForm = { firstName: '', lastName: '', phone: '', email: '', message: '' };

// send a new message, or admin can edit a message (/contact/edit/:id)
function Contact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // if we are editing, get the message first
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    request('/api/contacts/' + id)
      .then((data) => {
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          message: data.message
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.message) {
      return 'Please fill in all fields.';
    }
    if (!/.+@.+\..+/.test(formData.email)) return 'Please enter a valid email.';
    if (!/^[0-9+\-\s()]{7,}$/.test(formData.phone)) return 'Please enter a valid phone number.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setLoading(true);
    try {
      if (id) {
        await request('/api/contacts/' + id, 'PUT', formData);
        setSuccess('Message updated.');
        setTimeout(() => navigate('/messages'), 1000);
      } else {
        await request('/api/contacts', 'POST', formData);
        setSuccess('Thank you! Your message was sent.');
        setFormData(emptyForm);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <h1 style={{ textAlign: 'center' }}>{id ? 'Edit Message' : 'Contact Me'}</h1>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} style={styles.input} />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} style={styles.input} />
        <input type="tel" name="phone" placeholder="Contact Number" onChange={handleChange} value={formData.phone} style={styles.input} />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} style={styles.input} />
        <textarea name="message" placeholder="Your Message" rows="4" onChange={handleChange} value={formData.message} style={{ ...styles.input, height: '100px' }}></textarea>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Sending...' : id ? 'Save Changes' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default Contact;