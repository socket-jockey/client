import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { addBody } from './addBody';
import * as Tone from 'tone';
import { scales } from './vibes';

export const useMatterCollab = ({ roomId, socket, canvasX, canvasY }) => {
  const engineRef = useRef(null);

  const sceneRef = useRef(null);

  const reverb = new Tone.Reverb();

  const bodyRef = useRef({
    shape: 'CIRCLE',
    isStatic: false,
    size: 20,
    material: 'WOOD',
    doesLoop: false,
    loopSize: 200,
    speed: 0.3,
    toggles: [],
  });

  const [bodyControls, setBodyControls] = useState(bodyRef.current);
  const [gravity, setGravity] = useState({
    x: 0.5,
    y: 0.5,
  });

  const [reverbAmount, setReverbAmount] = useState(50);

  const [vibe, setVibe] = useState('major');
  const vibeRef = useRef(vibe);

  const [pause, setPause] = useState(false);
  const [pastGrav, setPastGrav] = useState(gravity);

  const Engine = Matter.Engine;
  const Render = Matter.Render;
  // const Bodies = Matter.Bodies;
  const Mouse = Matter.Mouse;
  const MouseConstraint = Matter.MouseConstraint;
  const Composite = Matter.Composite;

  useEffect(() => {
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
      socket.emit('object dropped', roomId, {
        ...bodyRef.current,
        mouseX: event.mouse.mousedownPosition.x,
        mouseY: event.mouse.mousedownPosition.y,
      });
    });

    Matter.Events.on(engineRef.current, 'collisionEnd', (event) => {
      if (event) {
        const bodies = [];
        event.source.pairs.list.forEach(({ bodyA, bodyB }) => {
          if (
            bodyA.synth &&
            !bodies.includes(bodyA.id) &&
            bodyA.speed > 1.5 &&
            bodyA.synth.silent === true
          ) {
            bodyA.synth.volume.value = Math.log(bodyA.speed) - 10;
            bodyA.synth.triggerAttackRelease(
              scales[vibeRef.current][bodyA.pitch],
              '16n'
            );
            bodyA.synth.silent = false;
            bodies.push(bodyA.id);
            setTimeout(() => {
              bodyA.synth.silent = true;
            }, 50);
          }
          if (
            bodyB.synth &&
            !bodies.includes(bodyB.id) &&
            bodyB.speed > 1.5 &&
            bodyB.synth.silent === true
          ) {
            bodyB.synth.volume.value = Math.log(bodyB.speed) - 10;
            bodyB.synth.triggerAttackRelease(
              scales[vibeRef.current][bodyB.pitch],
              '16n'
            );
            bodyB.synth.silent = false;
            bodies.push(bodyB.id);
            setTimeout(() => {
              bodyB.synth.silent = true;
            }, 50);
          }
        });
      }
    });
    socket.on(
      'emit drop',
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
        console.log('object dropped by someone');
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
            vibe: vibeRef.current,
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
    setGravity((prev) => ({ ...prev, key: value }));
    engineRef.current.gravity[key] = value;
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
    reverb.mix = mix;
    reverb.decay = decay;
  };

  const handleUndo = () => {
    engineRef.current.world.bodies.pop();
  };
  const handlePause = () => {
    if (!pause) {
      setPastGrav({
        x: engineRef.current.gravity.x,
        y: engineRef.current.gravity.y,
      });
      engineRef.current.gravity.x = 0;
      engineRef.current.gravity.y = 0;
      setPause(true);
    } else {
      engineRef.current.gravity.x = pastGrav.x;
      engineRef.current.gravity.y = pastGrav.y;
      setPause(false);
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
  };
};
