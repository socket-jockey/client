import { createContext } from 'react';
import { io } from 'socket.io-client';

// export const socket = io.connect('http://localhost:8000');
export const socket = io.connect('https://socket-jockey.herokuapp.com/');
export const SocketContext = createContext();
