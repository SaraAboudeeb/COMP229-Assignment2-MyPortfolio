import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import request from '../api/api';
import styles from '../styles';

// admin form to add a project (/projects/new) or edit it (/projects/edit/:id)
function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState({
    title: '', firstName: '', lastName: '', email: '', completion: '', description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // if we are editing, get the project first
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    request('/api/projects/' + id)
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
        await request('/api/projects/' + id, 'PUT', values);
        setSuccess('Project updated.');
      } else {
        await request('/api/projects', 'POST', values);
        setSuccess('Project added.');
      }
      setTimeout(() => navigate('/projects'), 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={{ textAlign: 'center' }}>{id ? 'Edit Project' : 'Add Project'}</h1>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="title" placeholder="Project Title" value={values.title} onChange={handleChange} style={styles.input} />
        <input type="text" name="firstName" placeholder="First Name" value={values.firstName} onChange={handleChange} style={styles.input} />
        <input type="text" name="lastName" placeholder="Last Name" value={values.lastName} onChange={handleChange} style={styles.input} />
        <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} style={styles.input} />
        <label>Completion Date</label>
        <input type="date" name="completion" value={values.completion} onChange={handleChange} style={styles.input} />
        <textarea name="description" placeholder="Description" value={values.description} onChange={handleChange} style={{ ...styles.input, height: '100px' }}></textarea>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Saving...' : id ? 'Save Changes' : 'Add Project'}
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;