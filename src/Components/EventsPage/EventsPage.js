import React, { Component } from 'react';
import SideMoviesList from '../SideMoviesList/SideMoviesList'
import './EventsPage.css'
import Event from './Event'
import domain from '../domain'

class EventsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [] };
    }
    
    componentDidMount() {
        fetch(`${domain.api}/event/all`, {method: 'GET'}).then(res => res.json())
          .then(data => this.setState({events:data}))
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