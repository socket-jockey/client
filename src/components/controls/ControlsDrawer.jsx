import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import BodyControls from './BodyControls';
import WorldControls from './WorldControls';

const ControlsDrawer = ({
  bodyControlsHandler,
  bodyControls,
  worldRef,
  handleBodyRemove,
  worldControlsHandler,
  worldControls,
  handleWorldClear,
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
      <Drawer anchor={'right'} open={drawerView} onClose={toggleDrawer(false)}>
        <BodyControls
          bodyControlsHandler={bodyControlsHandler}
          bodyControls={bodyControls}
          worldRef={worldRef}
          handleBodyRemove={handleBodyRemove}
        />
        <Divider />
        <WorldControls
          worldControlsHandler={worldControlsHandler}
          worldControls={worldControls}
          worldRef={worldRef}
          handleWorldClear={handleWorldClear}
        />
      </Drawer>
    </div>
  );
};

export default ControlsDrawer;
