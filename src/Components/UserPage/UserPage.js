import React, { Component } from 'react';
import './UserPage.css'
import Cookies from 'js-cookie'
import ReactDOM from 'react-dom'
import Notify from '../Notify/Notify'
import domain from '../domain'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const encodeToken = Cookies.get('jwt')
const link = "http://localhost:3000/"

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], history: [], image: {}};
    }

    onChangeImage(element) {
        let files = element.target.files
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (element) => {
            console.warn(element.target.result)
            console.log(files[0])                
            const formData = new FormData()
            //if(this.state.image)
                formData.append('avartar', files[0], files[0].name)
            fetch(`${domain.api}/account/avartar`, {
                method: 'PUT',
                headers: {
                    'auth-token': encodeToken
                },
                body: formData
            }).then(res => res.json()).then(data => {
                if(data.message=="Đã cập nhập ảnh đại diện") {
                    this.setState({ data: this.state.data, history: this.state.history , image:link+"src/resoures/"+files[0].name})
                    ReactDOM.render(<Notify message={data.message} />, document.getElementById('notify'))
                }
            }).catch(e => console.log(e))
        }
    }


    componentDidMount() {
        fetch(`${domain.api}/account/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': encodeToken
            }
        }).then(res => res.json()).then(data => {
                fetch(`${domain.api}/ticket/history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': encodeToken
                }
            }).then(res => res.json()).then(res => {
                let image = data.avartar
                if(String(image).indexOf("http")<0) image=link+image
                let rows = res.slice(res.length-10).reverse()
                this.setState({ data: data, history: rows, image: image })
                console.log(this.state)
            })
        })
        if (window.location.hash.length) {
            document.getElementsByClassName("header-text")[2].className="not-header-text"
            document.getElementsByClassName("userContainerDetail")[0].style.display = "none"
            document.getElementsByClassName("userContainerDetail")[1].style.display = "none"
            document.getElementsByClassName("userContainerDetail")[2].style.display = "none"
            document.getElementsByClassName("userContainerDetail")[3].style.display = "none"
            if(window.location.hash.slice(1)=="detail") {
                document.getElementById(`tabName0`).className="header-text"
                document.getElementsByClassName("userContainerDetail")[0].style.display = "flex"
            }
            if(window.location.hash.slice(1)=="changePassword") {
                document.getElementById(`tabName1`).className="header-text"
                document.getElementsByClassName("userContainerDetail")[1].style.display = "flex"
            }
            if(window.location.hash.slice(1)=="gift") {
                document.getElementById(`tabName2`).className="header-text"
                document.getElementsByClassName("userContainerDetail")[2].style.display = "flex"
            }
            if(window.location.hash.slice(1)=="buyhistory") {
                document.getElementById(`tabName3`).className="header-text"
                document.getElementsByClassName("userContainerDetail")[3].style.display = "flex"
            }
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
    onClickAvatar() {
        document.getElementById("image").click()
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
                        <img id="avatarToChange" className="avatarToChange" src={this.state.image} />
                        <input style={{display: "none"}} type="file" name="image" id="image" onChange={(element) => this.onChangeImage(element)}></input>
                        <div style={{ marginLeft: "30px" }} onClick={this.onClickAvatar} className="button">Thay ảnh đại diện</div>
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
                    <div style={{ width: "100%", marginBottom: '280px' }} className="thongtinchitiet">
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
                    <TableContainer component={Paper}>
                        <Table style={{minWidth:800}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Tên phim</b></TableCell>
                                    <TableCell align="right"><b>Giờ chiếu</b></TableCell>
                                    <TableCell align="right"><b>Thời điểm mua vé</b></TableCell>
                                    <TableCell align="right"><b>Ghế đã chọn</b></TableCell>
                                    <TableCell align="right"><b>Giá</b></TableCell>
                                    <TableCell align="right"><b>Ngày chiếu</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.history.map((row) => (
                                    <TableRow key={row.namemovie}>
                                        <TableCell component="th" scope="row">
                                            {row.namemovie}
                                        </TableCell>
                                        <TableCell align="right">{row.hour}</TableCell>
                                        <TableCell align="right">{(new Date(row.createdAt)).toLocaleString('vn-VN')}</TableCell>
                                        <TableCell align="right">{row.seat.toString()}</TableCell>
                                        <TableCell align="right">{row.total_price}</TableCell>
                                        <TableCell align="right">{(new Date(row.date)).toLocaleString('vn-VN')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}

export default UserPage