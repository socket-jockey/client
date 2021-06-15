import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';
import SoloWorld from '../SoloRoomPage/SoloWorld';
// import CollabWorld from '../CollabRoomPage/CollabWorld';
// import BodyControls from '../controls/BodyControls';
// import WorldControls from '../controls/WorldControls';
import styles from './RoomsPage.css';
import ControlsDrawer from '../controls/ControlsDrawer';
import Chat from '../CollabRoomPage/Chat';

const socket = io.connect('http://localhost:8000');

const RoomsPage = () => {
  const { room } = useParams();
  const [socketRoom, setSocketRoom] = useState('');
  console.log('socketRoom', socketRoom);

  useEffect(() => {
    socket.on('set room', roomFromServer => setSocketRoom(roomFromServer));
  

  }, []);


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
          <SoloWorld />
          <button onClick={() => socket.emit('collab')}>collab</button>
          <Chat socket={socket} socketRoom={socketRoom} />
        </section>
      )}
    </article>
  );
};

export default RoomsPage;
