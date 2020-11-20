import React from 'react';
import Cookies from 'js-cookie';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import './SignUpLogin.css';
import Notify from '../../Notify/Notify'
import ReactDOM from 'react-dom'

const link = `http://localhost:3000`
const onClickFacebook = (data) => {
    console.log(data)
}
const responseFacebook = (response) => {
    fetch(`${link}/account/register`, {
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
                fetch(`${link}/account/login`, {
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
                fetch(`${link}/account/login`, {
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
    fetch(`${link}/account/register`, {
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
                fetch(`${link}/account/login`, {
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
                fetch(`${link}/account/login`, {
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

function SignUpLogin() {
    let hideSignUp = () => {
        document.getElementById('SignUpLogin').style.display = "none"
    }
    let showSignIn = () => {
        document.getElementById('signUp').style.display = "none"
        document.getElementById('signIn').style.display = "inline"
    }
    let showSignUp = () => {
        document.getElementById('signIn').style.display = "none"
        document.getElementById('signUp').style.display = "inline"
    }
    let postSignUp = () => {
        let password = document.getElementById('password').value
        let reenterpassword = document.getElementById('password-repeat').value
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        if (password == reenterpassword && email!=="" && name!=="" &&  password!=="" ) {
            fetch(`${link}/account/register`, {
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
                    username: "",
                    password: password
                })
            })
                .then(res => res.json()).then(data => {
                    if (data.message == "đăng kí thành công") {
                        fetch(`${link}/account/login`, {
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
            ReactDOM.render(<Notify status="fail" message="Mật khẩu và mật khẩu của bạn không trùng khớp hoặc bạn nhập thiếu thông tin." />, document.getElementById('notify'))
        }
    }
    let postLogin = () => {
        if(document.getElementById('emailLogin').value=="" || document.getElementById('passwordLogin').value==""){
            ReactDOM.render(<Notify status="fail" message="Bạn vẫn chưa nhập đủ email và mật khẩu." />, document.getElementById('notify'))
        }
        else {
            fetch(`${link}/account/login`, {
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
    let isUsedMail = () => { }
    let isLongEnough = () => { }
    let isSamePassword = () => { }
    return (
        <div id="SignUpLogin">
            <div className="clickHide" onClick={hideSignUp}>
            </div>
            <div className="SignUp animate__animated animate__fadeIn" id="signUp">
                <h1>Đăng ký</h1>
                <form>
                    <div>
                        <label for="name">
                            <b>Họ tên</b>
                            <div className="registerNotify" id="okUsername">
                                <img style={{ height: "15px" }} src="https://tranggiadung.com/wp-content/uploads/2017/07/Ok-icon.png"></img>
                            </div>
                            <div className="registerNotify" id="usedUsername">Tên đăng nhập này đã được người khác sử dụng</div>
                        </label>
                        <input type="text" placeholder="Enter Name" name="name" id="name" required></input>
                    </div>
                    <div>
                        <label for="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" id="email" onChange={isUsedMail} required></input>
                    </div>
                    <div>
                        <label for="password"><b>Mật khẩu</b></label>
                        <input type="password" placeholder="Enter Password" name="password" id="password" onChange={isLongEnough} required></input>
                    </div>
                    <div>
                        <label for="psw-repeat"><b>Nhập lại mật khẩu</b></label>
                        <input type="password" placeholder="Repeat Password" name="password-repeat" id="password-repeat" onChange={isSamePassword} required></input>
                    </div>
                </form>
                <button type="submit" onClick={showSignIn}>Đăng nhập</button>
                <button type="submit" onClick={postSignUp}>Đăng kí</button>
                <a href="#" style={{color: "black"}} onClick={showSignIn}><div style={{ fontSize: "26px", marginTop: "20px" }}>Đăng nhập bằng
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
                <button type="submit" onClick={showSignUp}>Đăng ký</button>
                <button type="submit" onClick={postLogin}>Đăng nhập</button>
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
                    onClick={onClickFacebook}
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

export default SignUpLogin;
