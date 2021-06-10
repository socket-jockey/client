import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CollabWorld = ({ bodyRef, worldRef }) => {
  return (
    <>
      <div
        style={{ width: 300, height: 300, backgroundColor: 'lightseagreen' }}
      >
        Collab World
      </div>
    </>
  );
};

CollabWorld.propTypes = {};

export default CollabWorld;
