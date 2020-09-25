import React from 'react';
import './SignUpLogin.css';

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

    }
    let postLogin = () => {
        
    }
    let isUsedUsername = () => {
        if(document.getElementById('username').value=="jayan") { document.getElementById('usedUsername').style.display="inline"; document.getElementById('okUsername').style.display="none"; } 
        else if(document.getElementById('username').value=="") { document.getElementById('usedUsername').style.display="none"; document.getElementById('okUsername').style.display="none"; } 
        else { document.getElementById('usedUsername').style.display="none"; document.getElementById('okUsername').style.display="inline"; } 
    }
    let isUsedMail = () => {}
    let isLongEnough = () => {}
    let isSamePassword = () => {}
    return (
        <div id="SignUpLogin">
            <div className="clickHide" onClick={hideSignUp}>
            </div>
            <div className="SignUp animate__animated animate__fadeIn" id="signUp">
                <h1>Đăng ký</h1>
                <form>
                    <div>
                        <label for="email">
                            <b>Tên tài khoản</b>
                            <div className="registerNotify" id="okUsername">
                                <img style={{height:"15px"}} src="https://tranggiadung.com/wp-content/uploads/2017/07/Ok-icon.png"></img>
                            </div>
                            <div className="registerNotify" id="usedUsername">Tên đăng nhập này đã được người khác sử dụng</div>
                        </label>
                        <input type="text" placeholder="Enter Email" name="email" id="username" onChange={isUsedUsername} required></input>
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
                <div style={{fontSize: "26px",marginTop:"20px"}}>Đăng nhập bằng
                    <img style={{height: "30px",width:"30px",marginRight:"10px",marginLeft:"10px"}} onClick={showSignIn} src="https://img.icons8.com/plasticine/2x/google-logo.png" ></img>
                     or 
                    <img style={{height: "30px",width:"30px",marginRight:"10px",marginLeft:"10px"}} onClick={showSignIn} src="https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png" ></img>
                </div>
            </div>
            <div className="SignUp animate__animated animate__fadeIn" id="signIn" style={{display:"none"}}>
                <h1>Đăng nhập</h1>
                <form>
                    <div>
                        <label for="email"><b>Tên tài khoản</b></label>
                        <input type="text" placeholder="Enter Email" name="email" id="email" required></input>
                    </div>
                    <div>
                        <label for="psw"><b>Mật khẩu</b></label>
                        <input type="password" placeholder="Enter Password" name="password" id="password" required></input>
                    </div>
                </form>
                <button type="submit" onClick={showSignUp}>Đăng ký</button>
                <button type="submit" onClick={postLogin}>Đăng nhập</button>
                <div className="SignInOptions"> 
                    <img style={{height: "30px",width:"30px",marginRight:"30px",marginLeft:"10px"}} onClick={showSignIn} src="https://img.icons8.com/plasticine/2x/google-logo.png" ></img>
                        Đăng nhập bằng Google
                </div>
                <div className="SignInOptions"> 
                    <img style={{height: "30px",width:"30px",marginRight:"30px",marginLeft:"10px"}} onClick={showSignIn} src="https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png" ></img>
                        Đăng nhập bằng Facebook
                </div>
            </div>
        </div>
    );
}

export default SignUpLogin;
