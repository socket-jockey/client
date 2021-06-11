import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  FormGroup,
  InputLabel,
  Slider,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const WorldControls = ({
  worldControls,
  worldRef,
  worldControlsHandler,
  handleWorldClear,
}) => {
  // const [reverb, setReverb] = useState(0);

  return (
    <Container>
      <FormGroup style={{ width: 300 }}>
        <InputLabel>
          X Gravity
          <Slider
            value={worldControls.gravityX}
            onChange={(_, value) => worldControlsHandler('gravityX', value)}
            min={-1}
            max={1}
            step={0.1}
            valueLabelDisplay="auto"
          />
        </InputLabel>
        <InputLabel>
          Y Gravity
          <Slider
            value={worldControls.gravityY}
            onChange={(_, value) => worldControlsHandler('gravityY', value)}
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
            value={worldControls.reverb}
            // onChange={(_, value) => setReverb(value)}
            onChange={(_, value) => worldControlsHandler('reverb', value)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </InputLabel>
      </FormGroup>
      <ToggleButtonGroup
        value={worldControls.toggles}
        onChange={(_, value) => worldControlsHandler('toggles', value)}
      >
        <ToggleButton value="pause motion">pause motion</ToggleButton>
      </ToggleButtonGroup>
      <Button onClick={handleWorldClear} variant="outlined">
        remove all
      </Button>
    </Container>
  );
};

WorldControls.propTypes = {};

export default WorldControls;
