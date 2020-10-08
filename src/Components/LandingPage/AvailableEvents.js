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
        console.log(this.state.events)
        let eventList = this.state.events.map(event => <a href={`/events/${event.slug}`}><img width="250px" src={event.image}/></a>)
        return (
            <div style={{display: 'flex', width: '90%', justifyContent: 'center', overflow: 'scroll'}} className="availableEvents">
                {eventList}
            </div>
        )
    }
}

export default AvailableEvents