import React from 'react';
import { useParams } from 'react-router';
import styles from './RoomsPage.css';
import ControlsDrawer from '../controls/ControlsDrawer';
import { useMatterCollab } from '../app/hooks/useMatterCollab';

const RoomsPage = () => {
  let canvasX, canvasY;

  if (room === 'collab') {
    canvasX = 1000;
    canvasY = 800;
  } else {
    canvasX = window.innerWidth * 0.8 ;
    canvasY = window.innerHeight * 0.8;
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
    handleLoop
  } = useMatterCollab({ noFriendButStillCool, canvasX, canvasY });
  return (
    <article>
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
      <div
        ref={sceneRef}
        className={room === 'solo' ? styles.solo : styles.collab}
      ></div>
    </article>
  );
};

export default RoomsPage;
