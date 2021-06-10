import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SoloWorld = (props) => {
  const [controlPanel, setControlPanel] = useState(false);
  return (
    <>
      <div
        style={{ width: 300, height: 300, backgroundColor: 'peachpuff' }}
        onClick={() => setControlPanel(true)}
      >
        Solo World
      </div>
      {controlPanel && (
        <div onClick={() => setControlPanel(false)}>Body Controls</div>
      )}
    </>
  );
};

SoloWorld.propTypes = {};

export default SoloWorld;
