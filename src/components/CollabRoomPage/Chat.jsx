import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-animated-css';
import styles from './Chat.css';

const Chat = ({ socket, socketRoom }) => {
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState(['', '', '', '', '', '']);
  const msgCount = useRef([]);

  useEffect(() => {
    socket.on('server chat', msg => {
      // if (msgCount.current.length < 6){
      //   setDisplay(prev => [...prev, msg]);
      //   msgCount.current = [...msgCount.current, msg];
      // } else {
      setDisplay((prev) => {
        const subArr = prev.slice(1);
        return [...subArr, msg];
      });
      const subArr = msgCount.current.slice(1);
      msgCount.current = [...subArr, msg];
      // } 
    });
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('input', input);
    console.log('room', socketRoom);
    socket.emit('client chat', input, socketRoom);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <> 
      {/* <div className={display.length <= 5 ? styles.chatDiv : styles.chatDivFull} >{display && display.map((msg, i) => { */}
      <ul className={styles.chatDivFull} >{display && display.map((msg, i) => {
        return <li key={i} className={styles.chatMessages}>{msg}</li>;
      }
      )}
      </ul>


      <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange}
          value={input} 
          type="text" 
          placeholder="chat input"></input>
        <button type ="sumbit">send</button>
      </form>
    </>
  );
};

export default Chat;
