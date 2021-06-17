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
import Icon from '@material-ui/core/Icon';
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
        onChange={(_, value) => handleBodyControls('shape', value)}
        exclusive
        className={styles.toggleGroup}
      >
        <ToggleButton value="CIRCLE">
          <Icon classes={classes.imageIcon}>
            <img className={styles.circle} src="https://i.imgur.com/VodNtJk.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="SQUARE">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/icfxcUc.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="TRIANGLE">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/kYqI7g4.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="HEXAGON">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/diZEQHK.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="CLOUD">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/qxER60X.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="WALL">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/BSfqyE1.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="FLOOR">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/zgRUOzc.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="CHICHI">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/4iHbj73.png"/>
          </Icon>
        </ToggleButton>
        
      </ToggleButtonGroup>
      <ToggleButtonGroup
        size="small"
        value={bodyControls.material}
        onChange={(_, value) => handleBodyControls('material', value)}
        exclusive
        className={styles.toggleGroup}
        style={{
          justifyContent: 'center',
        }}
      >
        <ToggleButton value="WOOD">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/4iHbj73.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="METAL">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/4iHbj73.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="BUBBLE">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/4iHbj73.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="CLOTH">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/4iHbj73.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="RUBBER">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/4iHbj73.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="GLITTER">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/4iHbj73.png"/>
          </Icon>
        </ToggleButton>
        <ToggleButton value="LIQUID">
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/4iHbj73.png"/>
          </Icon>
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
          Pitch
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/T940Sx0.png"/>
          </Icon>
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
          Air Friction
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/t5ajoTR.png"/>
          </Icon>
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
          <Icon classes={classes.imageIcon}>
            <img className={styles.imageIcon} src="https://i.imgur.com/MCNe902.png"/>
          </Icon>
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
            <Icon classes={classes.imageIcon}>
              <img className={styles.imageIcon} src="https://i.imgur.com/S1V1vRH.png"/>
            </Icon>
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={bodyControls.isStatic && 'isStatic'}
          onChange={handleStatic}
          exclusive
          style={{ marginLeft: '25%' }}
        >
          <ToggleButton size="large" value="isStatic">
            <Icon classes={classes.imageIcon}>
              <img className={styles.imageIcon} src="https://i.imgur.com/XNT6FDi.png"/>
            </Icon>
          </ToggleButton>
        </ToggleButtonGroup>
      </Container>
      <Divider
        style={{
          height: '1rem',
          backgroundColor: 'white',
        }}
      />
      <Button
        style={{ margin: '1rem' }}
        onClick={handleUndo}
        variant="outlined"
      >
        <Icon classes={classes.imageIcon}>
          <img className={styles.imageIcon} src="https://i.imgur.com/RcCT1T6.png"/>
        </Icon>
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
