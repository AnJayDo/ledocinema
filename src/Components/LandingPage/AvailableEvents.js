import React, { Component } from 'react';

class AvailableEvents extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [] };
    }
    
    componentDidMount() {
        fetch('http://localhost:3000/event/all', {method: 'GET'}).then(res => res.json())
          .then(data => this.setState({events:data}))
    }

    render() {
        let eventList = this.state.events.map(event => <a style={{padding: '0 2px'}} href={`/events/${event.slug}`}><img style={{width:"250px", borderRadius:'5px'}} src={event.image}/></a>)
        return (
            <div id='eventsContainer' >
                {eventList}
            </div>
        )
    }
}

export default AvailableEvents