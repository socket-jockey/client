import React from 'react';
import PropTypes from 'prop-types';
import style from './LandingPage.css';

const LandingPage = ({ setLanding }) => {
  return (
    <div onClick={() => setLanding(false)} className={style.titleContainer}>
      <p className={style.colorChange}>
        Socket
        <br />
        Jockey
      </p>
      <img
        src="/theHole.png"
        alt="the hole"
        className={style.hole}
      />
    </div>
  );
};

LandingPage.propTypes = {
  setLanding: PropTypes.func.isRequired,
};

export default LandingPage;
