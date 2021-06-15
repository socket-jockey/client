import Matter from 'matter-js';
import * as Tone from 'tone';
const Bodies = Matter.Bodies;
const Body = Matter.Body;

try {
  if (typeof MatterWrap !== 'undefined') {
    // either use by name from plugin registry (Browser global)
    Matter.use('matter-wrap');
  } else {
    // or require and use the plugin directly (Node.js, Webpack etc.)
    Matter.use(require('matter-wrap'));
  }
} catch (e) {
  // could not require the plugin or install needed
}
export const addBody = ({
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
  let body;

  if (shape === 'CIRCLE') {
    body = Bodies.circle(mouseX, mouseY, size);
  } else if (shape === 'SQUARE') {
    body = Bodies.rectangle(mouseX, mouseY, size, size);
  } else if (shape === 'HEXAGON') {
    body = Bodies.polygon(mouseX, mouseY, 6, size);
  } else if (shape === 'RECTANGLE') {
    body = Bodies.rectangle(mouseX, mouseY, size * 4, size);
  }

  body.pitch = size * -1 + 27;

  switch (material) {
    case 'WOOD':
      Body.set(body, {
        restitution: 0.2,
        density: 0.005,
        frictionAir: speed,
      });
      body.synth = new Tone.MembraneSynth();
      break;
    case 'METAL':
      Body.set(body, {
        restitution: 0.3,
        density: 0.01,
        frictionAir: speed,
      });
      body.synth = new Tone.MetalSynth();
      break;
    case 'RUBBER':
      Body.set(body, {
        restitution: 1.2,
        density: 0.005,
        frictionAir: speed,
      });
      body.synth = new Tone.FMSynth();
      break;
    case 'CLOTH':
      Body.set(body, {
        restitution: 0.001,
        density: 0.001,
        frictionAir: speed,
      });
      body.synth = new Tone.AMSynth();
      break;
    case 'BUBBLE':
      Body.set(body, {
        restitution: 0,
        density: 0.001,
        frictionAir: speed * 10,
      });
      body.bubble = true;
      body.synth = new Tone.PluckSynth();
      break;
    default:
      Body.set(body, {
        restitution: 1,
        density: 0.003,
        frictionAir: speed,
      });
  }
  if (isStatic) Body.setStatic(body, isStatic);
  if (doesLoop) {
    Body.set(body, {
      plugin: {
        wrap: {
          min: {
            x: mouseX,
            y: mouseY,
          },
          max: {
            x: mouseY + loopSize,
            y: mouseY + loopSize,
          },
        },
      },
    });
  }
  return body;
};
