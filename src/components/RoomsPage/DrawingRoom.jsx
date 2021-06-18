import React, { useContext, useEffect, useRef } from 'react';
import P5 from 'p5';
import { SocketContext } from '../app/context/socketProvider';

const colorsArr = [
  '#D4BEEE',
  '#A3E5FF',
  '#9DF3CB',
  '#FFF897',
  '#FFCAD8',
  '#FFBA7a',
  '#FB998E',
  '#000000',
];

const randomColor = (arr) => {
  return arr[Math.ceil(Math.random() * 7)];
};
const randomNumber = () => {
  return Math.ceil(Math.random() * 20);
};
const DrawingRoom = () => {
  const canvasRef = useRef();
  const socket = useContext(SocketContext);
  useEffect(() => {
    new P5(Sketch, canvasRef.current);
    return () => {};
  }, []);

  const Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(500, 1000);
      p.background('rgba(250, 250, 250, 0.1)');

      socket.on('mouse response', (data) => {
        p.stroke(data.color);
        p.strokeWeight(data.strokeWidth);
        p.line(data.x, data.y, data.px, data.py);
      });
    };

    p.mouseDragged = () => {
      const data = {
        x: p.mouseX,
        y: p.mouseY,
        px: p.pmouseX,
        py: p.pmouseY,
        color: randomColor(colorsArr),
        strokeWidth: randomNumber(),
      };
      socket.emit('transmit mouse', socket.currentRoom, data);
    };
  };
  return <div ref={canvasRef}></div>;
};

export default DrawingRoom;
