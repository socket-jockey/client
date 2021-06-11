import React from 'react';
import PropTypes from 'prop-types';
import style from './LandingPage.css';

const LandingPage = ({ setLanding }) => {
  return (
    <main>
      <h1 onClick={() => setLanding(false)} className={style.colorChange}>
        Socket Jockey
      </h1>
    </main>
  );
};

LandingPage.propTypes = {
  setLanding: PropTypes.func.isRequired,
};

export default LandingPage;
