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
  pause,
  handlePause,
  gravity,
  handleGravityChange,
  vibe,
  handleSettingTheVibe,
  reverbAmount,
  handleReverbChange,
  handleClearAll
}) => {
  return (
    <Container>
      <FormGroup>
        <InputLabel>
          <img className={styles.imageIcon} src="https://i.imgur.com/31CAsd9.png"/>
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
          <img className={styles.imageIcon} src="https://i.imgur.com/tVfuHZQ.png"/>
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
          <img className={styles.imageIcon} src="https://i.imgur.com/WVfRFaI.png"/>  
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
      <Divider style={{ height: '1rem', backgroundColor: 'white' }} />
      <Container
        style={{
          justifyContent: 'center',
        }}
      >
        <ToggleButtonGroup
          value={vibe}
          onChange={handleSettingTheVibe}
          exclusive
          // className={styles.toggleGroup}
          style={{
            marginLeft: '21%',
          }}
        >
          <ToggleButton value="MAJOR">
            <img className={styles.imageIcon} src="https://i.imgur.com/rcisiOE.png"/>
          </ToggleButton>
          <ToggleButton value="MINOR">
            <img className={styles.imageIcon} src="https://i.imgur.com/ZDzpIlF.png"/>          
          </ToggleButton>
          <ToggleButton value="CHROMATIC">
            <img className={styles.imageIcon} src="https://i.imgur.com/rBdXM63.png"/>  
          </ToggleButton>
        </ToggleButtonGroup>
        <Divider style={{ height: '1rem', backgroundColor: 'white' }} />
        <ToggleButtonGroup
          value={pause}
          onChange={handlePause}
          exclusive
          className={styles.toggleGroup}
          style={{
            marginLeft: '35%',
          }}
        >
          <ToggleButton value="paused">
            <img className={styles.imageIcon} src="https://i.imgur.com/hh947yM.png"/>
          </ToggleButton>
        </ToggleButtonGroup>
      </Container>

      <Button onClick={handleClearAll} variant="outlined">
        remove all
      </Button>
    </Container>
  );
};

WorldControls.propTypes = {
  pause: PropTypes.string.isRequired,
  handlePause: PropTypes.func.isRequired,
  gravity: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  handleGravityChange: PropTypes.func.isRequired,
  vibe: PropTypes.string.isRequired,
  handleSettingTheVibe: PropTypes.func.isRequired,
  reverbAmount: PropTypes.number.isRequired,
  handleReverbChange: PropTypes.func.isRequired,
};

export default WorldControls;
