import React from 'react';

function Footer() {
  return (
    <footer class="fixed-bottom" style={styles.footer}>
      <p>© {new Date().getFullYear()} Port de Russel — Tous droits réservés.</p>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#e0e0e0',
    padding: '1rem',
    textAlign: 'center',
    marginTop: '2rem'
  }
};

export default Footer;
