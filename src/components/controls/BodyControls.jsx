import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.css';
import {
  Button,
  FormGroup,
  InputLabel,
  Slider,
  Container,
  Divider,
} from '@material-ui/core';
// import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles({
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  },
  styleButton: {
    border: 'transparent',
  }
});

const BodyControls = ({
  handleBodyControls,
  bodyControls,
  maxCanvas,
  handleUndo,
  handleStatic,
  handleLoop,
}) => {
  const classes = useStyles();
  return (
    <FormGroup>
      <ToggleButtonGroup
        size="small"
        value={bodyControls.shape}
        onChange={(_, value) => handleBodyControls('shape', value ? value : 'CIRCLE')}
        exclusive
        className={`${styles.toggleGroup} ${classes.styleButton}`}
      >
        <ToggleButton value="CIRCLE"
          variant="text">
          <img className={styles.imageIcon} src="https://i.imgur.com/VodNtJk.png/"/>
          
        </ToggleButton>
        <ToggleButton value="SQUARE">
          <img className={styles.imageIcon} src="https://i.imgur.com/icfxcUc.png"/>
        </ToggleButton>
        <ToggleButton value="TRIANGLE">
          <img className={styles.imageIcon} src="https://i.imgur.com/kYqI7g4.png"/>
        </ToggleButton>
        <ToggleButton value="HEXAGON">
          <img className={styles.imageIcon} src="https://i.imgur.com/QmJRIds.png/"/>
        </ToggleButton>
        <ToggleButton value="CLOUD">
          <img className={styles.imageIcon} src="https://i.imgur.com/qxER60X.png"/>
        </ToggleButton>
        <ToggleButton value="WALL">
          <img className={styles.imageIcon} src="https://i.imgur.com/rTlVMo6.png"/>
        </ToggleButton>
        <ToggleButton value="FLOOR">
          <img className={styles.imageIcon} src="https://i.imgur.com/zgRUOzc.png"/>
        </ToggleButton>
        <ToggleButton value="CHICHI">
          <img className={styles.imageIcon} src="https://i.imgur.com/4iHbj73.png"/>
        </ToggleButton>
        
      </ToggleButtonGroup>
      <ToggleButtonGroup
        size="small"
        value={bodyControls.material}
        onChange={(_, value) => handleBodyControls('material', value ? value : 'WOOD')}
        exclusive
        className={styles.toggleGroup}
        style={{
          justifyContent: 'center',
        }}
      >
        <ToggleButton value="WOOD">
          <img className={styles.imageIcon} src="https://i.imgur.com/PaAZwLQ.png"/>
        </ToggleButton>
        <ToggleButton value="METAL">
          <img className={styles.imageIcon} src="https://i.imgur.com/okP30in.png"/>
        </ToggleButton>
        <ToggleButton value="BUBBLE">
          <img className={styles.imageIcon} src="https://i.imgur.com/cG1vQd8.png"/>
        </ToggleButton>
        <ToggleButton value="RUBBER">
          <img className={styles.imageIcon} src="https://i.imgur.com/9iU4m3R.png"/>
        </ToggleButton>
        <ToggleButton value="GLITTER">
          <img className={styles.imageIcon} src="https://i.imgur.com/OJgScgJ.png"/>
        </ToggleButton>
        <ToggleButton value="CLOTH">
          <img className={styles.imageIcon} src="https://i.imgur.com/Q7rMOEV.png"/>
        </ToggleButton>
        <ToggleButton value="LIQUID">
          <img className={styles.imageIcon} src="https://i.imgur.com/otlpm8e.png"/>
        </ToggleButton>
      </ToggleButtonGroup>
      <Divider
        style={{
          height: '1rem',
          backgroundColor: 'white',
        }}
      />
      <FormGroup>
        <InputLabel>
          <img className={`${styles.imageIcon} ${styles.sizing}`} src="https://i.imgur.com/T940Sx0.png"/>
          <Slider
            value={bodyControls.size}
            onChange={(_, value) => handleBodyControls('size', value)}
            min={-27}
            max={0}
            step={1}
            marks
          />
        </InputLabel>
        <InputLabel>
          <img className={`${styles.imageIcon} ${styles.sizing}`} src="https://i.imgur.com/MCNe902.png"/>
          <Slider
            value={bodyControls.loopSize}
            onChange={(_, value) => handleBodyControls('loopSize', value)}
            min={50}
            max={maxCanvas}
          />
        </InputLabel>
      </FormGroup>
      <Divider
        style={{
          height: '1rem',
          backgroundColor: 'white',
        }}
      />
      <Container>
        <ToggleButtonGroup
          value={bodyControls.doesLoop && 'doesLoop'}
          onChange={handleLoop}
          exclusive
          style={{ marginLeft: '22%' }}
        >
          <ToggleButton size="large" value="doesLoop">

            <img className={`${styles.imageIcon} ${styles.loopers}`} src="https://i.imgur.com/S1V1vRH.png"/>
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={bodyControls.isStatic && 'isStatic'}
          onChange={handleStatic}
          exclusive
          style={{ marginLeft: '25%' }}
        >
          <ToggleButton size="large" value="isStatic">

            <img className={`${styles.imageIcon} ${styles.loopers}`} src="https://i.imgur.com/XNT6FDi.png"/>
          </ToggleButton>
        </ToggleButtonGroup>
      </Container>
      <Divider
        style={{
          height: '1rem',
          backgroundColor: 'white',
        }}
      />
      <Container
        className={styles.deleteButtons}
      >
        <Button
          style={{ margin: '1.5rem' }}
          onClick={handleUndo}
        >
          <img className={`${styles.imageIcon} ${styles.undo}`} src="https://i.imgur.com/D0IYd5o.png"/>
        </Button>
        <Button
          style={{ margin: '1.5rem' }}
          // onClick={handleClearAll}
        >
          <img className={`${styles.imageIcon} ${styles.undo}`} src="https://i.imgur.com/LftdK8C.png"/>
        </Button>
      </Container>
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
