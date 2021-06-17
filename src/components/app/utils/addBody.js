import Matter from 'matter-js';
import * as Tone from 'tone';
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
const Bodies = Matter.Bodies;
const Body = Matter.Body;

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
  canvasX,
  canvasY,
  gainRef,
}) => {
  let body;
  const bodySize = size * -3 + 5;
  if (shape === 'CIRCLE') {
    body = Bodies.circle(mouseX, mouseY, bodySize);
  } else if (shape === 'SQUARE') {
    body = Bodies.rectangle(mouseX, mouseY, bodySize, bodySize);
  } else if (shape === 'HEXAGON') {
    body = Bodies.polygon(mouseX, mouseY, 6, bodySize);
  } else if (shape === 'WALL') {
    body = Bodies.rectangle(mouseX, mouseY, bodySize / 4, bodySize * 10);
  } else if (shape === 'FLOOR') {
    body = body = Bodies.rectangle(mouseX, mouseY, bodySize * 10, bodySize / 4);
  } else if (shape === 'TRIANGLE') {
    body = Bodies.polygon(mouseX, mouseY, 3, bodySize);
  } else if (shape === 'CHICHI') {
    body = Bodies.rectangle(mouseX, mouseY, bodySize / 2, bodySize * 1.5, {
      render: {
        sprite: {
          visible: true,
          texture: 'https://i.imgur.com/4iHbj73.png',
          xScale: 0.01 * (bodySize / 10),
          yScale: 0.01 * (bodySize / 10),
          yOffset: 0.01,
          xOffset: 0,
        },
      },
    });
  } else if (shape === 'CLOUD') {
    body = Bodies.rectangle(mouseX, mouseY, bodySize * 2, bodySize, {
      isSensor: true,
      render: {
        visible: true,
        sprite: {
          texture:
            'https://static.vecteezy.com/system/resources/previews/001/192/683/original/cloud-png.png',
          xScale: 0.03 * (bodySize / 10),
          yScale: 0.03 * (bodySize / 10),
        },
        // opacity: 0.7
      },
    });
    body.cloud = true;
    body.isSounding = false;
  }

  body.pitch = size + 27;

  let amp, mod, vibrato, chorus, feedback;
  if (shape === 'CHICHI') {
    Body.set(body, {
      restitution: 0.6,
      density: 0.005,
      frictionAir: 0.01,
    });
    body.synth = new Tone.Sampler({
      urls: {
        F4: 'chchi.mp3'
      },
      baseUrl: '../../../../public/'
    }).connect(gainRef.current);
    body.chichi = true;
  } else {
    switch (material) {
      case 'WOOD':
        Body.set(body, {
          restitution: 0.5,
          density: 0.005,
          frictionAir: 0.01,
          render: {
            visible: true,
            fillStyle: '#ffba7a',
            strokeStyle: '#ffba7a',
            lineWidth: '2',
          }
        });
        amp = {
          attack: 0.01,
          decay: 0.5,
          sustain: 0,
          release: 0.1,
          decayCurve: 'exponential',
        };
        body.synth = new Tone.MembraneSynth({
          envelope: amp,
          octaves: 1,
        }).connect(gainRef.current);
        break;

      case 'METAL':
        Body.set(body, {
          restitution: 0.3,
          density: 0.01,
          frictionAir: 0.01 + size / -5000,
          render: {
            visible: true,
            fillStyle: '#d4beee',
            strokeStyle: '#d4beee',
            lineWidth: '2',
          }
        });
        amp = {
          attack: 0.01,
          decay: 0.3,
          sustain: 0,
          release: 2,
          decayCurve: 'exponential',
        };
        mod = {
          attack: 0.3,
          decay: 0.5,
          sustain: 0,
          release: 1,
          decayCurve: 'exponential',
        };
        body.synth = new Tone.FMSynth({
          envelope: amp,
          harmonicity: 3,
          modulationIndex: 20 - body.pitch / 2,
          modulationEnvelope: mod,
        }).connect(gainRef.current);
        break;

      case 'RUBBER':
        Body.set(body, {
          restitution: 1.4,
          density: 0.01,
          frictionAir: 0.01,
          render: {
            visible: true,
            fillStyle: '#fb998e',
            strokeStyle: '#fb998e',
            lineWidth: '2',
          }
        });
        vibrato = new Tone.Vibrato({
          frequency: 0.5,
          depth: 0.2,
        }).connect(gainRef.current);
        body.synth = new Tone.FMSynth().connect(vibrato);
        break;

      case 'CLOTH':
        Body.set(body, {
          restitution: 0.001,
          density: 0.001,
          frictionAir: speed,
          render: {
            visible: true,
            fillStyle: '#ffcad8',
            strokeStyle: '#ffcad8',
            lineWidth: '2',
          }
        });
        amp = {
          attack: 0.1,
          decay: 0.5,
          sustain: 0.5,
          release: 1,
          decayCurve: 'exponential',
        };
        body.synth = new Tone.AMSynth({
          envelope: amp,
          harmonicity: 0.25,
          modulationIndex: 15,
        }).connect(gainRef.current);
        body.chichi = true;
        break;

      case 'BUBBLE':
        Body.set(body, {
          restitution: 0,
          density: 0.000001,
          frictionAir: 1.2,
          render: {
            visible: true,
            fillStyle: 'transparent',
            lineWidth: 2,
          },
        });
        body.bubble = true;
        body.synth = new Tone.PluckSynth({
          attackNoise: 3,
          dampening: 5000,
          release: 2,
          resonance: 0.7
        }).connect(gainRef.current);
        break;

      case 'GLITTER':
        console.log('glitter');
        Body.set(body, {
          restitution: 1,
          density: 0.01,
          frictionAir: 0.007,
          render: {
            visible: true,
            fillStyle: '#fff897',
            strokeStyle: '#fff897',
            lineWidth: '2',
          }
        });
        amp = {
          attack: 0.05,
          decay: 0.3,
          sustain: 0.5,
          release: 0.3,
          decayCurve: 'exponential',
        };
        mod = {
          attack: 0.01,
          decay: 0.3,
          sustain: 0,
          release: 0.1,
          decayCurve: 'exponential',
        };
        feedback = new Tone.FeedbackDelay(0.08, 0.7).connect(gainRef.current);
        body.synth = new Tone.MonoSynth({
          envelope: amp,
          filterEnvelope: mod,
          oscillator: {
            type: 'sawtooth9'
          },
          filter: {
            frequency: 10000,
            Q: 3
          }
        }).connect(feedback);
        break;

      case 'LIQUID':
        Body.set(body, {
          restitution: 0,
          density: 0.01,
          frictionAir: 0.08,
          render: {
            visible: true,
            fillStyle: '#a3e5ff',
            strokeStyle: '#a3e5ff',
            lineWidth: '2',
          }
        });
        amp = {
          attack: 0.1,
          decay: 0.3,
          sustain: 0.5,
          release: 1,
          decayCurve: 'exponential',
        };
        mod = {
          attack: 0.3,
          decay: 0.3,
          sustain: 0.5,
          release: 0.1,
          decayCurve: 'exponential',
        };
        chorus = new Tone.Chorus({
          delayTime: 5,
          depth: 0.8,
          feedback: 0.7,
        }).connect(gainRef.current);
        body.synth = new Tone.MonoSynth({
          envelope: amp,
          filterEnvelope: mod,
          oscillator: {
            type: `square${Math.ceil(Math.random() * 20)}`
          },
          filter: {
            frequency: 8000,
            Q: 1
          }
        }).connect(chorus);
        break;

      default:
        Body.set(body, {
          restitution: 1,
          density: 0.003,
          frictionAir: speed * 5,
        });
    }
  }
  body.synth.silent = true;
  if (isStatic) Body.setStatic(body, isStatic);
  if (shape === 'CLOUD') {
    Body.setStatic(body, true);
  }
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
  } else {
    Body.set(body, {
      plugin: {
        wrap: {
          min: {
            x: 0,
            y: 0,
          },
          max: {
            x: canvasX,
            y: canvasY,
          },
        },
      },
    });
  }
  return body;
};
