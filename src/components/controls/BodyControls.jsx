import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.css';
import {
  Button,
  FormGroup,
  InputLabel,
  Slider,
  Container,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const BodyControls = ({
  handleBodyControls,
  bodyControls,
  maxCanvas,
  handleUndo,
  handleStatic,
  handleLoop,
}) => {
  return (
    <FormGroup>
      <ToggleButtonGroup
        size="small"
        value={bodyControls.shape}
        onChange={(_, value) => handleBodyControls('shape', value)}
        exclusive
        className={styles.toggleGroup}
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
        className={styles.toggleGroup}
      >
        <ToggleButton value="WOOD">wood</ToggleButton>
        <ToggleButton value="METAL">metal</ToggleButton>
        <ToggleButton value="BUBBLE">bubble</ToggleButton>
        <ToggleButton value="CLOTH">cloth</ToggleButton>
        <ToggleButton value="SYNTHETIC">synthetic</ToggleButton>
        <ToggleButton value="RAIN CLOUD">rain cloud</ToggleButton>
        <ToggleButton value="RUBBER">rubber</ToggleButton>
        <ToggleButton value="CRYSTAL">crystal</ToggleButton>
        <ToggleButton value="GLITTER">glitter</ToggleButton>
        <ToggleButton value="LIQUID">liquid</ToggleButton>
        <ToggleButton value="RANDOM">random</ToggleButton>
      </ToggleButtonGroup>
      <FormGroup>
        <InputLabel>
          Size
          <Slider
            value={bodyControls.size}
            onChange={(_, value) => handleBodyControls('size', value)}
            min={-27}
            max={0}
            step={1}
            marks
            orientation="vertical"
          />
        </InputLabel>
        <InputLabel>
          Air Friction
          <Slider
            value={bodyControls.speed}
            onChange={(_, value) => handleBodyControls('speed', value)}
            min={bodyControls.size / -200}
            max={0.5}
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
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ToggleButtonGroup
          value={bodyControls.doesLoop && 'doesLoop'}
          onChange={handleLoop}
          exclusive
        >
          <ToggleButton size="large" value="doesLoop">
            loop
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={bodyControls.isStatic && 'isStatic'}
          onChange={handleStatic}
          exclusive
        >
          <ToggleButton size="large" value="isStatic">
            static
          </ToggleButton>
        </ToggleButtonGroup>
      </Container>
      <Button
        style={{ margin: '1rem' }}
        onClick={handleUndo}
        variant="outlined"
      >
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
    toggles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  handleBodyControls: PropTypes.func.isRequired,
  handleStatic: PropTypes.func.isRequired,
  handleLoop: PropTypes.func.isRequired,
  maxCanvas: PropTypes.number.isRequired,
  handleUndo: PropTypes.func.isRequired,
};

export default BodyControls;
