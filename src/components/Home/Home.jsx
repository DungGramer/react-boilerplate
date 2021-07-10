import { useCallback, useState } from 'react';
import logo from '/public/assets/images/logo.svg';
import styles from './Home.module';

function Home() {
  const [count, setCount] = useState(0);

  const handleCount = useCallback(() => {
    setTimeout(() => {
      setCount(prevCount => prevCount + 1);
    }, 500);
  }, []);

  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <img src={logo} className={styles['App-logo']} alt="logo" />
        <p>Hello React!</p>
        <p>
          <button type="button" onClick={handleCount}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          className={styles['App-link']}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
