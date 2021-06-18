import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography } from '@material-ui/core';
import styles from './Chat.css';
import { SocketContext } from '../app/context/socketProvider';

const Chat = ({ color }) => {
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('server chat', (msg) => {
      setDisplay((prev) => {
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
                <Typography variant="body1">{input}</Typography>
              </li>
            );
          })}
      </ul>

      <form onSubmit={handleSubmit}>
        <TextField
          style={{ marginRight: '1rem', paddingTop: '1.3rem' }}
          margin="none"
          variant="standard"
          onChange={handleInputChange}
          value={input}
          type="text"
          placeholder="chat input"
        ></TextField>
        <Button
          style={{
            height: '56px',
            marginRight: '1rem',
            marginBottom: '1rem',
            border: 'none',
          }}
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

Chat.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Chat;
