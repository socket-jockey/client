import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RoomsPage.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const RoomSelectionPage = () => {
  return (
    <Container
    maxWidth='lg'
    >
      <Grid container direction="row" spacing={3} wrap="wrap">
      <Grid item sm={6} md={6} lg={6} xl={6}></Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}  alignItems="center">
          <Link to="/rooms/collab">
            <img
              src="/collab.png"
              alt="collaborative world experience"
              className={styles.collabImage}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}  alignContent="flex-start">
          <Link to="/rooms/solo">
            <img
              src="/solo.png"
              alt="solo world experience"
              className={styles.soloImage}
            />
          </Link>
        </Grid>
         <Grid item sm={6} md={6} lg={6} xl={6}></Grid>
      </Grid>
    </Container>
  );
};

export default RoomSelectionPage;
