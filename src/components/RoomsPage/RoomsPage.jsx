import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SoloWorld from '../SoloRoomPage/SoloWorld';
import CollabWorld from '../CollabRoomPage/CollabWorld';

const RoomsPage = ({ setRoom, room }) => {
  const [globalControls, setGlobalControls] = useState(false);

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
      {room === 'solo' ? <SoloWorld /> : <CollabWorld />}
      {!globalControls ? (
        <div onClick={() => setGlobalControls(true)}>⚙️</div>
      ) : (
        <div onClick={() => setGlobalControls(false)}>Global Control Panel</div>
      )}
    </>
  );
};

RoomsPage.propTypes = {};

export default RoomsPage;
