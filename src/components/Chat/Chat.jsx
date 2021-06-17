import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './Chat.css';
import { SocketContext } from '../app/context/socketProvider';

const Chat = () => {
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState(['', '', '', '', '', '']);
  const msgCount = useRef([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('server chat', (msg) => {
      setDisplay((prev) => {
        const subArr = prev.slice(1);
        return [...subArr, msg];
      });
      const subArr = msgCount.current.slice(1);
      msgCount.current = [...subArr, msg];
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('client chat', input, socket.currentRoom);
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className={styles.chatDivWrapper}>
      <ul className={styles.chatDivFull}>
        {display &&
          display.map((msg, i) => {
            return (
              <li key={i} className={styles.chatMessages}>
                {msg}
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
        >
          send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
