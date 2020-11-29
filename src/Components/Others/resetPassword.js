import React, { Component } from 'react';
import '../UserPage/UserPage.css'
import ReactDOM from 'react-dom'
import Notify from '../Notify/Notify'
import domain from '../domain'


class ResetPassword extends Component {
    constructor(props) {
        super(props);
    }
    layLaiMatKhau() {
        if(document.getElementById('emailReset').value=="")
            ReactDOM.render(<Notify status="fail" message="Mời bạn nhập email." />, document.getElementById('notify'))
        else {
            const data = {email: document.getElementById('emailReset').value}
            fetch(`${domain.api}/account/resetpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(data => {
                if (data.message == 'Vui lòng vào email để nhận lại mật khẩu')
                    ReactDOM.render(<Notify message={data.message} />, document.getElementById('notify'))
                else ReactDOM.render(<Notify status="fail" message={data.message} />, document.getElementById('notify'))
            })
        }
    }

    render() {
        return (
            <div className="userPage">
                <div className="tabUserPage">
                    <div className="header-text">Lấy lại mật khẩu</div>
                </div>
                <div id="userTab" className="userContainerDetail">
                    <div style={{ width: "100%", marginBottom: '280px' }} className="thongtinchitiet">
                        <form>
                            <div id="khongtrungkhop">Mật khẩu mới và mật khẩu nhập lại không trùng khớp</div>
                            <div className="thongtin" style={{ textAlign: 'center' }}><b>Email:</b> <input style={{ width: '70%' }} type="text" id="emailReset" /></div>
                        </form>
                        <div style={{ marginLeft: "70%" }} onClick={this.layLaiMatKhau} className="button">Đổi mật khẩu</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPassword