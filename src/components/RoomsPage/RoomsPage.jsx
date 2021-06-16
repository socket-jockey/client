import React from 'react';
import { useParams } from 'react-router';
import styles from './RoomsPage.css';
import ControlsDrawer from '../controls/ControlsDrawer';
import { useMatterCollab } from '../app/hooks/useMatterCollab';

const RoomsPage = () => {
  let canvasX, canvasY;

  if (room === 'collab') {
    canvasX = window.innerWidth;
    canvasY = window.innerHeight;
  } else {
    canvasX = window.innerWidth;
    canvasY = window.innerHeight;
  }

  const { room } = useParams();
  const noFriendButStillCool = room === 'solo';
  const {
    sceneRef,
    bodyControls,
    pause,
    gravity,
    reverbAmount,
    vibe,
    handleBodyControls,
    handleSettingTheVibe,
    handleReverbChange,
    handleGravityChange,
    handlePause,
    handleUndo,
    handleStatic,
    handleLoop,
  } = useMatterCollab({ noFriendButStillCool, canvasX, canvasY });
  return (
    <>
      <div
        style={{
          position: 'relative',
        }}
      >
        <header
          style={{
            position: 'absolute',
            top: '0px',
            right: '0px',
            paddingRight: '1rem',
          }}
        >
          <ControlsDrawer
            handleBodyControls={handleBodyControls}
            bodyControls={bodyControls}
            maxCanvas={canvasX}
            handleUndo={handleUndo}
            pause={pause}
            handlePause={handlePause}
            gravity={gravity}
            handleGravityChange={handleGravityChange}
            vibe={vibe}
            handleSettingTheVibe={handleSettingTheVibe}
            reverbAmount={reverbAmount}
            handleReverbChange={handleReverbChange}
            handleStatic={handleStatic}
            handleLoop={handleLoop}
          />
        </header>
      </div>
      <div
        ref={sceneRef}
        className={room === 'solo' ? styles.solo : styles.collab}
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '100vh',
          paddingBottom: '4rem',
        }}
      ></div>
    </>
  );
};

export default RoomsPage;
