import React, { useState } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import RoomsPage from '../RoomsPage/RoomsPage';
import Footer from './Footer';
import Header from './Header';

const App = () => {
  const [landing, setLanding] = useState(true);
  const [room, setRoom] = useState('');

  if (landing) return <LandingPage setLanding={setLanding} />;
  return (
    <>
      <Header room={room} setRoom={setRoom} />
      <RoomsPage setRoom={setRoom} room={room} />
      <Footer />
    </>
  );
};

export default App;
