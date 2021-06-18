import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import RoomsPage from '../RoomsPage/RoomsPage';
import RoomSelectionPage from '../RoomsPage/RoomSelectionPage';
import AboutDevs from '../About/AboutDevs';
import './App.css';
import { Container } from '@material-ui/core';
import { SocketContext, socket } from './context/socketProvider';

const App = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    socket.on('set userId', (userId) => {
      setUserId(userId);
    });
  }, []);

  return (
    <Container disableGutters={true} maxWidth={false}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/about" component={AboutDevs} />
        </Switch>
        <Switch>
          <Route exact path="/rooms">
            <SocketContext.Provider value={socket}>
              <RoomSelectionPage userId={userId} />
            </SocketContext.Provider>
          </Route>
          <SocketContext.Provider value={socket}>
            <Route exact path="/rooms/:room">
              <RoomsPage userId={userId} />
            </Route>
            <Route exact path="/rooms/:room/:roomId">
              <RoomsPage userId={userId} />
            </Route>
          </SocketContext.Provider>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </Container>
  );
};

export default App;
