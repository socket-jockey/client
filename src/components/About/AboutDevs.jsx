import React from 'react';
import styles from './AboutDevs.css';

export default function AboutDevs() {
  return (
    <main
      style={{
        backgroundImage: 'url(landing.png)',
      }}
      className={styles.wholePage}
    >
      <header className={styles.aboutHeader}>
        <img
          className={styles.headerImage}
          src="https://i.imgur.com/ZhkQnu3.png"
        />
      </header>
      <section className={styles.devWrapper}>
        <div className={styles.devGlue}>
          <h2>Anthony Rosario</h2>
          <a href="https://www.linkedin.com/in/anthony-rosario/">Linkedin</a>
          <a href="https://github.com/Anthony-Rosario">Github</a>
        </div>
      </section>
      <section className={styles.devWrapper}>
        <div className={styles.devGlue}>
          <h2>Dylan White</h2>
          <a href="https://www.linkedin.com/in/dylan-j-white/">Linkedin</a>
          <a href="https://github.com/glass-waves">Github</a>
        </div>
      </section>{' '}
      <section className={styles.devWrapper}>
        <div className={styles.devGlue}>
          <h2>Erich Sauer</h2>
          <a href="https://www.linkedin.com/in/erichsauer/">Linkedin</a>
          <a href="https://github.com/erichsauer">Github</a>
        </div>
      </section>{' '}
      <section className={styles.devWrapper}>
        <div className={styles.devGlue}>
          <h2>Jake Thrasher</h2>
          <a href="https://www.linkedin.com/in/m-jake-thrasher/">Linkedin</a>
          <a href="https://github.com/jakethrasher">Github</a>
        </div>
      </section>{' '}
      <section className={styles.devWrapper}>
        <div className={styles.devGlue}>
          <h2>Kat Sauma</h2>
          <a href="https://www.linkedin.com/in/kat-sauma/">Linkedin</a>
          <a href="https://github.com/kat-sauma">Github</a>
        </div>
      </section>{' '}
      <section className={styles.devWrapper}>
        <div className={styles.devGlue}>
          <h2>Patrick Hrabos</h2>
          <a href="https://www.linkedin.com/in/patrick-hrabos/">Linkedin</a>
          <a href="https://github.com/phrabos">Github</a>
        </div>
      </section>{' '}
      <section className={styles.devWrapper}>
        <div className={styles.devGlue}>
          <h2>Stephen Leisy</h2>
          <a href="https://www.linkedin.com/in/stephen-leisy/">Linkedin</a>
          <a href="https://github.com/stephen-leisy">Github</a>
        </div>
      </section>{' '}
      <section className={styles.devWrapper}>
        <div className={styles.devGlue}>
          <h2>Tyler Farris</h2>
          <a href="https://www.linkedin.com/in/tyler-p-farris/">Linkedin</a>
          <a href="https://github.com/Tylerpfarris">Github</a>
        </div>
      </section>
    </main>
  );
}
