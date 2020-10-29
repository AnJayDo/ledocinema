import React, { Component } from 'react';
import logo from '../../Images/logo.png'
import arrow from '../../Images/ArrowIcon.png'
import './NavBar.css'
import LoginButton from './LoginButton'
import SignUpLogin from './SignUpLogin/SignUpLogin'
import AvailableMovies from '../Movies/AvailableMovies';
import NonAvailableMovies from '../Movies/NonAvailableMovies';

class NavBar extends Component {
    onMouseEnterPhimNav = () => {
        document.getElementById('hoverPhim').style.display= 'inline'
    }
    onMouseLeavePhimNav = () => {
        document.getElementById('hoverPhim').style.display= 'none'
    }
    render() {
        return (
            <div onScroll={this.onMouseLeavePhimNav} className="NavBar" id="navbar">
                <a onMouseEnter={this.onMouseLeavePhimNav} className="NavBarLogo" href="/"><img id="logo" src={logo}/></a>
                <div className="NavBarMainContainer">
                    <ul id="nav-list">
                        <li onMouseEnter={this.onMouseLeavePhimNav} ><a href="/">TRANG CHỦ</a></li>
                        <li onMouseEnter={this.onMouseEnterPhimNav} id="phim-nav"><a href="/movies">PHIM<img src={arrow}/></a></li>
                        <li onMouseEnter={this.onMouseLeavePhimNav} ><a href="/events">SỰ KIỆN</a></li>
                        <li onMouseEnter={this.onMouseLeavePhimNav} ><a href="/members">THÀNH VIÊN</a></li>
                        <li onMouseEnter={this.onMouseLeavePhimNav} id="loginButton"><LoginButton/></li>
                    </ul>
                </div>
                {<SignUpLogin />}
                <div id="hoverPhim">
                    <p className="header-text">Phim đang chiếu</p>
                    <AvailableMovies/>
                    <p className="header-text">Phim sắp chiếu</p>
                    <NonAvailableMovies/>
                </div>
            </div>
          )
    }
}
  
export default NavBar;