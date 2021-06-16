import React, { useState } from 'react';
import { useParams } from 'react-router';
import styles from './RoomsPage.css';
import ControlsDrawer from '../controls/ControlsDrawer';
import { useMatterCollab } from '../app/hooks/useMatterCollab';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const RoomsPage = () => {
  const classes = useStyles();

  let canvasX, canvasY;

  if (room === 'collab') {
    canvasX = 1000;
    canvasY = 800;
  } else {
    canvasX = window.innerWidth * 0.8 ;
    canvasY = window.innerHeight * 0.8;
  }

  const { room } = useParams();
  
  const noFriendButStillCool = room === 'solo';

  const [open, setOpen] = useState(true);
  const [modalStyle] = useState(getModalStyle);
  const handleClose = () => {
    setOpen(false);
  };
  
  // const modalBody = (
   
  // );


  const {
    sceneRef,
    bodyControls,
    pause,
    gravity,
    reverbAmount,
    vibe,
    participants,
    handleBodyControls,
    handleSettingTheVibe,
    handleReverbChange,
    handleGravityChange,
    handlePause,
    handleUndo,
    handleStatic,
    handleLoop
  } = useMatterCollab({ noFriendButStillCool, canvasX, canvasY });
  return (
    <article>
      <ControlsDrawer
        handleBodyControls={handleBodyControls}
        bodyControls={bodyControls}
        maxCanvas={canvasX}
        handleUndo={handleUndo}
        pause={pause}
        handlePause={handlePause}
        gravity={gravity}
        handleGravityChange={handleGravityChange}
        vibe={vibe}
        handleSettingTheVibe={handleSettingTheVibe}
        reverbAmount={reverbAmount}
        handleReverbChange={handleReverbChange}
        handleStatic={handleStatic}
        handleLoop={handleLoop}
      />
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={open} timeout={{ enter: 800, exit: 600 }}>
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
            Number of participants:{participants}
            </p>
            <button onClick={handleClose}>begin</button>
          </div>
        </Fade>
      </Modal>
      <div
        ref={sceneRef}
        className={room === 'solo' ? styles.solo : styles.collab}
      ></div>
    </article>
  );
};
      
export default RoomsPage;
