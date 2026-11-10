import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import request from '../api/api';
import auth from '../auth/auth-helper';
import styles from '../styles';

// signed in users can see messages
// only admin can edit and delete
function Messages() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const admin = auth.isAdmin();

  useEffect(() => {
    request('/api/contacts')
      .then((data) => setContacts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    setError('');
    setSuccess('');
    try {
      await request('/api/contacts/' + id, 'DELETE');
      setContacts(contacts.filter((c) => c._id !== id));
      setSuccess('Message deleted.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Messages</h1>
      {!admin && <p style={{ textAlign: 'center', color: '#555' }}>You can only view messages. Only the admin can edit or delete.</p>}
      {loading && <p style={styles.loading}>Loading messages...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      {!loading && contacts.length === 0 && !error && <p style={{ textAlign: 'center' }}>No messages yet.</p>}
      {contacts.map((c) => (
        <div key={c._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
          <h3 style={{ margin: '0 0 5px 0' }}>{c.firstName} {c.lastName}</h3>
          <p style={{ margin: '0 0 5px 0', color: '#555' }}>{c.email} | {c.phone}</p>
          <p>{c.message}</p>
          {admin && (
            <div>
              <Link to={'/contact/edit/' + c._id}><button style={styles.smallButton}>Edit</button></Link>
              <button onClick={() => handleDelete(c._id)} style={styles.deleteButton}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Messages;