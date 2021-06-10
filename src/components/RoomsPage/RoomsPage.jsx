import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SoloWorld from '../SoloRoomPage/SoloWorld';
import CollabWorld from '../CollabRoomPage/CollabWorld';

const RoomsPage = ({ setRoom, room }) => {
  const [globalControls, setGlobalControls] = useState(false);
  const [controlPanel, setControlPanel] = useState(false);
  const [tone, setTone] = useState(1);
  const [tempo, setTempo] = useState(1);
  const [volume, setVolume] = useState(1);

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
        <SoloWorld setControlPanel={setControlPanel} />
      ) : (
        <CollabWorld setControlPanel={setControlPanel} />
      )}
      {!globalControls ? (
        <div onClick={() => setGlobalControls(true)}>⚙️</div>
      ) : (
        <div onClick={() => setGlobalControls(false)}>Global Control Panel</div>
      )}
      {controlPanel && (
        <div onClick={() => setControlPanel(false)}>Body Controls</div>
      )}
    </>
  );
};

RoomsPage.propTypes = {};

export default RoomsPage;
