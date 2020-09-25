import React, { Component } from 'react';
import 'react-slideshow-image/dist/styles.css'

class EventSlide extends Component {
    render() {
        return (
            <div className="each-fade">
                <a href={"#"}><div style={{backgroundImage: `${this.props.number}`}} className="image-container event">
                    <h2>Slide {this.props.number}</h2>
                </div></a>
            </div>
        )
    }
}

export default EventSlide