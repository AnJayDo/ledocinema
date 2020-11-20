import React, { Component } from 'react';
import logo from '../../../Images/logo.png'
import './AdminNav.css'

class AdminNav extends Component {
    componentDidMount() {
        let a = String(document.location.href)
        let id = ""
        if (a.slice(a.indexOf("administrator/") + 14).indexOf("/") == -1)
            id = a.slice(a.indexOf("administrator/") + 14).slice(0)
        else id = a.slice(a.indexOf("administrator/") + 14).slice(0, a.slice(a.indexOf("administrator/") + 14).indexOf("/"))
        if (id !== "phim" && id!== "sukien")
            id = "homeAd"
        document.getElementById(id).className = "usingTab"
        document.getElementById(id).getElementsByTagName("a")[0].style.color="rgb(255, 201, 51)"
    }

    render() {
        return(<div style={{maxHeight: (window.innerHeight-60)}} className="adminNav">
            <a id="logoToClick" href="/"><img id="logo" src={logo}/></a>
            <ul>
                <li id="homeAd"><i class="fas fa-home"></i><a href="/administrator">Tổng quan</a></li>
                <li id="phim"><i class="fas fa-film"></i><a href="/administrator/phim">Phim</a></li>
                <li id="sukien"><i class="fas fa-calendar-alt"></i><a href="/administrator/sukien">Sự kiện</a></li>
                <li><i class="fas fa-gifts"></i><a href="/administrator/quatang">Quà tặng</a></li>
                <li><i class="fas fa-money-bill-wave"></i><a href="/administrator/doanhthu">Doanh thu</a></li>
            </ul>
        </div>
        )
    }
}

export default AdminNav