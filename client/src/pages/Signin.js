import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import request from '../api/api';
import auth from '../auth/auth-helper';
import styles from '../styles';

function Signin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!values.email || !values.password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      const data = await request('/auth/signin', 'POST', values);
      // save the token and go to home page
      auth.authenticate(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={{ textAlign: 'center' }}>Sign In</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} style={styles.input} />
        <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} style={styles.input} />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p style={{ textAlign: 'center' }}>No account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default Signin;