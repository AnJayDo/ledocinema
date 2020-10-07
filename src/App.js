import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar'
import LandingPage from './Components/LandingPage/LandingPage'
import EventsPage from './Components/EventsPage/EventsPage'
import Footer from './Components/Footer/Footer'
import MemberPage from './Components/MemberPage/MemberPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  if(window.location.pathname=="/logout") {localStorage.clear(); window.location.href="/";}
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/events" component={EventsPage}></Route>
          <Route path="/members" component={MemberPage}></Route>
          <Route path="/logout"></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
