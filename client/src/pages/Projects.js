import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import request from '../api/api';
import auth from '../auth/auth-helper';
import styles from '../styles';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const admin = auth.isAdmin();

  // get all projects from the server
  useEffect(() => {
    request('/api/projects')
      .then((data) => setProjects(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    setError('');
    setSuccess('');
    try {
      await request('/api/projects/' + id, 'DELETE');
      setProjects(projects.filter((p) => p._id !== id));
      setSuccess('Project deleted.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>My Projects</h1>
      {admin && (
        <div style={{ textAlign: 'center' }}>
          <Link to="/projects/new"><button style={styles.smallButton}>Add Project</button></Link>
        </div>
      )}
      {loading && <p style={styles.loading}>Loading projects...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      {!loading && projects.length === 0 && !error && <p style={{ textAlign: 'center' }}>No projects yet.</p>}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
        {projects.map((project) => (
          <div key={project._id} style={styles.card}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Completed:</strong> {new Date(project.completion).toLocaleDateString()}</p>
            <p><strong>By:</strong> {project.firstName} {project.lastName}</p>
            {admin && (
              <div>
                <Link to={'/projects/edit/' + project._id}><button style={styles.smallButton}>Edit</button></Link>
                <button onClick={() => handleDelete(project._id)} style={styles.deleteButton}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;