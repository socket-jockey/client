import { useEffect, useRef, useState, useContext } from 'react';
import { SocketContext } from '../context/socketProvider';
import Matter from 'matter-js';
import { addBody } from '../utils/addBody';
import * as Tone from 'tone';
import { scales } from '../utils/scales';
import { useAudio } from './useAudio';
// import { io } from 'socket.io-client';
// import { Scale } from '@tonaljs/tonal';
// export const tonalScale = Scale.get('c5 pentatonic');
// tonalScale.type = 'minor pentatonic';

export const useMatterCollab = ({
  noFriendButStillCool,
  canvasX,
  canvasY,
  roomId,
  userId,
}) => {
  try {
    if (typeof MatterWrap !== 'undefined') {
      // either use by name from plugin registry (Browser global)
      Matter.use('matter-wrap');
    } else {
      // or require and use the plugin directly (Node.js, Webpack etc.)
      Matter.use(require('matter-wrap'));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  const engineRef = useRef(null);
  const sceneRef = useRef(null);
  const bodyRef = useRef({
    shape: 'CIRCLE',
    isStatic: false,
    size: -13,
    material: 'METAL',
    doesLoop: false,
    loopSize: 200,
    speed: 0.3,
    toggles: [],
  });
  const reverbRef = useRef(null);
  const gainRef = useRef(new Tone.Gain(0.9));
  const [bodyControls, setBodyControls] = useState(bodyRef.current);
  const [gravity, setGravity] = useState({
    x: 0.5,
    y: 0.5,
  });

  const vibeRef = useRef(0);

  const [reverbAmount, setReverbAmount] = useState(30);
  const [vibe, setVibe] = useState('MAJOR');
  const [pause, setPause] = useState('');
  const [pastGrav, setPastGrav] = useState(gravity);
  const [participants, setParticipants] = useState('');
  const [open, setOpen] = useState(true);
  const [users, setUsers] = useState({});

  const Engine = Matter.Engine;
  const Render = Matter.Render;
  // const Bodies = Matter.Bodies;
  const Mouse = Matter.Mouse;
  const MouseConstraint = Matter.MouseConstraint;
  const Composite = Matter.Composite;
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('set userId', (userId) => {
      // setUserId(userId);
      socket.emit('set roomId & join', { userId, customRoomId: roomId });
    });

    socket.on('set roomId', (roomId) => (socket.currentRoom = roomId));

    socket.on('state from server', (users) => {
      setUsers(users);
      setParticipants(Object.keys(users).length);
    });

    // socket.on('num participants', (data) => {
    //   setParticipants(data);
    // });
    socket.on('clear all server', () => {
      const bodyArr = engineRef.current.world.bodies;
      for (let i = bodyArr.length - 1; i >= 0; i--){
        bodyArr[i].synth?.dispose();
        Composite.remove(engineRef.current.world, bodyArr[i]);
      }
    });

    socket.on('close modal', () => {
      handleCloseModal();
    });

    socket.on('undo last', () => {
      engineRef.current.world.bodies.pop();
    });

    //start audio
    useAudio(reverbRef, gainRef);

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
        // background: '#F8B195',
        background: '000000',
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
      console.log(engineRef);
      if (!engineRef.current.isBeingDragged) {
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
      }
    });

    //Check if a body is being dragged to avoid creating an unwanted object
    Matter.Events.on(mouseConstraint, 'startdrag', () => {
      engineRef.current.isBeingDragged = true;
    });
    Matter.Events.on(mouseConstraint, 'enddrag', () => {
      engineRef.current.isBeingDragged = false;
    });

    Matter.Events.on(engineRef.current, 'collisionStart', (event) => {
      const { bodyA, bodyB } = event.pairs[0];

      if (bodyA.cloud === true || bodyB.cloud === true) {
        if (bodyA.cloud === true && bodyA.isSounding === false) {
          bodyA.synth.triggerAttack(scales[vibeRef.current][bodyA.pitch]);
          bodyB.render.visible = false;
          bodyA.isSounding = true;
        }
        if (bodyB.cloud === true && bodyB.isSounding === false) {
          bodyB.synth.triggerAttack(scales[vibeRef.current][bodyB.pitch]);
          bodyA.render.visible = false;
          bodyB.isSounding = true;
        }
      } else {
        if (bodyA.synth && bodyA.speed > 0.5 && bodyA.synth.silent === true || bodyA.bubble === true) {
          bodyA.synth.volume.value = Math.log(bodyA.speed) - 10;
          bodyA.synth.triggerAttackRelease(
            scales[vibeRef.current][bodyA.pitch],
            bodyB.chichi ? '4n' : '16n'
          );
          bodyA.synth.silent = false;
          setTimeout(() => {
            bodyA.synth.silent = true;
          }, 50);
          if (bodyA.bubble) {
            Matter.Composite.remove(engineRef.current.world, bodyA);
            setTimeout(() => {
              bodyA.synth.dispose();
            }, 1000);
          }
        }
        if (bodyB.synth && bodyB.speed > 0.5 && bodyB.synth.silent === true || bodyB.bubble === true) {
          bodyB.synth.volume.value = Math.log(bodyB.speed) - 10;
          bodyB.synth.triggerAttackRelease(
            scales[vibeRef.current][bodyB.pitch],
            bodyB.chichi ? '4n' : '16n'
          );
          bodyB.synth.silent = false;
          setTimeout(() => {
            bodyB.synth.silent = true;
          }, 50);
          if (bodyB.bubble){
            Matter.Composite.remove(engineRef.current.world, bodyB);
            setTimeout(() => {
              bodyB.synth.dispose();
            }, 1000);
          }
        }
      }
    });

    Matter.Events.on(engineRef.current, 'collisionEnd', (event) => {
      const { bodyA, bodyB } = event.pairs[0];
      if (bodyA.cloud === true || bodyB.cloud === true) {
        if (bodyA.cloud === true) {
          bodyA.synth.triggerRelease();
          bodyB.render.visible = true;
          bodyA.isSounding = false;
        }
        if (bodyB.cloud === true) {
          bodyB.synth.triggerRelease();
          bodyA.render.visible = true;
          bodyB.isSounding = false;
        }
      }
    });

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
              gainRef,
            })
          );
        }
      );
    
    Matter.Runner.run(engineRef.current);
    Render.run(render);
  
    return () => {
      const bodyArr = Composite.allBodies(engineRef.current.world);
      for (const body of bodyArr){
        body.synth?.dispose();
      }
      Composite.clear(engineRef.current.world);
    }; 
  }, []);

  //define handlers
  const handleBodyControls = (key, value) => {
    setBodyControls((prev) => ({ ...prev, [key]: value }));
    bodyRef.current[key] = value;
    if (value === 'WALL' || value === 'FLOOR' || value === 'CLOUD') {
      setBodyControls((prev) => ({ ...prev, isStatic: true }));
      bodyRef.current.isStatic = true;
    }
    if (value === 'CIRCLE' || value === 'SQUARE' || value === 'TRIANGLE' || value === 'HEXAGON' || value === 'CHICHI') {
      setBodyControls((prev) => ({ ...prev, isStatic: false }));
      bodyRef.current.isStatic = false;
    }
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
      setBodyControls((prev) => ({ ...prev, isStatic: true, doesLoop: false }));
      bodyRef.current.isStatic = true;
      bodyRef.current.doesLoop = false;
    }
  };
  const handleBegin = () => {
    socket.emit('begin', socket.currentRoom);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleLoop = () => {
    if (bodyControls.doesLoop) {
      setBodyControls((prev) => ({ ...prev, doesLoop: false }));
      bodyRef.current.doesLoop = false;
    } else {
      setBodyControls((prev) => ({ ...prev, doesLoop: true, isStatic: false }));
      bodyRef.current.doesLoop = true;
      bodyRef.current.isStatic = false;
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
    if (!noFriendButStillCool) {
      socket.emit('undo', socket.currentRoom);
    } else {
      const body = engineRef.current.world.bodies.pop();
      body.synth.dispose();
    }
  };
  const handleClearAll = () => {
    if (!noFriendButStillCool) {
      socket.emit('clear all', socket.currentRoom);
    } else {
      const bodyArr = engineRef.current.world.bodies;
      for (let i = bodyArr.length -1; i >= 0; i--){
        bodyArr[i].synth?.dispose();
        Composite.remove(engineRef.current.world, bodyArr[i]);
      }
    }
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

  const handleUserColor = (color) => {
    socket.emit('set color', {
      user: { [userId]: color },
      roomId: socket.currentRoom,
    });
  };

  return {
    sceneRef,
    bodyControls,
    pause,
    gravity,
    reverbAmount,
    vibe,
    participants,
    open,
    users,
    handleBodyControls,
    handleSettingTheVibe,
    handleReverbChange,
    handleGravityChange,
    handlePause,
    handleUndo,
    handleStatic,
    handleLoop,
    handleBegin,
    handleUserColor,
    handleClearAll
  };
};
