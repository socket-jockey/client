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
];

const randomColor = (arr) => {
  return arr[Math.ceil(Math.random() * 6)];
};
const DrawingRoom = () => {
  const canvasRef = useRef();
  const color = randomColor(colorsArr);
  const strokeWidth = 4;
  const socket = useContext(SocketContext);
  useEffect(() => {
    new P5(Sketch, canvasRef.current);
    return () => {};
  }, []);

  const Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(750, 900);
      p.background('white');

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
        color,
        strokeWidth,
      };
      socket.emit('transmit mouse', socket.currentRoom, data);
    };
  };
  return <div ref={canvasRef}></div>;
};

export default DrawingRoom;
