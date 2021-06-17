import React from 'react';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RoomsPage.css';
import { Grid } from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import { Animated } from 'react-animated-css';
import FadeIn from 'react-fade-in';
import { SocketContext } from '../app/context/socketProvider';

const RoomSelectionPage = ({ userId }) => {
  const socket = useContext(SocketContext);
  const history = useHistory();
  const [collabAnimation, setCollabAnimation] = useState(true);
  const [visible, setVisible] = useState(false);
  const [customRoomId, setCustomRoomId] = useState('');

  const handleBlackMountain = () => {
    setCollabAnimation(false);
    setVisible(() => true);
    // setTimeout(() => {
    //   setVisible(() => true);
    // }, 2000);
  };

  const handleSoloMountain = () => {
    setCollabAnimation(false);
    setTimeout(() => {
      history.push('/rooms/solo');
    }, 3700);
  };

  const handleCollabJoin = (e, roomId) => {
    e.preventDefault();
    socket.emit('set roomId & join', { userId, customRoomId: roomId });
    history.push(`/rooms/collab/${roomId ? roomId : ''}`);
  };

  return (
    <FadeIn transitionDuration={4800}>
      <Container
        style={{
          height: '100vh',
          overflow: 'hidden',
        }}
        maxWidth={false}
      >
        <Grid container direction="row" wrap="wrap">
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <div
              style={{
                height: '100vh',
              }}
            >
              <div onClick={handleSoloMountain}>
                <img
                  src="https://i.imgur.com/kMsm46E.png"
                  alt="solo world experience"
                  className={styles.soloClouds}
                />
                <img
                  src="https://i.imgur.com/9wSFL7M.png"
                  alt="solo world experience"
                  className={styles.soloText}
                />
                <Animated
                  animationOut="slideOutLeft"
                  animationOutDuration={5000}
                  isVisible={collabAnimation}
                  className={styles.slideLeft}
                >
                  <img
                    src="https://i.imgur.com/CCh62Ir.png"
                    alt="solo world experience"
                    className={styles.soloMountains}
                  />
                </Animated>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <div
              className={styles.collabSection}
              style={{
                height: '100vh',
              }}
            >
              <img
                src="https://i.imgur.com/8jDSKJW.png"
                alt="collaborative world experience"
                className={styles.collabClouds}
                style={{
                  justifyContent: 'center',
                }}
              />

              <img
                src="https://i.imgur.com/WGq5sFA.png"
                alt="collaborative world experience"
                className={styles.collabText}
                style={{
                  justifyContent: 'center',
                }}
              />
              <Animated
                animationOut="slideOutLeft"
                animationOutDuration={5000}
                isVisible={collabAnimation}
                className={styles.slideRight}
              >
                <div onClick={handleBlackMountain}>
                  <img
                    src="https://i.imgur.com/nDa5QFE.png"
                    alt="collaborative world experience"
                    className={styles.collabWhiteMountains}
                    style={{
                      justifyContent: 'center',
                    }}
                  />
                </div>
              </Animated>
              <Animated
                animationOut="slideOutRight"
                animationOutDuration={5000}
                isVisible={collabAnimation}
                className={styles.slideRight}
              >
                <div onClick={handleBlackMountain}>
                  <img
                    src="https://i.imgur.com/wCb8kLF.png"
                    alt="collaborative world experience"
                    className={styles.collabBlackMountains}
                  />
                </div>
              </Animated>

              <button
                style={{
                  backgroundImage: 'url(https://i.imgur.com/z1gULar.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
                onClick={(e) => {
                  handleCollabJoin(e, customRoomId);
                }}
                className={visible ? styles.showJoinButton : styles.hide}
              ></button>
              <form style={{ display: 'flex' }}>
                <input
                  type="text"
                  placeholder="room name"
                  value={customRoomId}
                  onChange={(e) => setCustomRoomId(e.target.value)}
                  className={visible ? styles.showCustomInput : styles.hide}
                />
                <button
                  style={{
                    backgroundImage: 'url(https://i.imgur.com/aEV7zym.png)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
                  onClick={(e) => {
                    handleCollabJoin(e, customRoomId);
                  }}
                  className={visible ? styles.showCustomButton : styles.hide}
                  
                ></button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </FadeIn>
  );
};

RoomSelectionPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default RoomSelectionPage;
