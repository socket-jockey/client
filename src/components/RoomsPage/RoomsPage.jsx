import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SoloWorld from '../SoloRoomPage/SoloWorld';
import CollabWorld from '../CollabRoomPage/CollabWorld';
import BodyControls from '../controls/BodyControls';
import WorldControls from '../controls/WorldControls';
import styles from './RoomsPage.css';
import ControlsDrawer from '../controls/ControlsDrawer';


const RoomsPage = ({ setRoom, room }) => {
  const bodyRef = useRef({
    frictionAir: 0.01,
    tempo: 0,
    synthPitch: 0,
    wrapX: 50,
    wrapY: 50,
    toggles: [],
    wrap: false,
    static: false,
    shape: '',
    material: '',
  });

  const worldRef = useRef({
    worldSize: { x: 600, y: 600 },
    gravityX: 0,
    gravityY: 0,
    reverb: 0,
    toggles: [],
    vibe: '',
  });

  const [bodyControls, setBodyControls] = useState(bodyRef.current);
  const [worldControls, setWorldControls] = useState(worldRef.current);

  const bodyControlsHandler = (key, value) => {
    setBodyControls((prev) => ({ ...prev, [key]: value }));
    bodyRef.current[key] = value;
  };

  const worldControlsHandler = (key, value) => {
    setWorldControls((prev) => ({ ...prev, [key]: value }));
    worldRef.current[key] = value;
  };

  const handleBodyRemove = () => {
    console.log('body removed!');
  };

  const handleWorldClear = () => {
    console.log('world cleared!');
  };

  if (!room)
    return (
      <article>
        <section
          onClick={() => setRoom('solo')}
          className={styles.soloContainer}
        >
          <img
            src="../../../public/solo.png"
            alt="solo world experience"
            className={styles.soloImage}
          />
        </section>
        <section
          onClick={() => setRoom('collab')}
          className={styles.collabContainer}
        >
          <img
            src="../../../public/collab.png"
            alt="collaborative world experience"
            className={styles.collabImage}
          />
        </section>
      </article>
    );
  return (
    <article>
      <ControlsDrawer
        bodyControlsHandler={bodyControlsHandler}
        bodyControls={bodyControls}
        worldRef={worldRef}
        handleBodyRemove={handleBodyRemove}
        worldControlsHandler={worldControlsHandler}
        worldControls={worldControls}
        handleWorldClear={handleWorldClear}
      />
      {room === 'solo' ? (
        <section className={styles.solo}>
          <SoloWorld setBodyControls={setBodyControls} bodyRef={bodyRef} />
        </section>
      ) : (
        <section className={styles.collab}>
          <CollabWorld setBodyControls={setBodyControls} bodyRef={bodyRef} />
          {/* <Chat socketRoom={socketRoom} /> */}
        </section>
      )}
    </article>
  );
};

RoomsPage.propTypes = {};

export default RoomsPage;
