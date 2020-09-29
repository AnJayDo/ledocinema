import React, { Component } from 'react';

class Event extends Component {
    render() {
        const image = this.props.event
        return (
            <div className="eventCard">
                <div>
                    <a href="#"><img src={image} /></a>
                </div>
                <div className="eventCardText">
                    <p>{this.props.event}</p>
                    <a href="#">Xem thêm</a>
                </div>
            </div>
        )
    }
}

export default Event