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
    <FormGroup>
      <ToggleButtonGroup
        size="small"
        value={bodyControls.shape}
        onChange={(_, value) => bodyControlsHandler('shape', value)}
        exclusive
      >
        <ToggleButton value="circle">circle</ToggleButton>
        <ToggleButton value="square">square</ToggleButton>
        <ToggleButton value="triangle">triangle</ToggleButton>
        <ToggleButton value="hexagon">hexagon</ToggleButton>
        <ToggleButton value="polygon">polygon</ToggleButton>
        <ToggleButton value="orbit">orbit</ToggleButton>
        <ToggleButton value="draw">draw</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        size="small"
        value={bodyControls.material}
        onChange={(_, value) => bodyControlsHandler('material', value)}
        exclusive
      >
        <ToggleButton value="wood">wood</ToggleButton>
        <ToggleButton value="metal">metal</ToggleButton>
        <ToggleButton value="bubble">bubble</ToggleButton>
        <ToggleButton value="cloth">cloth</ToggleButton>
        <ToggleButton value="synthetic">synthetic</ToggleButton>
        <ToggleButton value="rain cloud">rain cloud</ToggleButton>
        <ToggleButton value="rubber">rubber</ToggleButton>
        <ToggleButton value="crystal">crystal</ToggleButton>
        <ToggleButton value="glitter">glitter</ToggleButton>
        <ToggleButton value="liquid">liquid</ToggleButton>
        <ToggleButton value="random">random</ToggleButton>
      </ToggleButtonGroup>
      <FormGroup>
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
        <ToggleButton value="wrap">wrap</ToggleButton>
        <ToggleButton value="static">static</ToggleButton>
      </ToggleButtonGroup>
      <Button onClick={handleBodyRemove} variant="outlined">
        undo
      </Button>
    </FormGroup>
  );
};

BodyControls.propTypes = {};

export default BodyControls;
