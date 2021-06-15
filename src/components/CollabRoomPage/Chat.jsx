import React, { useState, useContext, useEffect } from 'react';
// import { SocketContext } from '../app/App';

const Chat = ({socketRoom }) => {
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState('init');
  // const socket = useContext(SocketContext);

  // useEffect(() => {
  //   socket.on('server chat', msg => setDisplay(msg));
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // socket.emit('client chat', input, socketRoom);
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
