import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import BodyControls from './BodyControls';
import WorldControls from './WorldControls';
import PropTypes from 'prop-types';

const ControlsDrawer = ({
  handleBodyControls,
  bodyControls,
  maxCanvas,
  handleUndo,
  pause,
  handlePause,
  gravity,
  handleGravityChange,
  vibe,
  handleSettingTheVibe,
  reverbAmount,
  handleReverbChange,
  handleStatic,
  handleLoop,
}) => {
  const [drawerView, setDrawerView] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerView(open);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>controls</Button>
      <Drawer
        anchor={'right'}
        open={drawerView}
        onClose={toggleDrawer(false)}
        style={{
          opacity: '1',
        }}
      >
        <Container>
          <BodyControls
            handleBodyControls={handleBodyControls}
            bodyControls={bodyControls}
            maxCanvas={maxCanvas}
            handleUndo={handleUndo}
            handleStatic={handleStatic}
            handleLoop={handleLoop}
          />
        </Container>

        <Container>
          <WorldControls
            pause={pause}
            handlePause={handlePause}
            gravity={gravity}
            handleGravityChange={handleGravityChange}
            vibe={vibe}
            handleSettingTheVibe={handleSettingTheVibe}
            reverbAmount={reverbAmount}
            handleReverbChange={handleReverbChange}
          />
        </Container>
      </Drawer>
    </div>
  );
};
ControlsDrawer.propTypes = {
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
  maxCanvas: PropTypes.number.isRequired,
  handleUndo: PropTypes.func.isRequired,
  pause: PropTypes.string.isRequired,
  handlePause: PropTypes.func.isRequired,
  handleStatic: PropTypes.func.isRequired,
  handleLoop: PropTypes.func.isRequired,
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
export default ControlsDrawer;
