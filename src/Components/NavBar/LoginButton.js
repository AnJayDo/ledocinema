import React, { Component } from 'react';
import JWTDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import './LoginButton.css'

const encodeToken = Cookies.get('jwt')

class LoginButton extends Component {
    signUp = () => {
        document.getElementById('SignUpLogin').style.display="flex"
        document.getElementById('signIn').style.display = "none"
        document.getElementById('signUp').style.display = "inline"
    }
    logoutClick = () => {
        Cookies.remove('jwt')
        window.location.reload(false)
    }
    render() {
        const decodedToken = encodeToken?JWTDecode(encodeToken):null
        if(decodedToken) {
            const link = "https://c7.uihere.com/files/348/800/890/computer-icons-avatar-user-login-avatar-thumb.jpg"
            return (
                <div id="userButton">
                    <a style={{ display: 'flex' }} href="/user"><img style={{ borderRadius: '15px', height: '30px', width: '30px', padding: '3px' }} src={link} /><p style={{ margin: '3px' }}>{"Chào " + decodedToken.name.slice(decodedToken.name.lastIndexOf(" ") + 1)}</p></a>
                    <div id="userButtonOnHover">
                        <a onClick={this.logoutClick} href="#">Đăng xuất</a>
                    </div>
                </div>)
        }
        return (<a  onClick={this.signUp} href="#">ĐĂNG KÍ</a>)
    }
}
  
export default LoginButton;