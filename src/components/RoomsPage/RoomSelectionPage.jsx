import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RoomsPage.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Animated } from 'react-animated-css';

const RoomSelectionPage = () => {
  const history = useHistory();
  const [collabAnimation, setCollabAnimation] = useState(true);

  const handleBlackMountain = () => {
    setCollabAnimation(false);
  };

  const handleWhiteMountain = () => {
    
  };

  const handleSoloMountain = () => {
    setCollabAnimation(false);
    setTimeout(() => {
      history.push('/rooms/solo');
    }, 2000);
  };

  return (
    <Container
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
      maxWidth={false}
    >
      <Grid container direction="row" wrap="wrap">
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <div
            style={{
              height: '100vh',
            }}
          >
              <a onClick={handleSoloMountain}>
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
            </a>
            </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <div
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
              <a onClick={handleBlackMountain}>
                <img
                  src="https://i.imgur.com/nDa5QFE.png"
                  alt="collaborative world experience"
                  className={styles.collabWhiteMountains}
                  style={{
                    justifyContent: 'center',
                  }}
                />
              </a>
            </Animated>
            <Animated
              animationOut="slideOutRight"
              animationOutDuration={5000}
              isVisible={collabAnimation}
              className={styles.slideRight}
            >
              <a onClick={handleBlackMountain}>
                <img
                  src="https://i.imgur.com/wCb8kLF.png"
                  alt="collaborative world experience"
                  className={styles.collabBlackMountains}
                />
              </a>
            </Animated>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoomSelectionPage;
