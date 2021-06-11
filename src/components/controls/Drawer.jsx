import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import BodyControls from './BodyControls';
import WorldControls from './WorldControls';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({
  bodyControlsHandler,
  bodyControls,
  worldRef,
  handleBodyRemove,
  worldControlsHandler,
  worldControls,
  handleWorldClear,
}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <Button onClick={toggleDrawer('right', true)}>controls</Button>
      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
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
}
