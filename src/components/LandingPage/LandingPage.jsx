import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.css';

const LandingPage = () => {
  return (
    <main
      style={{
        backgroundImage: 'url(landing.png)',
      }}
      className={styles.landing}
    >
      <Link to="/rooms">
        <div className={styles.titleContainer}>
          <p className={styles.colorChange}>
            Socket
            <br />
            Jockey
          </p>
          <img src="/theHole.png" alt="the hole" className={styles.hole} />
        </div>
      </Link>
    </main>
  );
};

export default LandingPage;
