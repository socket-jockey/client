import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CollabWorld = () => {
  const [controlPanel, setControlPanel] = useState(false);

  return (
    <>
      <div
        style={{ width: 300, height: 300, backgroundColor: 'lightseagreen' }}
        onClick={() => setControlPanel(true)}
      >
        Collab World
      </div>
      {controlPanel && (
        <div onClick={() => setControlPanel(false)}>Body Controls</div>
      )}
    </>
  );
};

CollabWorld.propTypes = {};

export default CollabWorld;
