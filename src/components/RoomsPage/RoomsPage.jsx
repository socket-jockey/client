import React, { useState } from 'react';
import { useParams } from 'react-router';
import styles from './RoomsPage.css';
import ControlsDrawer from '../controls/ControlsDrawer';
import { useMatterCollab } from '../app/hooks/useMatterCollab';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Chat from '../Chat/Chat';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
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
  logo: {
    width: '20%',
  },
  dotContainer: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  dots: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'lightgrey',
  },
  dotFilled: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'blue',
  },
  inlineChat: {
    position: 'static',
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
    <main>
      <header className={styles.header}>
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

      {room === 'collab' && <Chat />}

      <Modal
        open={room === 'collab' && open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={open} timeout={{ enter: 800, exit: 600 }}>
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Welcome to the Collab Room!</h2>
            <p>
              Wait here until others arrive, then push begin when everyone is
              ready.
            </p>
            <img
              className={classes.logo}
              src="https://icon-library.com/images/36f183ca9c_30066.png"
              alt=""
            />
            <section className={classes.dotContainer}>
              <div className={classes.dotFilled}></div>
              <div
                className={participants >= 2 ? classes.dotFilled : classes.dots}
              ></div>
              <div
                className={
                  participants === 3 ? classes.dotFilled : classes.dots
                }
              ></div>
            </section>
            {/* {open && <Chat className={classes.inlineChat}/>} */}
            {/* <p id="simple-modal-description">
              Number of participants:{participants}
            </p> */}
            <button onClick={handleBegin}>begin</button>
          </div>
        </Fade>
      </Modal>
      <section
        ref={sceneRef}
        className={room === 'solo' ? styles.solo : styles.collab}
      ></section>
    </main>
  );
};

export default RoomsPage;
