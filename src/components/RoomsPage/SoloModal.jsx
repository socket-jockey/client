import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import styles from './RoomsPage.css';
import { Fade, Modal } from '@material-ui/core';

const SoloModal = ({ soloOpen, setSoloOpen, classes, modalStyle }) => {
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
              src="https://i.imgur.com/FNFJjCh.png"
              alt=""
              className={classes.logo}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

SoloModal.propTypes = {
  soloOpen: PropTypes.bool.isRequired,
  setSoloOpen: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  modalStyle: PropTypes.object.isRequired,
};

export default SoloModal;
