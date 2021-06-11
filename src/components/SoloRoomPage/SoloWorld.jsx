import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';
import { io } from 'socket.io-client';
const socket = io.connect('http://localhost:8000');
import { Typography } from '@material-ui/core';

const SoloWorld = ({ bodyRef, worldRef }) => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const Runner = Matter.Runner;
  const MouseConstraint = Matter.MouseConstraint;
  const Mouse = Matter.Mouse;
  const Composite = Matter.Composite;
  const Bodies = Matter.Bodies;
  // const Composites = Matter.Composites;

  useEffect(() => {
    // create engine
    const engine = (engineRef.current = Engine.create());
    const world = engineRef.current.world;
    engineRef.current.gravity.y = 1;

    // create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engineRef.current,
      options: {
        width: 600,
        height: 600,
        wireFrames: false,
      },
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    Composite.add(world, [
      // walls
      Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
      Bodies.rectangle(200, 600, 600, 50, { isStatic: true }),
      Bodies.rectangle(500, 250, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
    ]);

    const ballA = Bodies.circle(210, 100, 10, { restitution: 0.5 });
    const ballB = Bodies.circle(110, 50, 10, { restitution: 0.5 });

    Composite.add(world, [ballA, ballB]);

    //add mouse control
    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    Composite.add(world, mouseConstraint);

    //keep the mouse in sync with rendering
    render.mouse = mouse;

    Matter.Events.on(mouseConstraint, 'mouseup', (event) => {
      // console.log(event);
      Composite.add(
        world,
        Bodies.circle(event.mouse.position.x, event.mouse.position.y, 30, {
          restitution: 0.7,
        })
      );
    });
  }, []);

  return (
    <>
      <Typography variant={'h1'}>Solo World</Typography>
      <div ref={sceneRef}></div>
    </>
  );
};

SoloWorld.propTypes = {};

export default SoloWorld;
