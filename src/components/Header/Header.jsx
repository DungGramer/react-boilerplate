import React from 'react';
import styles from './header.module';
import styles2 from './header2.module.css';

const Header = () => {
  return (
    <div>
      <h1 className={styles.h1}>Whats' up Bro?</h1>
      <h2 className={styles2.h2}>yo yo</h2>
    </div>
  );
};

export default Header;
