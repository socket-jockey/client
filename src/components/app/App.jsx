import React, { useState } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import RoomsPage from '../RoomsPage/RoomsPage';
import Footer from './Footer';
import Header from './Header';
import styles from './App.css';



const App = () => {
  const [landing, setLanding] = useState(true);
  const [room, setRoom] = useState('');

  if (landing)
    return (
      <main className={styles.landing}>
        <LandingPage setLanding={setLanding} />
      </main>
    );
  return (
    <main>
      <Header room={room} setRoom={setRoom} />
      <RoomsPage setRoom={setRoom} room={room} />
      <Footer />
    </main>
  );
};

export default App;
