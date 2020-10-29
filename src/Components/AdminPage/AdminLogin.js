import React from 'react';
import Cookies from 'js-cookie';
import logo from '../../Images/logo.png'
import './adminLogin.css'

const link = `http://localhost:3000`

function AdminLogin() {
    let postLogin = () => {
        // fetch(`${link}/account/login`, {
        //     method: 'POST',
        //     mode: 'cors', // no-cors, *cors, same-origin
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: 'same-origin', // include, *same-origin, omit
        //     headers: {
        //         'Content-Type': 'application/json'
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     redirect: 'follow', // manual, *follow, error
        //     referrerPolicy: 'no-referrer',
        //     body: JSON.stringify({
        //         email: document.getElementById('emailLogin').value,
        //         password: document.getElementById('passwordLogin').value
        //     })
        // })
        //     .then(res => res.json()).then(data => {
        //         if (data.message == "login succes") {
        //             Cookies.set('jwt', data.token, { expires: 30 })
        //             window.location.reload(false)
        //         }
        //     }).catch(e => console.log(e))
        if(document.getElementById('adminUser').value=="admin" && document.getElementById('adminPassword').value=="admin") {
            Cookies.set('admin', document.getElementById('adminUser').value)
            Cookies.set('passwordAd', document.getElementById('adminPassword').value)
            window.location.reload()
        }
            
    }
    return (
        <div className="LoginAdmin">
            <img id="logo" src={logo}/>
            <h1>Đăng nhập</h1>
            <form>
                <div>
                    <label for="adminUser"><b>Username</b></label>
                    <input type="text" placeholder="Enter Administrator" name="adminUser" id="adminUser" required></input>
                </div>
                <div>
                    <label for="adminPassword"><b>Mật khẩu</b></label>
                    <input type="password" placeholder="Enter Password" name="adminPassword" id="adminPassword" required></input>
                </div>
            </form>
            <button type="submit" onClick={postLogin}>Đăng nhập</button>
        </div>
    );
}

export default AdminLogin;
