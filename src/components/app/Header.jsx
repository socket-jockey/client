import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ room, setRoom }) => {
  return (
    <header>
      <h3>
        Header
        {room && <p onClick={() => setRoom('')}>exit {room} room</p>}
      </h3>
    </header>
  );
};

Header.propTypes = {};

export default Header;
