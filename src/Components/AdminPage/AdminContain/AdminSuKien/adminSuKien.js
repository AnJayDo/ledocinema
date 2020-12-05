import React, { Component } from 'react';
import Cookies from 'js-cookie';
import '../AdminPage.css'
import AdminLogin from '../../AdminLogin'
import AdminNav from '../AdminNav'
import './adminSuKien.css'
import EventComponent from './EventComponent'
import domain from '../../../domain'


class AdminSuKien extends Component {
    constructor(props) {
        super(props)
        this.state = { events: [] }
    }

    componentDidMount() {
        document.getElementById('navbar').style.display = 'none'
        document.getElementById('footer').style.display = 'none'
        fetch(`${domain.api}/event/all`, {method: 'GET'}).then(res => res.json())
          .then(data => this.setState({events:data}))
    }

    render() {

        if (Cookies.get('admin') == "admin" && Cookies.get('passwordAd') == "admin") {
            const events = this.state.events.map(event => <EventComponent event={event} />)
            return (
                <div className="adminPage">
                    <AdminNav />
                    <div style={{maxHeight: (window.innerHeight-60), minHeight: (window.innerHeight-60)}} className="adminMainContainer">
                        <div className="topPhimAdmin">
                            <p className="header-text">Danh sách sự kiện</p>
                            <a href="/administrator/sukien/themsukien"><div className="button">+ Thêm sự kiện</div></a>
                        </div>
                        <div>
                            {events}
                        </div>
                    </div>
                </div>
            )
        }

        else return (<AdminLogin />)
    }
}

export default AdminSuKien