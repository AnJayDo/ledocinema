import React, { Component } from 'react';
import SideMoviesList from '../SideMoviesList/SideMoviesList'
import './EventsPage.css'
import Event from './Event'

class EventsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { events: ["abc", "abc", "abc", "abc", "abc", "abc"] };
    }
    render() {
        let eventList = this.state.events.map(event => <Event event={event} />)
        return (
            <div className="eventsPage">
                <div  className="eventsContainer">
                    <p className="header-text">Sự kiện</p>
                    <div className="eventList">
                        {eventList}
                    </div>
                </div>
                <SideMoviesList />
            </div>
        )
    }
}

export default EventsPage