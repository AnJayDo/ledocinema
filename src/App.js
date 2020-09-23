import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar'
import LandingPage from './Components/LandingPage/LandingPage'
import Footer from './Components/Footer/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  if(window.location.pathname=="/logout") {localStorage.clear(); window.location.href="/";}
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/logout"></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
