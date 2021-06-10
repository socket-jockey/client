import React from 'react';
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

const BodyControls = ({
  bodyControls,
  worldRef,
  bodyControlsHandler,
  handleBodyRemove,
}) => {
  return (
    <Container>
      <FormGroup style={{ width: 300 }}>
        <InputLabel>
          Synth Pitch
          <Slider
            value={bodyControls.synthPitch}
            onChange={(_, value) => bodyControlsHandler('synthPitch', value)}
            min={0}
            max={27}
            step={1}
            marks
          />
        </InputLabel>
        <InputLabel>
          Air Friction
          <Slider
            value={bodyControls.frictionAir}
            onChange={(_, value) => bodyControlsHandler('frictionAir', value)}
            min={0}
            max={1}
            step={0.01}
          />
        </InputLabel>
        <InputLabel>
          Wrap X
          <Slider
            value={bodyControls.wrapX}
            onChange={(_, value) => bodyControlsHandler('wrapX', value)}
            min={50}
            max={worldRef.current.worldSize.x}
          />
        </InputLabel>
        <InputLabel>
          Wrap Y
          <Slider
            value={bodyControls.wrapY}
            onChange={(_, value) => bodyControlsHandler('wrapY', value)}
            min={50}
            max={worldRef.current.worldSize.y}
          />
        </InputLabel>
      </FormGroup>
      <ToggleButtonGroup
        value={bodyControls.toggles}
        onChange={(_, value) => bodyControlsHandler('toggles', value)}
      >
        <ToggleButton
          value="wrap"
          // selected={bodyControls.wrap}
          // onChange={() => {
          //   bodyControlsHandler('wrap', !bodyControls.wrap);
          // }}
        >
          wrap
        </ToggleButton>
        <ToggleButton
          value="static"
          // selected={bodyControls.static}
          // onChange={() => {
          //   bodyControlsHandler('static', !bodyControls.static);
          // }}
        >
          static
        </ToggleButton>
      </ToggleButtonGroup>
      <Button onClick={handleBodyRemove} variant="outlined">
        undo
      </Button>
    </Container>
  );
};

BodyControls.propTypes = {};

export default BodyControls;
