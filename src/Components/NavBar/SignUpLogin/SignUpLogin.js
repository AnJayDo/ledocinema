import React, { Component } from 'react';
import Cookies from 'js-cookie';
import * as EmailValidator from 'email-validator';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import './SignUpLogin.css';
import Notify from '../../Notify/Notify'
import ReactDOM from 'react-dom'
import domain from '../../domain'

const responseFacebook = (response) => {
    fetch(`${domain.api}/account/register`, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            name: response.name,
            email: response.email,
            age: 0,
            avartar: response.picture.url,
            phonenumber: "",
            username: "",
            password: response.id
        })
    })
        .then(res => res.json()).then(data => {
            if (data.message == "đăng kí thành công") {
                fetch(`${domain.api}/account/login`, {
                    method: 'POST',
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({
                        email: response.email,
                        password: response.id
                    })
                })
                    .then(res => res.json()).then(data => {
                        console.log(data)
                        if (data.message == "login succes") {
                            Cookies.set('jwt', data.token, { expires: 30 })
                            window.location.reload()
                        }
                    }).catch(e => console.log(e))
            }
            else if (data.message == "email đã đc sử dụng đăng kí cho tk khác") {
                fetch(`${domain.api}/account/login`, {
                    method: 'POST',
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({
                        email: response.email,
                        password: response.id
                    })
                })
                    .then(res => res.json()).then(data => {
                        console.log(data)
                        if (data.message == "login succes") {
                            Cookies.set('jwt', data.token, { expires: 30 })
                            window.location.reload()
                        }
                    }).catch(e => console.log(e))
            }
        }).catch(e => console.log(e))
}

const responseGoogle = (response) => {
    fetch(`${domain.api}/account/register`, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            name: response.profileObj.familyName + " " + response.profileObj.givenName,
            email: response.profileObj.email,
            age: 0,
            avartar: response.profileObj.imageUrl,
            phonenumber: "",
            username: "",
            password: response.profileObj.googleId
        })
    })
        .then(res => res.json()).then(data => {
            if (data.message == "đăng kí thành công") {
                fetch(`${domain.api}/account/login`, {
                    method: 'POST',
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({
                        email: response.profileObj.email,
                        password: response.profileObj.googleId
                    })
                })
                    .then(res => res.json()).then(data => {
                        console.log(data)
                        if (data.message == "login succes") {
                            Cookies.set('jwt', data.token, { expires: 30 })
                            window.location.reload()
                        }
                    }).catch(e => console.log(e))
            }
            else if (data.message == "email đã đc sử dụng đăng kí cho tk khác") {
                fetch(`${domain.api}/account/login`, {
                    method: 'POST',
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({
                        email: response.profileObj.email,
                        password: response.profileObj.googleId
                    })
                })
                    .then(res => res.json()).then(data => {
                        console.log(data)
                        if (data.message == "login succes") {
                            Cookies.set('jwt', data.token, { expires: 30 })
                            window.location.reload()
                        }
                    }).catch(e => console.log(e))
            }
        }).catch(e => console.log(e))
    console.log(response);
}

