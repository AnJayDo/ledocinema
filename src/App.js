import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar'
import LandingPage from './Components/LandingPage/LandingPage'
import MoviesPage from './Components/Movies/MoviesPage'
import MovieDetail from './Components/Movies/MovieDetail'
import EventsPage from './Components/EventsPage/EventsPage'
import EventDetail from './Components/EventsPage/EventDetail'
import Footer from './Components/Footer/Footer'
import MemberPage from './Components/MemberPage/MemberPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  document.onscroll = () => {
    document.getElementById('hoverPhim').style.display= 'none'
  }
  if(window.location.pathname=="/logout") {localStorage.clear(); window.location.href="/";}
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/events" exact component={EventsPage}></Route>
          <Route path="/events/:event" component={EventDetail}></Route>
          <Route path="/movies" exact component={MoviesPage}></Route>
          <Route path="/movies/:movie" component={MovieDetail}></Route>
          <Route path="/members" component={MemberPage}></Route>
          <Route path="/logout"></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
