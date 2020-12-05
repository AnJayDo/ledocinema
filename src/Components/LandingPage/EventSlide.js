import React, { Component } from 'react';
import 'react-slideshow-image/dist/styles.css'
import domain from '../domain'

class EventSlide extends Component {
    render() {
        let image = this.props.event.image
        if(image.indexOf('http')==-1)
            image=(domain.api+"/"+image).replaceAll('\\','/')
        return (
            <div className="each-fade">
                <a href={`/events/${this.props.event.slug}`}>
                    <div style={{backgroundImage: `url(${image})`}} className="image-container event"></div>
                </a>
            </div>
        )
    }
}

export default EventSlide