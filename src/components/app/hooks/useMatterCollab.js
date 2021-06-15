import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { addBody } from '../utils/addBody';
import * as Tone from 'tone';
import { scales } from '../utils/scales';
import { io } from 'socket.io-client';

export const useMatterCollab = ({ noFriendButStillCool, canvasX, canvasY }) => {
  try {
    if (typeof MatterWrap !== 'undefined') {
      // either use by name from plugin registry (Browser global)
      Matter.use('matter-wrap');
    } else {
      // or require and use the plugin directly (Node.js, Webpack etc.)
      Matter.use(require('matter-wrap'));
    }
  } catch (e) {
    console.error(e);
  }
  const engineRef = useRef(null);
  const sceneRef = useRef(null);
  const bodyRef = useRef({
    shape: 'CIRCLE',
    isStatic: false,
    size: -27,
    material: 'WOOD',
    doesLoop: false,
    loopSize: 200,
    speed: 0.3,
    toggles: [],
  });
  const reverbRef = useRef(null);
  const gainRef = new useRef(null);
  // const [socketRoom, setSocketRoom] = useState('');
  const [bodyControls, setBodyControls] = useState(bodyRef.current);
  const [gravity, setGravity] = useState({
    x: 0.5,
    y: 0.5,
  });
  const [reverbAmount, setReverbAmount] = useState(50);
  const [vibe, setVibe] = useState('MAJOR');
  const vibeRef = useRef(0);
  const [pause, setPause] = useState('');
  const [pastGrav, setPastGrav] = useState(gravity);

  const Engine = Matter.Engine;
  const Render = Matter.Render;
  // const Bodies = Matter.Bodies;
  const Mouse = Matter.Mouse;
  const MouseConstraint = Matter.MouseConstraint;
  const Composite = Matter.Composite;

  useEffect(() => {
    //socket stuff
    let socket;
    if (!noFriendButStillCool) {
      socket = io.connect('http://localhost:8000');
      socket.emit('collab');
      socket.on('set room', (room) => {
        socket.currentRoom = room;
      });
    }

    //start audio
    Tone.start();
    const limiter = new Tone.Limiter(-20).toDestination();
    reverbRef.current = new Tone.Reverb().connect(limiter);
    gainRef.current = new Tone.Gain(0.9).connect(reverbRef.current);

    // create new engine
    engineRef.current = Engine.create({});

    //set up renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engineRef.current,
      options: {
        width: canvasX,
        height: canvasY,
        wireframes: false,
        // background:'#F8B195',
      },
    });

    Render.setPixelRatio(render, 'auto');

    const mouse = Mouse.create(render.canvas);

    const mouseConstraint = MouseConstraint.create(engineRef.current, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engineRef.current.world, mouseConstraint);

    Matter.Events.on(mouseConstraint, 'mousedown', (event) => {
      if (!noFriendButStillCool) {
        socket.emit('add object', socket.currentRoom, {
          ...bodyRef.current,
          mouseX: event.mouse.mousedownPosition.x,
          mouseY: event.mouse.mousedownPosition.y,
        });
      } else {
        Composite.add(
          engineRef.current.world,
          addBody({
            ...bodyRef.current,
            mouseX: event.mouse.mousedownPosition.x,
            mouseY: event.mouse.mousedownPosition.y,
            canvasX,
            canvasY,
            gainRef,
          })
        );
      }
    });

    Matter.Events.on(
      engineRef.current,
      'collisionStart collisionActive collisionEnd',
      (event) => {
        const { bodyA, bodyB } = event.pairs[0];
        console.log(bodyA, bodyB);
        if (bodyA.synth && bodyA.speed > 1 && bodyA.synth.silent === true) {
          bodyA.synth.volume.value = Math.log(bodyA.speed) - 10;
          bodyA.synth.triggerAttackRelease(
            scales[vibeRef.current][bodyA.pitch],
            '16n'
          );
          bodyA.synth.silent = false;
          setTimeout(() => {
            bodyA.synth.silent = true;
          }, 50);
        }
        if (bodyB.synth && bodyB.speed > 1.5 && bodyB.synth.silent === true) {
          bodyB.synth.volume.value = Math.log(bodyB.speed) - 10;
          bodyB.synth.triggerAttackRelease(
            scales[vibeRef.current][bodyB.pitch],
            '16n'
          );
          bodyB.synth.silent = false;
          setTimeout(() => {
            bodyB.synth.silent = true;
          }, 50);
        }
      }
    );
    !noFriendButStillCool &&
      socket.on(
        'emit add object',
        ({
          shape,
          isStatic,
          size,
          material,
          doesLoop,
          loopSize,
          speed,
          mouseX,
          mouseY,
        }) => {
          Composite.add(
            engineRef.current.world,
            addBody({
              shape,
              isStatic,
              size,
              material,
              doesLoop,
              loopSize,
              speed,
              mouseX,
              mouseY,
              canvasX,
              canvasY,
            })
          );
        }
      );

    Matter.Runner.run(engineRef.current);
    Render.run(render);
  }, []);

  //define handlers
  const handleBodyControls = (key, value) => {
    setBodyControls((prev) => ({ ...prev, [key]: value }));
    bodyRef.current[key] = value;
  };
  const handleGravityChange = (key, value) => {
    setGravity((prev) => ({ ...prev, [key]: value }));
    engineRef.current.gravity[key] = value;
  };
  const handleStatic = () => {
    if (bodyControls.isStatic) {
      setBodyControls((prev) => ({ ...prev, isStatic: false }));
      bodyRef.current.isStatic = false;
    } else {
      setBodyControls((prev) => ({ ...prev, isStatic: true }));
      bodyRef.current.isStatic = true;
    }
  };
  const handleLoop = () => {
    if (bodyControls.doesLoop) {
      setBodyControls((prev) => ({ ...prev, doesLoop: false }));
      bodyRef.current.doesLoop = false;
    } else {
      setBodyControls((prev) => ({ ...prev, doesLoop: true }));
      bodyRef.current.doesLoop = true;
    }
  };

  const handleSettingTheVibe = (_, value) => {
    switch (value) {
      case 'MAJOR':
        vibeRef.current = 0;
        setVibe('MAJOR');
        break;
      case 'MINOR':
        vibeRef.current = 1;
        setVibe('MINOR');
        break;
      case 'CHROMATIC':
        vibeRef.current = 2;
        setVibe('CHROMATIC');
        break;
      default:
        vibeRef.current = 0;
        setVibe('MAJOR');
    }
  };

  const handleReverbChange = (_, value) => {
    setReverbAmount(value);
    const mix = value / 100;
    const decay = value / 10;
    reverbRef.current.mix = mix;
    reverbRef.current.decay = decay;
  };

  const handleUndo = () => {
    engineRef.current.world.bodies.pop();
  };

  const handlePause = () => {
    if (pause === '') {
      setPastGrav({
        x: engineRef.current.gravity.x,
        y: engineRef.current.gravity.y,
      });
      engineRef.current.gravity.x = 0;
      engineRef.current.gravity.y = 0;
      setPause('paused');
    } else {
      engineRef.current.gravity.x = pastGrav.x;
      engineRef.current.gravity.y = pastGrav.y;
      setPause('');
    }
  };

  return {
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
  };
};
