import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import auth from '../auth/auth-helper';

function Navbar() {
  const navigate = useNavigate();
  useLocation(); // update the navbar when the page changes
  const jwt = auth.isAuthenticated();

  const handleSignout = async () => {
    await auth.signout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>My Portfolio</h2>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
        <li><Link to="/projects" style={styles.link}>Projects</Link></li>
        <li><Link to="/education" style={styles.link}>Education</Link></li>
        <li><Link to="/services" style={styles.link}>Services</Link></li>
        <li><Link to="/contact" style={styles.link}>Contact</Link></li>
        {jwt && <li><Link to="/messages" style={styles.link}>Messages</Link></li>}
        {!jwt && <li><Link to="/signin" style={styles.link}>Sign In</Link></li>}
        {!jwt && <li><Link to="/signup" style={styles.link}>Sign Up</Link></li>}
        {jwt && (
          <li style={styles.user}>
            Hi, {jwt.user.name} ({jwt.user.role})
          </li>
        )}
        {jwt && (
          <li>
            <button onClick={handleSignout} style={styles.signout}>Sign Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', padding: '1rem 2rem', background: '#333', color: '#fff' },
  logo: { margin: 0 },
  navLinks: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', listStyle: 'none', gap: '1.5rem', margin: 0, padding: 0 },
  link: { color: '#fff', textDecoration: 'none', fontWeight: 'bold' },
  user: { color: '#ccc' },
  signout: { background: 'none', border: '1px solid #fff', color: '#fff', padding: '4px 10px', cursor: 'pointer', borderRadius: '4px' }
};

export default Navbar;