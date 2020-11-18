import React, { Component } from 'react';
import Cookies from 'js-cookie'
import './LoginButton.css'

const encodeToken = Cookies.get('jwt')
const link = "http://localhost:3000/"

class LoginButton extends Component {
    constructor(props) {
        super(props)
        this.state={data: {}};
    }
    componentDidMount() {
        if(encodeToken){
            fetch('http://localhost:3000/account/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': encodeToken
                }
            }).then(res => res.json()).then(data => {
                this.setState({data:data})
            }).catch(e => console.log(e))
        }
    }
    signUp = () => {
        document.getElementById('SignUpLogin').style.display="flex"
        document.getElementById('signIn').style.display = "none"
        document.getElementById('signUp').style.display = "inline"
    }
    logoutClick = () => {
        fetch('http://localhost:3000/account/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': encodeToken
              }
        }).then(res => res.json()).then(data => {
            this.setState({data:data})
        }).catch(e => console.log(e))
        Cookies.remove('jwt')
        window.location.href=window.location.origin
    }
    render() {
        const {data} = this.state
        if(data.name) {
            let image = this.state.data.avartar
            if(String(image).indexOf("http")<0) image=link+image
            return (
                <div id="userButton">
                    <a id="userHi" href="/user"><img style={{ borderRadius: '15px', height: '30px', width: '30px', padding: '3px' }} src={image} /><p style={{ margin: '3px' }}>{"Chào " + String(data.name).slice(String(data.name).lastIndexOf(" ") + 1)}</p></a>
                    <div id="userButtonOnHover">
                        <div><a href="/user">Thông tin</a></div>
                        <div><a href="/user#changePassword">Đổi mật khẩu</a></div>
                        <div><a onClick={this.logoutClick} href="#">Đăng xuất</a></div>
                    </div>
                </div>)
        }
        return (<a  onClick={this.signUp} href="#">ĐĂNG KÍ</a>)
    }
}
  
export default LoginButton;