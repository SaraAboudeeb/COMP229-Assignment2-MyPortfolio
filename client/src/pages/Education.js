import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import request from '../api/api';
import auth from '../auth/auth-helper';
import styles from '../styles';

function Education() {
  const [qualifications, setQualifications] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const admin = auth.isAdmin();

  // get all qualifications from the server
  useEffect(() => {
    request('/api/qualifications')
      .then((data) => setQualifications(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this qualification?')) return;
    setError('');
    setSuccess('');
    try {
      await request('/api/qualifications/' + id, 'DELETE');
      setQualifications(qualifications.filter((q) => q._id !== id));
      setSuccess('Qualification deleted.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Education & Qualifications</h1>
      {admin && (
        <div style={{ textAlign: 'center' }}>
          <Link to="/education/new"><button style={styles.smallButton}>Add Qualification</button></Link>
        </div>
      )}
      {loading && <p style={styles.loading}>Loading qualifications...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      {!loading && qualifications.length === 0 && !error && <p style={{ textAlign: 'center' }}>No qualifications yet.</p>}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
        {qualifications.map((q) => (
          <div key={q._id} style={styles.card}>
            <h3>{q.title}</h3>
            <p>{q.description}</p>
            <p><strong>Completed:</strong> {new Date(q.completion).toLocaleDateString()}</p>
            <p><strong>Name:</strong> {q.firstName} {q.lastName}</p>
            {admin && (
              <div>
                <Link to={'/education/edit/' + q._id}><button style={styles.smallButton}>Edit</button></Link>
                <button onClick={() => handleDelete(q._id)} style={styles.deleteButton}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;