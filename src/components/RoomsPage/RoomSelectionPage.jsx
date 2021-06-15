import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RoomsPage.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const RoomSelectionPage = () => {
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
            <Link to="/rooms/solo">
              <img
                src="/solo.png"
                alt="solo world experience"
                className={styles.soloImage}
                style={{
                  marginTop: '30%',
                }}
              />
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <div
            style={{
              height: '100vh',
            }}
          >
            <Link to="/rooms/collab">
              <img
                src="/collab.png"
                alt="collaborative world experience"
                className={styles.collabImage}
                style={{
                  justifyContent: 'center',
                }}
              />
            </Link>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoomSelectionPage;
