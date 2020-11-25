import React, { Component } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Event from './EventSlide'

class Slideshow extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [] };
    }
    
    componentDidMount() {
        fetch('http://localhost:3000/event/all', {method: 'GET'}).then(res => res.json())
          .then(data => this.setState({events:data}))
    }

    render() {
        const Events = this.state.events.slice(0,4).map(event => <Event event={event}/>)
        return (
          <div className="slide-container">
            <Fade>
                  {Events}
            </Fade>
          </div>
        )
    }
}

export default Slideshow