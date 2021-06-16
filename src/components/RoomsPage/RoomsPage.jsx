import React, { useState } from 'react';
import { useParams } from 'react-router';
import styles from './RoomsPage.css';
import ControlsDrawer from '../controls/ControlsDrawer';
import { useMatterCollab } from '../app/hooks/useMatterCollab';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Chat from '../CollabRoomPage/Chat';

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
    background: 'linear-gradient(45deg, #a3c0fa 30%, #e2d3f2 60%)',
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

  const {
    sceneRef,
    bodyControls,
    pause,
    gravity,
    reverbAmount,
    vibe,
    participants,
    open,
    socketRef,
    handleBodyControls,
    handleSettingTheVibe,
    handleReverbChange,
    handleGravityChange,
    handlePause,
    handleUndo,
    handleStatic,
    handleLoop,
    handleBegin,
  } = useMatterCollab({ noFriendButStillCool, canvasX, canvasY });
  return (
    <div
      style={{
        position: 'relative',
      }}>
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
        >
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
        </header>
      </div>
      <Chat socketRef={socketRef}/>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={open} timeout={{ enter: 800, exit: 600 }}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Waiting for Collaborators to arrive:  {participants} </h2>
            {/* <p id="simple-modal-description">
              collaborators on the way:  {participants}
            </p> */}
            <button onClick= {handleBegin}>begin</  button>
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
          // paddingBottom: '4rem',
        }}
      >
      </div>
    </div>
  );
};

export default RoomsPage;
