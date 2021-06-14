import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CollabWorld from '../CollabRoomPage/CollabWorld';
import LandingPage from '../LandingPage/LandingPage';
import RoomsPage from '../RoomsPage/RoomsPage';
import SoloWorld from '../SoloRoomPage/SoloWorld';
// import Footer from './Footer';
// import Header from './Header';
import './App.css';
import Header from './Header';
import Footer from './Footer';

const App = () => {
  // const [landing, setLanding] = useState(true);
  // const [room, setRoom] = useState('');

  return (
    <Router>
      <Switch>
        <Route 
          exact path = "/"
          component={LandingPage}
        />
      </Switch>
      <Header /> 
      <Switch>
        
          
        <Route 
          exact path = "/rooms"
          component={RoomsPage}
        />

        <Route 
          exact path = "/rooms/solo"
          component={SoloWorld}
        />

        <Route 
          exact path = "/rooms/collab"
          component={CollabWorld}
        />

        <Route 
          exact path = "/about"
          // component={AboutDevs}
        />
        
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
