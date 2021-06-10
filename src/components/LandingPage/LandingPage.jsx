import React from 'react';
import PropTypes from 'prop-types';

const LandingPage = ({ setLanding }) => {
  return <h1 onClick={() => setLanding(false)}>Socket Jockey</h1>;
};

LandingPage.propTypes = {
  setLanding: PropTypes.func.isRequired,
};

export default LandingPage;
