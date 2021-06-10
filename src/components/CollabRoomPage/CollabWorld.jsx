import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CollabWorld = ({ setControlPanel }) => {
  return (
    <>
      <div
        style={{ width: 300, height: 300, backgroundColor: 'lightseagreen' }}
        onClick={() => setControlPanel(true)}
      >
        Collab World
      </div>
    </>
  );
};

CollabWorld.propTypes = {};

export default CollabWorld;
