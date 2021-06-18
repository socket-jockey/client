import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.css';
import {
  Button,
  Container,
  FormGroup,
  InputLabel,
  Slider,
  Divider,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const WorldControls = ({
  gravity,
  handleGravityChange,
  vibe,
  handleSettingTheVibe,
  reverbAmount,
  handleReverbChange,
  handleUndo,
}) => {
  return (
    <FormGroup>
      <InputLabel style={{ position: 'relative' }}>
        <img
          className={`${styles.imageIcon} ${styles.sizing} ${styles.sliderImage}`}
          src="https://i.imgur.com/31CAsd9.png"
        />
        <Slider
          style={{ width: '70%' }}
          className={styles.slider}
          value={gravity.x}
          onChange={(_, value) => handleGravityChange('x', value)}
          min={-1}
          max={1}
          step={0.1}
        />
      </InputLabel>
      <InputLabel style={{ position: 'relative' }}>
        <img
          className={`${styles.imageIcon} ${styles.sizing} ${styles.sliderImage}`}
          src="https://i.imgur.com/tVfuHZQ.png"
        />
        <Slider
          style={{ width: '70%' }}
          className={styles.slider}
          value={gravity.y}
          onChange={(_, value) => handleGravityChange('y', value)}
          min={-1}
          max={1}
          step={0.1}
        />
      </InputLabel>
      <InputLabel style={{ position: 'relative' }}>
        <img
          className={`${styles.imageIcon} ${styles.sizing} ${styles.sliderImage}`}
          src="https://i.imgur.com/WVfRFaI.png"
        />
        <Slider
          style={{ width: '70%' }}
          className={styles.slider}
          value={reverbAmount}
          onChange={handleReverbChange}
          min={0}
          max={100}
        />
      </InputLabel>
      <Divider style={{ height: '2rem', backgroundColor: 'white' }} />
      <Container
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={handleUndo}>
          <img
            className={`${styles.imageIcon} ${styles.undo}`}
            src="https://i.imgur.com/D0IYd5o.png"
          />
        </Button>
        <ToggleButtonGroup
          value={vibe}
          onChange={handleSettingTheVibe}
          exclusive
        >
          <ToggleButton value="MAJOR">
            <img
              className={styles.imageIcon}
              src="https://i.imgur.com/rcisiOE.png"
            />
          </ToggleButton>
          <ToggleButton value="MINOR">
            <img
              className={styles.imageIcon}
              src="https://i.imgur.com/ZDzpIlF.png"
            />
          </ToggleButton>
          <ToggleButton value="CHROMATIC">
            <img
              className={styles.imageIcon}
              src="https://i.imgur.com/rBdXM63.png"
            />
          </ToggleButton>
        </ToggleButtonGroup>
        <Button>
          <img
            className={`${styles.imageIcon} ${styles.undo}`}
            src="https://i.imgur.com/LftdK8C.png"
          />
        </Button>
      </Container>
    </FormGroup>
  );
};

WorldControls.propTypes = {
  gravity: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  handleGravityChange: PropTypes.func.isRequired,
  vibe: PropTypes.string.isRequired,
  handleSettingTheVibe: PropTypes.func.isRequired,
  reverbAmount: PropTypes.number.isRequired,
  handleReverbChange: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
};

export default WorldControls;
