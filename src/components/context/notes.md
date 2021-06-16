import React, { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';

export const socket = io('ws://localhost:8000');

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socketRoom, setSocketRoom] = useState('');
  console.log('socketprovider ran');
  // const socket = useRef(null);

  useEffect(() => {
    // socket.current = io.connect('ws://localhost:8000', { reconnection:false });
    socket.on('set room', room => {
      setSocketRoom(room);
    });
  }, []);

  

  const state = { socket, socketRoom, setSocketRoom };

  return (
    <SocketContext.Provider value={state}>
      {children}
    </SocketContext.Provider>
  );

};

export default SocketProvider;
