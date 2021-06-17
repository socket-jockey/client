import React, { useContext, useEffect, useRef } from 'react';
import P5 from 'p5';
import io from 'socket.io-client';
import { SocketContext } from '../app/context/socketProvider';


const DrawingRoom = () => {
  const canvasRef = useRef();
  const color = '#FF0000';
  const strokeWidth = 4;
  const socket = useContext(SocketContext);
  useEffect(() => {
    const myp5 = new P5(Sketch, canvasRef.current);
    return myp5;
  }, []);

  const Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(750, 900);
      p.background('white');

      socket.on('mouse response', data => {
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
        strokeWidth
      };
      socket.emit('transmit mouse', socket.currentRoom, data);
      // p.stroke('black');
      // p.strokeWeight(5);
      // p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      // sendMouse(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      console.log(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    }; 
  };
  
  // function sendMouse(x, y, pX, pY) {
  //   const data = {
  //     x,
  //     y,
  //     px: pX,
  //     py: pY,
  //     color,
  //     strokeWidth,
  //     socket.emit('transmit mouse', socket.currentRoom, data);
  //   };
  // }

  return (
    <div ref={canvasRef}>
    </div>
  );
};

export default DrawingRoom;
