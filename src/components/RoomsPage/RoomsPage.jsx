import React, { useState } from 'react';
import { useParams } from 'react-router';
import styles from './RoomsPage.css';
import ControlsDrawer from '../controls/ControlsDrawer';
import { useMatterCollab } from '../app/hooks/useMatterCollab';
import { makeStyles } from '@material-ui/core/styles';
import { Fade, Modal, Fab, Typography, Button, Drawer } from '@material-ui/core';
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
    backgroundColor: '#FFCED8',
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

  const [drawerView, setDrawerView] = useState(false);
  const [chatView, setChatView] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerView(open);
  };

  const toggleChat = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setChatView(open);
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
    userId,
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

      {room === 'collab' && <Chat color={users[userId]} />}

      <Modal
        open={room === 'collab' && open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        hideBackdrop={true}
      >
        <Fade in={open} timeout={{ enter: 800, exit: 600 }}>
          <div style={modalStyle} className={classes.paper}>
            <section
              style={{
                flexDirection: 'row',
              }}
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
                choose
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
                your
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
                color
              </Fab>
            </section>

            <Typography
              variant="h3"
              align="center"
              gutterBottom={true}
              id="simple-modal-title"
              className={styles.modalTitle}
            >
              Welcome to the Collab Room!
            </Typography>

            <Typography variant="caption" align="center" gutterBottom={true}>
              Wait here until others arrive, then push begin when everyone is
              ready.
            </Typography>
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
            <Button onClick={handleBegin} style={{ margin: '.5rem' }}>
              begin
            </Button>
            <Button onClick={toggleDrawer(true)}>Pass the Time</Button>
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
            <Button onClick={toggleChat(true)}>Chat</Button>
            <Drawer
              anchor={'right'}
              open={chatView}
              onClose={toggleChat(false)}
              style={{
                opacity: '0.9',
              }}
            >
              <Chat />
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

export default RoomsPage;
