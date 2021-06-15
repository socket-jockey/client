import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormGroup,
  InputLabel,
  Slider,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const BodyControls = ({
  handleBodyControls,
  bodyControls,
  maxCanvas,
  handleUndo,
  handleStatic,
  handleLoop
}) => {
  return (
    <FormGroup>
      <ToggleButtonGroup
        size="small"
        value={bodyControls.shape}
        onChange={(_, value) => handleBodyControls('shape', value)}
        exclusive
      >
        <ToggleButton value="CIRCLE">circle</ToggleButton>
        <ToggleButton value="SQUARE">square</ToggleButton>
        <ToggleButton value="TRIANGLE">triangle</ToggleButton>
        <ToggleButton value="HEXAGON">hexagon</ToggleButton>
        <ToggleButton value="polygon">polygon</ToggleButton>
        <ToggleButton value="orbit">orbit</ToggleButton>
        <ToggleButton value="draw">draw</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        size="small"
        value={bodyControls.material}
        onChange={(_, value) => handleBodyControls('material', value)}
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
          Size
          <Slider
            value={bodyControls.size}
            onChange={(_, value) => handleBodyControls('size', value)}
            min={0}
            max={27}
            step={1}
            marks
          />
        </InputLabel>
        <InputLabel>
          Air Friction
          <Slider
            value={bodyControls.speed}
            onChange={(_, value) => handleBodyControls('speed', value)}
            min={0}
            max={1}
            step={0.01}
          />
        </InputLabel>
        <InputLabel>
          Loop Size
          <Slider
            value={bodyControls.loopSize}
            onChange={(_, value) => handleBodyControls('loopSize', value)}
            min={50}
            max={maxCanvas}
          />
        </InputLabel>
      </FormGroup>
      <ToggleButtonGroup
        value={bodyControls.doesLoop && 'doesLoop'}
        onChange={handleLoop}
        exclusive
      >
        <ToggleButton value="doesLoop">loop</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={bodyControls.isStatic && 'isStatic'}
        onChange={handleStatic}
        exclusive
      >
        <ToggleButton value="isStatic">static</ToggleButton>
      </ToggleButtonGroup>
      <Button onClick={handleUndo} variant="outlined">
        undo
      </Button>
    </FormGroup>
  );
};

BodyControls.propTypes = {
  bodyControls: PropTypes.shape({
    shape: PropTypes.string.isRequired,
    isStatic: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    material: PropTypes.string.isRequired,
    doesLoop: PropTypes.bool.isRequired,
    loopSize: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    toggles: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  handleBodyControls: PropTypes.func.isRequired,
  handleStatic: PropTypes.func.isRequired,
  handleLoop: PropTypes.func.isRequired,
  maxCanvas: PropTypes.number.isRequired,
  handleUndo:PropTypes.func.isRequired,
};

export default BodyControls;
