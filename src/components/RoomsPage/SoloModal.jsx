import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './RoomsPage.css';
import { Fade, Modal, Button } from '@material-ui/core';

const SoloModal = ({ soloOpen, setSoloOpen, room, classes, modalStyle }) => {
  useEffect(() => {}, [soloOpen]);
  return (
    <>
      <Modal
        open={soloOpen}
        // onClose={() => setSoloOpen(false)}
        // onBackdropClick={() => setSoloOpen(false)}
        aria-labelledby="controls-helper"
        aria-describedby="key for list of controls"
        hideBackdrop={true}
        onClick={() => setSoloOpen(false)}
      >
        <Fade in={soloOpen} timeout={{ enter: 500, exit: 600 }}>
          <div style={modalStyle} className={classes.plastic}>
            <img
              src="https://i.imgur.com/V4QFP76.png"
              alt=""
              className={classes.logo}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export default SoloModal;
