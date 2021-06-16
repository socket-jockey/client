import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './LandingPage.css';

const LandingPage = () => {
  const history = useHistory();
  const [animate, setAnimate] = useState(false);

  const handleHole = () => {
    setAnimate(() => true);
    setTimeout(() => {
      history.push('/rooms');
    }, 2100);
  };
  return (
    <main
      style={{
        backgroundImage: 'url(landing.png)',
      }}
      className={styles.landing}
    >
      <div className={styles.titleContainer} onClick={handleHole}>
        <p className={styles.colorChange}>
          Socket
          <br />
          Jockey
        </p>
        <img
          src="/theHole.png"
          alt="the hole"
          className={animate ? styles.grow : styles.hole}
        />
      </div>
    </main>
  );
};

export default LandingPage;
