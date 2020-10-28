import React, { Component } from 'react';
import './UserPage.css'
import Cookies from 'js-cookie'

const encodeToken = Cookies.get('jwt')

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], history: []};
    }

    componentDidMount() {
        fetch('http://localhost:3000/account/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': encodeToken
            }
        }).then(res => res.json()).then(data => {
                fetch('http://localhost:3000/ticket/history', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': encodeToken
                }
            }).then(res => res.json()).then(res => {
                this.setState({ data: data, history: res })
            })
        })
        if (window.location.href.slice(window.location.origin.length) == "/user#changePassword") {
            document.getElementsByClassName("header-text")[2].className="not-header-text"
            document.getElementById("tabName1").className="header-text"
            document.getElementsByClassName("userContainerDetail")[0].style.display = "none"
            document.getElementsByClassName("userContainerDetail")[1].style.display = "inline"
        }
    }

    onClickTab(num) {
        document.getElementsByClassName("header-text")[2].className="not-header-text"
        document.getElementById(`tabName${num}`).className="header-text"
        document.getElementsByClassName("userContainerDetail")[0].style.display = "none"
        document.getElementsByClassName("userContainerDetail")[1].style.display = "none"
        document.getElementsByClassName("userContainerDetail")[2].style.display = "none"
        document.getElementsByClassName("userContainerDetail")[3].style.display = "none"
        document.getElementsByClassName("userContainerDetail")[num].style.display = "flex"
    }

    doiMatKhau() {
        if(document.getElementById("matkhaumoi").value==document.getElementById("nhaplaimatkhau").value) {
            fetch('http://localhost:3000/account/changepassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': encodeToken
                },
                body: JSON.stringify({
                    oldpassword: document.getElementById("matkhaucu").value,
                    newpassword: document.getElementById("matkhaumoi").value
                })
            }).then(res => res.json()).then(data => {
                if(data.message=='Mật khẩu cũ không đúng') 
                    window.location.href="/successChange#fail"
                else window.location.href="/successChange"
            })
        }
    }

    inputOnChange() {
        if(document.getElementById("matkhaumoi").value!=document.getElementById("nhaplaimatkhau").value && document.getElementById("khongtrungkhop").style.display=="") {
            document.getElementById("khongtrungkhop").style.display="inline"
        }
        else if(document.getElementById("matkhaumoi").value==document.getElementById("nhaplaimatkhau").value) 
            document.getElementById("khongtrungkhop").style.display="none"
    }

    render() {
        return (
            <div className="userPage">
                {/* <form> */}
                <div className="tabUserPage">
                    <a onClick={() => this.onClickTab(0)} href="#detail"><div className="header-text" id="tabName0">Thông tin khách hàng</div></a>
                    <a onClick={() => this.onClickTab(1)} href="#changePassword"><div className="not-header-text" id="tabName1">Đổi mật khẩu</div></a>
                    <a onClick={() => this.onClickTab(2)} href="#gift"><div className="not-header-text" id="tabName2">Quà tặng</div></a>
                    <a onClick={() => this.onClickTab(3)} href="#buyhistory"><div className="not-header-text" id="tabName3">Lịch sử mua hàng</div></a>
                </div>
                <div id="userTab0"  className="userContainerDetail">
                    <div style={{ textAlign: "center" }}>
                        {/* <input type="file" name="avatar"> */}
                        <img className="avatarToChange" src={"https://c7.uihere.com/files/348/800/890/computer-icons-avatar-user-login-avatar-thumb.jpg"} />
                        <div className="button">Thay ảnh đại diện</div>
                        {/* </input> */}
                    </div>
                    <div style={{ width: "100%" }} className="thongtinchitiet">
                        <div className="thongtin"><b>Tên khách hàng:</b> {this.state.data.name}</div>
                        <div className="thongtin"><b>Email:</b> {this.state.data.email}</div>
                        <div className="thongtin"><b>Ngày sinh:</b> {this.state.data.birthday ? this.state.data.birthday : "01/01/2000"}</div>
                        <div className="thongtin"><b>Số điện thoại:</b> {this.state.data.phone ? this.state.data.phone : "09*********07"}</div>
                        <div style={{ marginLeft: "60%" }} className="button">Sửa thông tin</div>
                    </div>
                    {/* </form> */}
                </div>
                <div style={{ display: "none" }} id="userTab" className="userContainerDetail">
                    <div style={{ width: "100%" }} className="thongtinchitiet">
                        <form>
                            <div id="khongtrungkhop">Mật khẩu mới và mật khẩu nhập lại không trùng khớp</div>
                            <div className="thongtin"><b>Mật khẩu cũ:</b> <input type="password" id="matkhaucu"/></div>
                            <div className="thongtin"><b>Mật khẩu mới:</b> <input type="password" id="matkhaumoi"/></div>
                            <div className="thongtin"><b>Nhập lại mật khẩu:</b> <input type="password" onChangeCapture={this.inputOnChange} id="nhaplaimatkhau"/></div>
                        </form>
                        <div style={{ marginLeft: "70%" }} onClick={this.doiMatKhau} className="button">Đổi mật khẩu</div>
                    </div>
                    {/* </form> */}
                </div>
                <div style={{ display: "none" }} id="userTab1" className="userContainerDetail">
                </div>
                <div style={{ display: "none" }} id="userTab1" className="userContainerDetail">
                </div>
            </div>
        )
    }
}

export default UserPage