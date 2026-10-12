import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
      </ul>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#333', color: '#fff' },
  logo: { margin: 0 },
  navLinks: { display: 'flex', listStyle: 'none', gap: '1.5rem', margin: 0, padding: 0 },
  link: { color: '#fff', textDecoration: 'none', fontWeight: 'bold' }
};

export default Navbar;