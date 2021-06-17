import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './Chat.css';
import { SocketContext } from '../app/context/socketProvider';

const Chat = ({ color }) => {
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('server chat', (msg) => {
      setDisplay((prev) => {
        // const subArr = prev.length > 5 ? prev.slice(1) : prev;
        return [...prev, msg];
      });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('client chat', { input, color }, socket.currentRoom);
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className={styles.chatDivWrapper}>
      <ul className={styles.chatUl}>
        {display &&
          display.map(({ input, color }, i) => {
            return (
              <li
                key={i}
                style={{ backgroundColor: color }}
                className={
                  i < display.length - 5
                    ? styles.chatFloat
                    : styles.chatMessages
                }
              >
                {input}
              </li>
            );
          })}
      </ul>

      <form onSubmit={handleSubmit}>
        <TextField
          margin="none"
          variant="outlined"
          onChange={handleInputChange}
          value={input}
          type="text"
          placeholder="chat input"
        ></TextField>
        <Button
          style={{ height: '56px' }}
          size="large"
          variant="outlined"
          type="submit"
          disabled={!input}
        >
          send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
