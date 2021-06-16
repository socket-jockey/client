import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './Chat.css';
import { SocketContext } from '../app/context/socketProvider';

const Chat = () => {
  const [input, setInput] = useState('');
<<<<<<< HEAD
  const [display, setDisplay] = useState([]);
  const msgCountRef = useRef([]);

  useEffect(() => {
    socketRef.current.on('server chat', (msg) => {
=======
  const [display, setDisplay] = useState(['', '', '', '', '', '']);
  const msgCount = useRef([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('server chat', (msg) => {
>>>>>>> e5ef57a8e1c5632094cc70aec3bcef65758c2e12
      setDisplay((prev) => {
        // const subArr = prev.length > 5 ? prev.slice(1) : prev;
        msgCountRef.current = [...prev, msg];
        return [...prev, msg];
      });
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
<<<<<<< HEAD
      <ul className={styles.chatUl}>
        {display &&
          display.map((msg, i) => {
            return (
              <li
                key={i}
                className={
                  i < display.length - 5
                    ? styles.chatFloat
                    : styles.chatMessages
                }
              >
=======
      <ul className={styles.chatDivFull}>
        {display &&
          display.map((msg, i) => {
            return (
              <li key={i} className={styles.chatMessages}>
>>>>>>> e5ef57a8e1c5632094cc70aec3bcef65758c2e12
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
<<<<<<< HEAD
          type="sumbit"
=======
          type="submit"
>>>>>>> e5ef57a8e1c5632094cc70aec3bcef65758c2e12
        >
          send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
