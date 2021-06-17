import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import RoomsPage from '../RoomsPage/RoomsPage';
import RoomSelectionPage from '../RoomsPage/RoomSelectionPage';
import AboutDevs from '../About/AboutDevs';
import './App.css';
import { Container } from '@material-ui/core';
import { SocketContext, socket } from './context/socketProvider';

const App = () => {
  // const [room, setRoom] = useState('');

  return (
    <Container disableGutters={true} maxWidth={false}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
        <Switch>
          <Route exact path="/rooms">
            <SocketContext.Provider value={socket}>
              <RoomSelectionPage />
            </SocketContext.Provider>
          </Route>
          <Route exact path="/rooms/:room/:roomId">
            <SocketContext.Provider value={socket}>
              <RoomsPage />
            </SocketContext.Provider>
          </Route>
          <Route exact path="/about" component={AboutDevs} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </Container>
  );
};

export default App;
