import React, { Component } from 'react';
import logo from '../../Images/logo.png'
import arrow from '../../Images/ArrowIcon.png'
import './NavBar.css'
import LoginButton from './LoginButton'

class NavBar extends Component {
    render() {
        return (
            <div className="NavBar">
                <a className="NavBarLogo" href="/"><img id="logo" src={logo}/></a>
                <div className="NavBarMainContainer">
                    <ul id="nav-list">
                        <li><a href="/">TRANG CHỦ</a></li>
                        <li id="phim-nav"><a href="/movies">PHIM<img src={arrow}/></a></li>
                        <li><a href="/events">SỰ KIỆN</a></li>
                        <li><a href="/members">THÀNH VIÊN</a></li>
                        <li id="loginButton"><LoginButton /></li>
                    </ul>
                </div>
            </div>
          )
    }
}
  
export default NavBar;