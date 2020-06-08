import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom'
import LandingPage from './containers/LandingPage';
import Navbar from './components/Navbar';
import ClanEvent from './containers/ClanEvent';
import ClanRoster from './containers/ClanRoster';
import Leaderboard from './containers/Leaderboard';

function App() {
  return (
    <>
      <Navbar />
      <Switch> {/** in switch, make sure you go most specific to least and/or use exact  */}
        {/**
         * Router props => auto passed down in component notation 
         */}
        {/* <Route path="/pets/:id" component={PetProfile}/>  */}
        <Route path="/roster" component={ClanRoster}/> 
        <Route path="/events" component={ClanEvent}/>
        <Route path="/leaderboards" component={Leaderboard}/>
        {/* <Route path="/help" render={(routerProps) => <Help urgency={5} {...routerProps}/>}/> */}
        <Route path="/" component={LandingPage}/>
      </Switch>


    </>
  );
}

export default App;