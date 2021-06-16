import * as Tone from 'tone';

export const useAudio = (reverbRef, gainRef) => {
  Tone.start();
  const limiter = new Tone.Limiter(-20).toDestination();
  reverbRef.current = new Tone.Reverb().connect(limiter);
  gainRef.current.connect(reverbRef.current);
};
