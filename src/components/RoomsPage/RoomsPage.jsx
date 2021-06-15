import React from 'react';
import { useParams } from 'react-router';
// import SoloWorld from '../SoloRoomPage/SoloWorld';
// import CollabWorld from '../CollabRoomPage/CollabWorld';
// import BodyControls from '../controls/BodyControls';
// import WorldControls from '../controls/WorldControls';
import styles from './RoomsPage.css';
import ControlsDrawer from '../controls/ControlsDrawer';

const RoomsPage = () => {
  const { room } = useParams();

  return (
    <article>
      <ControlsDrawer
        // bodyControlsHandler={bodyControlsHandler}
        // bodyControls={bodyControls}
        // worldRef={worldRef}
        // handleBodyRemove={handleBodyRemove}
        // worldControlsHandler={worldControlsHandler}
        // worldControls={worldControls}
        // handleWorldClear={handleWorldClear}
      />
      {room === 'solo' ? (
        <section className={styles.solo}>
          {/* <SoloWorld setBodyControls={setBodyControls} bodyRef={bodyRef} /> */}
        </section>
      ) : (
        <section className={styles.collab}>
          {/* <CollabWorld setBodyControls={setBodyControls} bodyRef={bodyRef} /> */}
        </section>
      )}
    </article>
  );
};

export default RoomsPage;
