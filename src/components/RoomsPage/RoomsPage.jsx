import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import SoloWorld from '../SoloRoomPage/SoloWorld';
import CollabWorld from '../CollabRoomPage/CollabWorld';
import BodyControls from '../controls/BodyControls';

const RoomsPage = ({ setRoom, room }) => {
  const [viewGlobalControls, setViewGlobalControls] = useState(false);
  const [viewBodyControls, setViewBodyControls] = useState(false);

  const bodyRef = useRef({
    frictionAir: 0.01,
    tempo: 0,
    synthPitch: 0,
    wrapX: 50,
    wrapY: 50,
    toggles: [],
    wrap: false,
    static: false,
  });

  const worldRef = useRef({
    worldSize: { x: 600, y: 600 },
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

  if (!room)
    return (
      <div>
        <h1>Rooms Page</h1>
        <p onClick={() => setRoom('solo')}>solo</p>
        <p onClick={() => setRoom('collab')}>collab</p>
      </div>
    );
  return (
    <>
      {room === 'solo' ? (
        <SoloWorld setBodyControls={setBodyControls} bodyRef={bodyRef} />
      ) : (
        <CollabWorld setBodyControls={setBodyControls} bodyRef={bodyRef} />
      )}
      {!viewGlobalControls ? (
        <div onClick={() => setViewGlobalControls(true)}>⚙️</div>
      ) : (
        <div onClick={() => setViewGlobalControls(false)}>
          Global Control Panel
        </div>
      )}
      {!viewBodyControls ? (
        <div onClick={() => setViewBodyControls(true)}>🟣</div>
      ) : (
        <>
          <div onClick={() => setViewBodyControls(false)}>close</div>
          <BodyControls
            bodyControlsHandler={bodyControlsHandler}
            bodyControls={bodyControls}
            worldRef={worldRef}
            handleBodyRemove={handleBodyRemove}
          />
        </>
      )}
    </>
  );
};

RoomsPage.propTypes = {};

export default RoomsPage;
