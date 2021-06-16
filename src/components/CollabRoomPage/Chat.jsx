import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import styles from './Chat.css';

const Chat = ({ socketRef }) => {
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState(['', '', '', '', '', '']);
  const msgCount = useRef([]);

  useEffect(() => {
    socketRef.current.on('server chat', msg => {
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
    socketRef.current.emit('client chat', input, socketRef.current.currentRoom);
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className={styles.chatDivWrapper}> 
      <ul className={styles.chatDivFull} >{display && display.map((msg, i) => {
        return <li key={i} className={styles.chatMessages}>{msg}</li>;
      }
      )}
      </ul>

      <form onSubmit={handleSubmit}>
        <TextField
          margin="none"
          variant="outlined"
          onChange={handleInputChange}
          value={input} 
          type="text" 
          placeholder="chat input">
        </TextField>
        <Button
          style={{ height: '56px' }}
          size="large" 
          variant="outlined" 
          type ="sumbit">send
        </Button>
      </form>
    </div>
  );
};

Chat.propTypes = {
  socketRef: PropTypes.object.isRequired,
};

export default Chat;
