import React, { Component } from 'react';
import 'react-slideshow-image/dist/styles.css'

class EventSlide extends Component {
    render() {
        return (
            <div className="each-fade">
                <a href={`/events/${this.props.event.slug}`}><div style={{backgroundImage: `url(${this.props.event.image})`}} className="image-container event">
                    {/* <h2>{this.props.event.name}</h2> */}
                </div></a>
            </div>
        )
    }
}

export default EventSlide