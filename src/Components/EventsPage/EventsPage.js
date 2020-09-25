import React, { Component } from 'react';
import SideMoviesList from '../SideMoviesList/SideMoviesList'
import './EventsPage.css'

class EventsPage extends Component {
    render() {
        return (
            <div className="eventsPage">
                <div><p className="header-text">Sự kiện</p></div>
                <SideMoviesList />
            </div>
        )
    }
}

export default EventsPage