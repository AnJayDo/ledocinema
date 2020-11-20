import React, { Component } from 'react';
import Cookies from 'js-cookie';
import './AdminPage.css'
import AdminLogin from '../AdminLogin'
import AdminNav from './AdminNav'
import {Line, Doughnut} from 'react-chartjs-2'

class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        document.getElementById('navbar').style.display='none'
        document.getElementById('footer').style.display='none'
    }

    getWeekData() {
        return ({
            labels: ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'],
            datasets: [
                {
                    label: 'Doanh thu khác (triệu đồng)',
                    data: [5, 2, 1.6, 1.2, 3, 4, 3.6],
                    backgroundColor: ['#ffff9d'],
                    borderWidth: 4
                }, {
                    label: 'Doanh thu phim (triệu đồng)',
                    data: [27, 18, 25.4, 19.3, 20.7, 47.2, 46.1],
                    backgroundColor: ['#ffdc6b'],
                    borderWidth: 4
                }, {
                    label: 'Doanh thu (triệu đồng)',
                    data: [32, 20, 27, 20.5, 23.7, 51.2, 49.7],
                    backgroundColor: ['orange'],
                    borderWidth: 4
                }]
        })
    }

    render() {
        if(Cookies.get('admin')=="admin" && Cookies.get('passwordAd')=="admin")
        return(<div className="adminPage">
            <AdminNav />
            <div style={{ maxHeight: (window.innerHeight - 60), minHeight: (window.innerHeight - 60)}} className="adminMainContainer">
                <h3 className="header-text">TRANG CHỦ</h3>
                <div style={{display: "flex"}}>
                    <div className="infoCard">
                        <div className="infoCardHead">
                            <i class="fas fa-users"></i>
                            <div style={{maxWidth: "109px"}}><b>Người dùng</b></div>
                        </div>
                        <div className="infoCardDetails"> 
                            <p style={{fontSize: "30px"}}>345</p>
                            <p style={{maxWidth: "150px"}}>người dùng</p>
                        </div>
                    </div>
                    <div className="infoCard">
                        <div className="infoCardHead">
                            <i class="fas fa-user-plus"></i>
                            <div style={{maxWidth: "109px"}}><b>Tuần này</b></div>
                        </div>
                        <div className="infoCardDetails"> 
                            <p style={{fontSize: "30px"}}>23</p>
                            <p style={{maxWidth: "150px"}}>người dùng mới</p>
                        </div>
                    </div>
                    <div className="infoCard">
                        <div className="infoCardHead">
                        <i class="fas fa-money-check-alt"></i>
                            <div style={{maxWidth: "109px"}}><b>Doanh thu</b></div>
                        </div>
                        <div className="infoCardDetails"> 
                            <p style={{fontSize: "30px"}}>{(32+20+27+20.5+23.7+51.2+49.7).toFixed(2)}</p>
                            <p style={{maxWidth: "150px"}}>triệu đồng</p>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex"}}>
                    <div className="dataChart">
                        <div className="tagOptions">
                            <div className="option">Ngày</div>
                            <div className="option Selected">Tuần</div>
                            <div className="option">Tháng</div>
                            <div className="option">Năm</div>
                        </div>
                        <div>
                            {<Line data={this.getWeekData} options={{
                                responsive: true,
                                title: { text: "Doanh thu tuần", display: true },
                                scales: {
                                    yAxes: [
                                        {
                                            gridLines: {
                                                display: false
                                            }
                                        }
                                    ]
                                }
                            }} />}
                        </div>
                    </div>
                    <div className="dataChart">
                        <div className="tagOptions">
                            <div className="option">Ngày</div>
                            <div className="option Selected">Tuần</div>
                            <div className="option">Tháng</div>
                            <div className="option">Năm</div>
                        </div>
                        <div>
                            {<Doughnut data={this.getWeekData} options={{
                                responsive: true,
                                title: { text: "Doanh thu tuần", display: true },
                                scales: {
                                    yAxes: [
                                        {
                                            gridLines: {
                                                display: false
                                            }
                                        }
                                    ]
                                }
                            }} />}
                        </div>
                    </div>
                </div>
                
                <div>
                </div>
            </div>
        </div>)
        else return(<AdminLogin/>)
    }
}

export default AdminPage