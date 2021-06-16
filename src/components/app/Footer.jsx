import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import styles from './App.css';

const Footer = () => {
  return (
    <Container className={styles.Footer}>
      <Typography variant="body1">copyright 2021 MEGAGROUP</Typography>
    </Container>
  );
};

Footer.propTypes = {};

export default Footer;
