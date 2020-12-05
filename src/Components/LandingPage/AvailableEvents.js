import React, { Component } from 'react';
import domain from '../domain'

class AvailableEvents extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [] };
    }
    
    componentDidMount() {
        fetch(`${domain.api}/event/all`, {method: 'GET'}).then(res => res.json())
          .then(data => this.setState({events:data}))
    }

    render() {
        let eventList = this.state.events.map(event => <a style={{padding: '0 2px'}} href={`/events/${event.slug}`}><img style={{width:"250px", borderRadius:'5px'}} src={event.image.indexOf('http')==-1?(domain.api+"/"+event.image).replaceAll('\\','/'):event.image}/></a>)
        return (
            <div id='eventsContainer' >
                {eventList}
            </div>
        )
    }
}

export default AvailableEvents