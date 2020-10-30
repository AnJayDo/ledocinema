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
import UserPage from './Components/UserPage/UserPage'
import SeatPage from './Components/SeatPage/SeatPage'
import successChangePage from './Components/UserPage/successChangePassword'
import ErrorPage from './Components/errorPage'
import PhimAdminLogin from './Components/AdminPage/AdminContain/AdminPhim/adminPhim'
import AdminLogin from './Components/AdminPage/AdminContain/AdminPage'
import EditPhimAdmin from './Components/AdminPage/AdminContain/AdminPhim/EditMovieDetail'
import CreateMovie from './Components/AdminPage/AdminContain/AdminPhim/CreateMovie'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Cookies from 'js-cookie'

function App() {
  document.onscroll = () => {
    document.getElementById('hoverPhim').style.display= 'none'
  }
  if(window.location.pathname=="/logout") {

    Cookies.remove('jwt')
    window.location.href=window.location.origin
  }
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/events" exact component={EventsPage}></Route>
          <Route path="/events/:event" component={EventDetail}></Route>
          <Route path="/movies" exact component={MoviesPage}></Route>
          <Route path="/movies/:movie/:movietime/:time" component={SeatPage}></Route>
          <Route path="/movies/:movie" component={MovieDetail}></Route>
          <Route path="/members" component={MemberPage}></Route>
          <Route path="/user" component={UserPage}></Route>
          <Route path="/successChange" component={successChangePage}></Route>
          <Route path="/logout"></Route>
          <Route path="/administrator" exact component={AdminLogin}></Route>
          <Route path="/administrator/phim/themphim" component={CreateMovie}></Route>
          <Route path="/administrator/phim/:movie" component={EditPhimAdmin}></Route>
          <Route path="/administrator/phim" component={PhimAdminLogin}></Route>
          <Route path="*" component={ErrorPage}></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
