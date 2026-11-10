import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import request from '../api/api';
import styles from '../styles';

function Signup() {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // check the form before sending
  const validate = () => {
    if (!values.name || !values.email || !values.password) return 'Please fill in all fields.';
    if (!/.+@.+\..+/.test(values.email)) return 'Please enter a valid email.';
    if (values.password.length < 6) return 'Password must be at least 6 characters.';
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
      await request('/auth/signup', 'POST', values);
      setSuccess('Account created. You can sign in now.');
      setValues({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success} <Link to="/signin">Sign In</Link></p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Name" value={values.name} onChange={handleChange} style={styles.input} />
        <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} style={styles.input} />
        <input type="password" name="password" placeholder="Password (at least 6 characters)" value={values.password} onChange={handleChange} style={styles.input} />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default Signup;