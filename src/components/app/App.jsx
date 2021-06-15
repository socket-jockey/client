import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import RoomsPage from '../RoomsPage/RoomsPage';
import SoloWorld from '../SoloRoomPage/SoloWorld';
// import Footer from './Footer';
// import Header from './Header';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import RoomSelectionPage from '../RoomsPage/RoomSelectionPage';



const App = () => {
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
          component={RoomSelectionPage}
        />

        <Route 
          exact path = "/rooms/:room"
          component={RoomsPage}
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
