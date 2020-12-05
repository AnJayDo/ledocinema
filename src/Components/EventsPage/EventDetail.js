import React, { Component } from 'react';
import SideMoviesList from '../SideMoviesList/SideMoviesList'
import './EventsPage.css'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import domain from '../domain'

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {eventDetail: {}, startDate: new Date(), endDate: new Date()}
    }
    
    componentDidMount() {
        let url = `${domain.api}/event/${this.props.match.params.event}`
        fetch(url)
          .then(response => response.json())
          .then(data => this.setState({eventDetail: data, startDate: new Date(data.date.date_start), endDate: new Date(data.date.date_end)}))
    }
    render() {
        let image = String(this.state.eventDetail.image)
        let startDate = this.state.startDate
        let endDate = this.state.endDate
        console.log(startDate.getDate())
        console.log(endDate)
        return (
            <div className="eventsPage">
                <div  className="eventsContainer">
                    <p className="header-text">Chi tiết sự kiện</p>
                    <div className="eventList">
                        <div className="eventDetail">
                            <div className="eventDetailHead">
                                <div>
                                    <a href={`/events/${this.state.eventDetail.slug}`}><img src={image.indexOf("http")<0?(domain.api+"/"+this.state.eventDetail.image).replaceAll('\\','/'):this.state.eventDetail.image} /></a>
                                </div>
                                <div className="eventCardText">
                                    <h3 className="eventName">{this.state.eventDetail.name}</h3>
                                    <h3>Thời gian bắt đầu: {startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear()}</h3>
                                    <h3>Thời gian kết thúc: {endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear()}</h3>
                                </div>
                            </div>
                            <p>{ReactHtmlParser(this.state.eventDetail.discription)}</p>
                        </div>
                    </div>
                </div>
                <SideMoviesList />
            </div>
        )
    }
}

export default Event