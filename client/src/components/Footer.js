import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: { textAlign: 'center', padding: '1rem', background: '#222', color: '#aaa', marginTop: 'auto' }
};

export default Footer;