class SignUpLogin extends Component {
    hideSignUp = () => {
        document.getElementById('SignUpLogin').style.display = "none"
    }
    showSignIn = () => {
        document.getElementById('signUp').style.display = "none"
        document.getElementById('signIn').style.display = "inline"
    }
    showSignUp = () => {
        document.getElementById('signIn').style.display = "none"
        document.getElementById('signUp').style.display = "inline"
    }
    postSignUp = () => {
        let password = document.getElementById('password').value
        let reenterpassword = document.getElementById('password-repeat').value
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        fetch(`${domain.api}/account/isUsedEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('email').value
            })
        })
            .then(res => res.json()).then(data => {
                if (data.isUsed == true) {
                    ReactDOM.render(<Notify status="fail" message="Email của bạn đã được sử dụng" />, document.getElementById('notify'))
                } else
                    if (password == reenterpassword && email !== "" && name !== "" && password !== "" && password.length >= 6) {
                        fetch(`${domain.api}/account/register`, {
                            method: 'POST',
                            mode: 'cors', // no-cors, *cors, same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            redirect: 'follow', // manual, *follow, error
                            referrerPolicy: 'no-referrer',
                            body: JSON.stringify({
                                name: name,
                                email: email,
                                age: 0,
                                phonenumber: "",
                                password: password
                            })
                        })
                            .then(res => res.json()).then(data => {
                                if (data.message == "đăng kí thành công") {
                                    fetch(`${domain.api}/account/login`, {
                                        method: 'POST',
                                        mode: 'cors', // no-cors, *cors, same-origin
                                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                        credentials: 'same-origin', // include, *same-origin, omit
                                        headers: {
                                            'Content-Type': 'application/json'
                                            // 'Content-Type': 'application/x-www-form-urlencoded',
                                        },
                                        redirect: 'follow', // manual, *follow, error
                                        referrerPolicy: 'no-referrer',
                                        body: JSON.stringify({
                                            email: email,
                                            password: password
                                        })
                                    })
                                        .then(res => res.json()).then(data => {
                                            console.log(data)
                                            if (data.message == "login succes") {
                                                Cookies.set('jwt', data.token, { expires: 30 })
                                                window.location.reload()
                                            }
                                        }).catch(e => console.log(e))
                                }
                                else ReactDOM.render(<Notify status="fail" message={data.message} />, document.getElementById('notify'))
                            }).catch(e => console.log(e))
                    } else {
                        if (password !== reenterpassword)
                            ReactDOM.render(<Notify status="fail" message="Mật khẩu và mật khẩu của bạn không trùng khớp." />, document.getElementById('notify'))
                        else if (password.length < 6)
                            ReactDOM.render(<Notify status="fail" message="Mật khẩu của bạn quá ngắn. Tối thiếu phải có 6 kí tự." />, document.getElementById('notify'))
                        else ReactDOM.render(<Notify status="fail" message="Bạn vẫn chưa nhập đầy đủ thông tin." />, document.getElementById('notify'))
                    }
            })
    }
    postLogin = () => {
        if (document.getElementById('emailLogin').value == "" || document.getElementById('passwordLogin').value == "") {
            ReactDOM.render(<Notify status="fail" message="Bạn vẫn chưa nhập đủ email và mật khẩu." />, document.getElementById('notify'))
        }
        else {
            fetch(`${domain.api}/account/login`, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    email: document.getElementById('emailLogin').value,
                    password: document.getElementById('passwordLogin').value
                })
            })
                .then(res => res.json()).then(data => {
                    console.log(data)
                    if (data.message == "login succes") {
                        Cookies.set('jwt', data.token, { expires: 30 })
                        window.location.reload()
                    } else ReactDOM.render(<Notify status="fail" message={data.message} />, document.getElementById('notify'))
                }).catch(e => console.log(e))
        }
    }

    onChangeEmail = () => {
        if (document.getElementById('email').value == "") {
            document.getElementById('okEmail').style.display = "none"
            document.getElementById('emailIsUsed').style.display = "none"
            document.getElementById('emailIsNotValid').style.display = "none"
        }
        else if (EmailValidator.validate(document.getElementById('email').value)) {
            fetch(`${domain.api}/account/isUsedEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: document.getElementById('email').value
                })
            })
                .then(res => res.json()).then(data => {
                    if (data.isUsed == true) {
                        document.getElementById('okEmail').style.display = "none"
                        document.getElementById('emailIsUsed').style.display = "block"
                        document.getElementById('emailIsNotValid').style.display = "none"
                    } else {
                        document.getElementById('okEmail').style.display = "block"
                        document.getElementById('emailIsUsed').style.display = "none"
                        document.getElementById('emailIsNotValid').style.display = "none"
                    }
                }).catch(e => console.log(e))
        } else {
            document.getElementById('okEmail').style.display = "none"
            document.getElementById('emailIsUsed').style.display = "none"
            document.getElementById('emailIsNotValid').style.display = "block"
        }
    }

    onChangePassword = () => {
        if (document.getElementById('password').value=="") {
            document.getElementById('okPassword').style.display = "none"
            document.getElementById('passwordNotOK').style.display = "none"
        } else if(document.getElementById('password').value.length<6) {
            document.getElementById('okPassword').style.display = "none"
            document.getElementById('passwordNotOK').style.display = "block"
        } else {
            document.getElementById('okPassword').style.display = "block"
            document.getElementById('passwordNotOK').style.display = "none"
        }
    }

    onChangeRePassword = () => {
        if (document.getElementById('password-repeat').value==document.getElementById('password').value) {
            document.getElementById('okRePassword').style.display = "block"
        } else {
            document.getElementById('okRePassword').style.display = "none"
        }
    }

    render() {
        return (
            <div id="SignUpLogin">
                <div className="clickHide" onClick={this.hideSignUp}>
                </div>
                <div className="SignUp animate__animated animate__fadeIn" id="signUp">
                    <h1>Đăng ký</h1>
                    <form>
                        <div>
                            <label for="name">
                                <b>Họ tên</b>
                            </label>
                            <input type="text" placeholder="Enter Name" name="name" id="name" required></input>
                        </div>
                        <div>
                            <label for="email">
                                <b>Email</b>
                                <div className="registerNotify" id="okEmail">
                                    <img style={{ height: "15px" }} src="https://tranggiadung.com/wp-content/uploads/2017/07/Ok-icon.png"></img>
                                </div>
                                <div className="registerNotify" id="emailIsUsed">Email này đã được đăng kí</div>
                                <div className="registerNotify" id="emailIsNotValid">Email không hợp lệ</div>
                            </label>
                            <input type="text" placeholder="Enter Email" name="email" id="email" onChange={this.onChangeEmail} required></input>
                        </div>
                        <div>
                            <label for="password">
                                <b>Mật khẩu</b>
                                <div className="registerNotify" id="okPassword">
                                    <img style={{ height: "15px" }} src="https://tranggiadung.com/wp-content/uploads/2017/07/Ok-icon.png"></img>
                                </div>
                                <div className="registerNotify" id="passwordNotOK">Mật khẩu phải có ít nhất 6 kí tự</div>
                            </label>
                            <input type="password" placeholder="Enter Password" name="password" id="password" onChange={this.onChangePassword} required></input>
                        </div>
                        <div>
                            <label for="psw-repeat">
                                <b style={{ width: '90%' }}>Nhập lại mật khẩu</b>
                                <div className="registerNotify" style={{ width: '10%' }} id="okRePassword">
                                    <img style={{ height: "15px" }} src="https://tranggiadung.com/wp-content/uploads/2017/07/Ok-icon.png"></img>
                                </div>
                            </label>
                            <input type="password" placeholder="Repeat Password" name="password-repeat" id="password-repeat" onChange={this.onChangeRePassword} required></input>
                        </div>
                    </form>
                    <button type="submit" onClick={this.showSignIn}>Đăng nhập</button>
                    <button type="submit" onClick={this.postSignUp}>Đăng kí</button>
                    <a href="#" style={{ color: "black" }} onClick={this.showSignIn}><div style={{ fontSize: "26px", marginTop: "20px" }}>Đăng nhập bằng
                        <img style={{ height: "30px", width: "30px", marginRight: "10px", marginLeft: "10px" }} src="https://img.icons8.com/plasticine/2x/google-logo.png" ></img>
                         or
                        <img style={{ height: "30px", width: "30px", marginRight: "10px", marginLeft: "10px" }} src="https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png" ></img>
                    </div></a>
                </div>
                <div className="SignUp animate__animated animate__fadeIn" id="signIn" style={{ display: "none" }}>
                    <h1>Đăng nhập</h1>
                    <form>
                        <div>
                            <label for="email"><b>Email</b></label>
                            <input type="text" placeholder="Enter Email" name="email" id="emailLogin" required></input>
                        </div>
                        <div>
                            <label for="psw"><b>Mật khẩu</b></label>
                            <input type="password" placeholder="Enter Password" name="password" id="passwordLogin" required></input>
                        </div>
                    </form>
                    <div><a href="/resetpassword"><u>Quên mật khẩu</u></a></div>
                    <button type="submit" onClick={this.showSignUp}>Đăng ký</button>
                    <button type="submit" onClick={this.postLogin}>Đăng nhập</button>
                    <GoogleLogin
                        clientId="462978120956-5bms397olf8uqib40nctrd0dmq3nceek.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        render={renderProps => (
                            <div onClick={renderProps.onClick} className="SignInOptions">
                                <img style={{ height: "30px", width: "30px", marginRight: "30px", marginLeft: "10px" }} src="https://img.icons8.com/plasticine/2x/google-logo.png" ></img>
                                        Đăng nhập bằng Google
                            </div>
                        )}
                        cookiePolicy={'single_host_origin'}
                    />
                    <FacebookLogin
                        appId="1936758909798403"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        render={renderProps => (
                            <div onClick={renderProps.onClick} className="SignInOptions">
                                <img style={{ height: "30px", width: "30px", marginRight: "30px", marginLeft: "10px" }} src="https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png" ></img>
                                        Đăng nhập bằng Facebook
                            </div>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default SignUpLogin;
