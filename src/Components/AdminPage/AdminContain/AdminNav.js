import React, { Component } from 'react';
import logo from '../../../Images/logo.png'
import './AdminNav.css'

class AdminNav extends Component {
    render() {
        return(<div className="adminNav">
            <a href="/"><img id="logo" src={logo}/></a>
            <ul>
                <li><a href="/administrator">Tổng quan</a></li>
                <li><a href="/administrator/phim">Phim</a></li>
                <li><a href="/administrator/quatang">Quà tặng</a></li>
                <li><a href="/administrator/doanhthu">Doanh thu</a></li>
            </ul>
        </div>
        )
    }
}

export default AdminNav