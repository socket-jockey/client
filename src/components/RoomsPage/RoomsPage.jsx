import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from './RoomsPage.css';
import ControlsDrawer from '../controls/ControlsDrawer';
import { useMatterCollab } from '../app/hooks/useMatterCollab';
import { makeStyles } from '@material-ui/core/styles';
import { Fade, Modal, Fab, Drawer, Button } from '@material-ui/core';
import Chat from '../Chat/Chat';
import DrawingRoom from './DrawingRoom';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 400,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: 'transparent',
    border: '10px solid ',
    borderImage: ' linear-gradient(45deg, #FFCED8, #D4BEEE ) 100 10%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

    // background: 'linear-gradient(45deg, #a3c0fa 30%, #e2d3f2 60%)',
  },
  logo: {
    width: '100%',
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
    backgroundColor: '#FFCED8',
  },
  inlineChat: {
    position: 'static',
  },
  button: {
    backgroundImage: 'url(begin.png)',
    margin: '.5rem',
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

const RoomsPage = ({ userId }) => {
  const classes = useStyles();
  const { room, roomId } = useParams();
  let canvasX, canvasY;

  if (room === 'collab') {
    canvasX = window.innerWidth;
    canvasY = window.innerHeight;
  } else {
    canvasX = window.innerWidth;
    canvasY = window.innerHeight;
  }

  const noFriendButStillCool = room === 'solo';

  const [modalStyle] = useState(getModalStyle);

  const [drawerView, setDrawerView] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerView(open);
  };

  const {
    sceneRef,
    bodyControls,
    pause,
    gravity,
    reverbAmount,
    vibe,
    participants,
    open,
    users,
    handleBodyControls,
    handleSettingTheVibe,
    handleReverbChange,
    handleGravityChange,
    handlePause,
    handleUndo,
    handleStatic,
    handleLoop,
    handleBegin,
    handleUserColor,
  } = useMatterCollab({
    noFriendButStillCool,
    canvasX,
    canvasY,
    roomId,
    userId,
  });

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

      {room === 'collab' && <Chat color={users[userId]} />}

      <Modal
        open={room === 'collab' && open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        hideBackdrop={true}
      >
        <Fade in={open} timeout={{ enter: 5800, exit: 600 }}>
          <div style={modalStyle} className={classes.paper}>
            <img
              src="https://i.imgur.com/CZrIZin.png"
              alt=""
              className={classes.logo}
            />
            <section
              style={{
                flexDirection: 'row',
              }}
              // disabled={Object.values(users).includes('red')}
            >
              <Fab
                onClick={() => {
                  handleUserColor('#FB998E');
                }}
                disabled={Object.values(users).includes('#FB998E')}
                style={{
                  backgroundColor: '#FB998E',
                  margin: '1rem',
                }}
                variant="round"
              >
                {' '}
              </Fab>

              <Fab
                onClick={() => {
                  handleUserColor('#A3E5FF');
                }}
                disabled={Object.values(users).includes('#A3E5FF')}
                style={{
                  backgroundColor: '#A3E5FF',
                  margin: '1rem',
                }}
                variant="round"
              >
                {' '}
              </Fab>

              <Fab
                onClick={() => {
                  handleUserColor('#D4BEEE');
                }}
                disabled={Object.values(users).includes('#D4BEEE')}
                style={{
                  backgroundColor: '#D4BEEE',
                  margin: '1rem',
                }}
                variant="round"
              >
                {' '}
              </Fab>
            </section>
            <img
              src="https://i.imgur.com/6j7l3kL.png"
              alt=""
              className={classes.logo}
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
            <img
              onClick={handleBegin}
              src="/begin.png"
              alt="begin session"
              style={{
                marginTop: '2rem',
                width: '25%',
                cursor: 'pointer',
              }}
            />
            <Button onClick={toggleDrawer(true)}>
              <img
                src="https://i.imgur.com/vV1M5YO.png"
                alt="open drawing canvas"
                style={{
                  width: '50%',
                  cursor: 'pointer',
                }}
              />
            </Button>
            <Drawer
              anchor={'left'}
              open={drawerView}
              onClose={toggleDrawer(false)}
              style={{
                opacity: '0.9',
                width: '50%',
                height: '200px',
              }}
            >
              <DrawingRoom />
            </Drawer>
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

RoomsPage.propTypes = {
  userId: PropTypes.string.isRequired,
};
export default RoomsPage;
