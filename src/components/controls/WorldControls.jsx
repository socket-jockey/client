import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  // Button,
  Container,
  FormGroup,
  InputLabel,
  Slider,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const WorldControls = ({
  pause,
  handlePause,
  gravity,
  handleGravityChange,
  vibe,
  handleSettingTheVibe,
  reverbAmount,
  handleReverbChange,
}) => {

  return (
    <Container>
      <FormGroup>
        <InputLabel>
          X Gravity
          <Slider
            value={gravity.x}
            onChange={(_, value) => handleGravityChange('x', value)}
            min={-1}
            max={1}
            step={0.1}
            valueLabelDisplay="auto"
          />
        </InputLabel>
        <InputLabel>
          Y Gravity
          <Slider
            value={gravity.y}
            onChange={(_, value) => handleGravityChange('y', value)}
            min={-1}
            max={1}
            step={0.1}
            valueLabelDisplay="auto"
          />
        </InputLabel>
        <InputLabel>
          Reverb
          <Slider
            // value={reverb}
            value={reverbAmount}
            // onChange={(_, value) => setReverb(value)}
            onChange={handleReverbChange}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </InputLabel>
      </FormGroup>
      <ToggleButtonGroup
        value={pause}
        onChange={handlePause}
        exclusive
      >
        <ToggleButton value="paused">pause motion</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={vibe}
        onChange={handleSettingTheVibe}
        exclusive
      >
        <ToggleButton value="MAJOR">major</ToggleButton>
        <ToggleButton value="MINOR">minor</ToggleButton>
        <ToggleButton value="CHROMATIC">chromatic</ToggleButton>
      </ToggleButtonGroup>

      {/* <Button onClick={handleWorldClear} variant="outlined">
        remove all
      </Button> */}
    </Container>
  );
};

WorldControls.propTypes = {
  pause: PropTypes.string.isRequired,
  handlePause: PropTypes.func.isRequired,
  gravity: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  handleGravityChange: PropTypes.func.isRequired,
  vibe: PropTypes.string.isRequired,
  handleSettingTheVibe: PropTypes.func.isRequired,
  reverbAmount: PropTypes.number.isRequired,
  handleReverbChange: PropTypes.func.isRequired
};

export default WorldControls;
