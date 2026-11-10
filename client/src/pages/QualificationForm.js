import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import request from '../api/api';
import styles from '../styles';

// admin form to add a qualification (/education/new) or edit it (/education/edit/:id)
function QualificationForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState({
    title: '', firstName: '', lastName: '', email: '', completion: '', description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // if we are editing, get the qualification first
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    request('/api/qualifications/' + id)
      .then((data) => {
        setValues({
          title: data.title,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          completion: data.completion ? data.completion.substring(0, 10) : '',
          description: data.description
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!values.title || !values.firstName || !values.lastName || !values.email || !values.completion || !values.description) {
      return 'Please fill in all fields.';
    }
    if (!/.+@.+\..+/.test(values.email)) return 'Please enter a valid email.';
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
        await request('/api/qualifications/' + id, 'PUT', values);
        setSuccess('Qualification updated.');
      } else {
        await request('/api/qualifications', 'POST', values);
        setSuccess('Qualification added.');
      }
      setTimeout(() => navigate('/education'), 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={{ textAlign: 'center' }}>{id ? 'Edit Qualification' : 'Add Qualification'}</h1>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="title" placeholder="Qualification Title (e.g. Diploma)" value={values.title} onChange={handleChange} style={styles.input} />
        <input type="text" name="firstName" placeholder="First Name" value={values.firstName} onChange={handleChange} style={styles.input} />
        <input type="text" name="lastName" placeholder="Last Name" value={values.lastName} onChange={handleChange} style={styles.input} />
        <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} style={styles.input} />
        <label>Completion Date</label>
        <input type="date" name="completion" value={values.completion} onChange={handleChange} style={styles.input} />
        <textarea name="description" placeholder="Description" value={values.description} onChange={handleChange} style={{ ...styles.input, height: '100px' }}></textarea>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Saving...' : id ? 'Save Changes' : 'Add Qualification'}
        </button>
      </form>
    </div>
  );
}

export default QualificationForm;