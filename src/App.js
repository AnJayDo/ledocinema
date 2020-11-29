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
import AdminLogin from './Components/AdminPage/AdminContain/AdminPage'
import PhimAdmin from './Components/AdminPage/AdminContain/AdminPhim/adminPhim'
import EditMovieDetail from './Components/AdminPage/AdminContain/AdminPhim/EditMovieDetail'
import CreateMovie from './Components/AdminPage/AdminContain/AdminPhim/CreateMovie'
import SuKienAdmin from './Components/AdminPage/AdminContain/AdminSuKien/adminSuKien'
import EditEvent from './Components/AdminPage/AdminContain/AdminSuKien/EditEvent'
import CreateEvent from './Components/AdminPage/AdminContain/AdminSuKien/CreateEvent'
import ResetPassword from './Components/Others/resetPassword'
import thongBao from './Components/UserPage/thongBao'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Cookies from 'js-cookie'
import MessengerCustomerChat from 'react-messenger-customer-chat'
import domain from './Components/domain'

function App() {
  document.onscroll = () => {
    document.getElementById('hoverPhim').style.display = 'none'
  }
  if (window.location.pathname == "/logout") {
    fetch(`${domain.api}/account/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': Cookies.get('jwt')
      },
    }).then(res => res.json()).then(data => {
      if(data.message=="Đã đăng xuất") {
        Cookies.remove('jwt')
        window.location.href = window.location.origin
      }
    })
  }
  return (
    <Router>
      <div className="App">
        <MessengerCustomerChat themeColor="#ffc34c" language='vn_VN' pageId="110394880858712" appId="1936758909798403" />
        <NavBar />
        <div style={{ minHeight: "700px" }}>
          <Switch>
            <Route path="/" exact component={LandingPage}></Route>
            <Route path="/events" exact component={EventsPage}></Route>
            <Route path="/events/:event" component={EventDetail}></Route>
            <Route path="/movies" exact component={MoviesPage}></Route>
            <Route path="/movies/:movie/:movietime" component={SeatPage}></Route>
            <Route path="/movies/:movie" component={MovieDetail}></Route>
            <Route path="/members" component={MemberPage}></Route>
            <Route path="/user" component={UserPage}></Route>
            <Route path="/thongBao/:status/:message" component={thongBao}></Route>
            <Route path="/successChange" component={successChangePage}></Route>
            <Route path="/logout"></Route>
            <Route path="/resetPassword" component={ResetPassword}></Route>
            <Route path="/administrator" exact component={AdminLogin}></Route>
            <Route path="/administrator/phim/themphim" component={CreateMovie}></Route>
            <Route path="/administrator/phim/:movie" component={EditMovieDetail}></Route>
            <Route path="/administrator/phim" component={PhimAdmin}></Route>
            <Route path="/administrator/sukien/themsukien" component={CreateEvent}></Route>
            <Route path="/administrator/sukien/:movie" component={EditEvent}></Route>
            <Route path="/administrator/sukien" component={SuKienAdmin}></Route>
            <Route path="*" component={ErrorPage}></Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
