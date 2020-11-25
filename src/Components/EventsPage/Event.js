import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Event extends Component {
    render() {
        const image = this.props.event.image
        let startDate = new Date(this.props.event.date.date_start)
        let endDate = new Date(this.props.event.date.date_end)
        return (
            <div className="eventCard">
                <div>
                    <a href={`/events/${this.props.event.slug}`}><img src={image.indexOf("http")<0?("http://localhost:3000/"+this.props.event.image).replaceAll('\\','/'):this.props.event.image} /></a>
                </div>
                <div className="eventCardText">
                    <a href={`/events/${this.props.event.slug}`}><h3>{this.props.event.name}</h3></a>
                    <p style={{color:"gray", maxHeight: "25px"}}>Thời gian bắt đầu: {startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear()} - Thời gian kết thúc: {endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear()}</p>
                    <p>{ReactHtmlParser(this.props.event.discription)}</p>
                    <div style={{width: '100%', textAlign: 'right'}}><a href={`/events/${this.props.event.slug}`}>Xem thêm</a></div>
                </div>
            </div>
        )
    }
}

export default Event