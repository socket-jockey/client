import React, { useState } from 'react';
import { useParams } from 'react-router';
import styles from './RoomsPage.css';
import ControlsDrawer from '../controls/ControlsDrawer';
import { useMatterCollab } from '../app/hooks/useMatterCollab';
<<<<<<< HEAD

const RoomsPage = () => {
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
=======
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
    canvasX = window.innerWidth;
    canvasY = window.innerHeight;
  } else {
    canvasX = window.innerWidth;
    canvasY = window.innerHeight;
  }

  const { room } = useParams();

  const noFriendButStillCool = room === 'solo';

  const [modalStyle] = useState(getModalStyle);

>>>>>>> 5b394087da7cb8cb510d1fda87b3f83e3f5f89af
  const {
    sceneRef,
    bodyControls,
    pause,
    gravity,
    reverbAmount,
    vibe,
<<<<<<< HEAD
=======
    participants,
    open,
>>>>>>> 5b394087da7cb8cb510d1fda87b3f83e3f5f89af
    handleBodyControls,
    handleSettingTheVibe,
    handleReverbChange,
    handleGravityChange,
    handlePause,
    handleUndo,
    handleStatic,
<<<<<<< HEAD
    handleLoop
=======
    handleLoop,
    handleBegin,
>>>>>>> 5b394087da7cb8cb510d1fda87b3f83e3f5f89af
  } = useMatterCollab({ noFriendButStillCool, canvasX, canvasY });
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <header
        style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          paddingRight: '1rem',
        }}
      ></header>
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
<<<<<<< HEAD
      <div
        ref={sceneRef}
        className={room === 'solo' ? styles.solo : styles.collab}
      ></div>
    </article>
=======
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
            <button onClick={handleBegin}>begin</button>
          </div>
        </Fade>
      </Modal>
      <div
        ref={sceneRef}
        className={room === 'solo' ? styles.solo : styles.collab}
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '100vh',
          paddingBottom: '4rem',
        }}
      ></div>
    </div>
>>>>>>> 5b394087da7cb8cb510d1fda87b3f83e3f5f89af
  );
};

export default RoomsPage;
