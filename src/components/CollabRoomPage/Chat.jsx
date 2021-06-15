import React, { useState, useEffect } from 'react';
// import { SocketContext } from '../app/App';

const Chat = ({ socket, socketRoom }) => {
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState('init');

  useEffect(() => {
    socket.on('server chat', msg => {
      setDisplay(msg);
      console.log('message', msg);
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
      <div>{display}</div>
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
