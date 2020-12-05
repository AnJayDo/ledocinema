import React, { Component } from 'react';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import domain from '../../../domain'

class EventComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    onChangeDangChieu(id) {
        fetch(`${domain.api}/movie/${id}/dangchieu`, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                if(data.message=='Phim đang chiếu')
                    window.location.reload()
            })
    }

    onChangeSapChieu(id) {
        fetch(`${domain.api}/movie/${id}/sapchieu`, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                if(data.message=='Phim sắp chiếu')
                    window.location.reload()
            })
    }

    onClickDelete(id) {
        fetch(`${domain.api}/event/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if(data.message=='Đã xóa')
                    window.location.reload()
            })
    }

    render() {
        let startDate = new Date()
        if(this.props.event.date)
            startDate = new Date(this.props.event.date.date_start)
        const image = this.props.event.image?this.props.event.image:" "
        return (
            <div className="movieComponent">
                <a href={`/administrator/sukien/${this.props.event.slug}`}><img className="movieImage" src={image.indexOf("http")<0?(domain.api+"/"+this.props.event.image).replaceAll('\\','/'):this.props.event.image} /></a>
                <div className="movieInfo">
                    <h2><a className="movieName" href={`/administrator/sukien/${this.props.event.slug}`}>{this.props.event.name}</a></h2>
                    <p className="shortDes"><b>Nội dung: </b>{ReactHtmlParser(this.props.event.discription)}</p>
                    <p><b>Ngày bắt đầu: </b>{`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`}</p>
                </div>
                <div className="movieButtons">
                    <a  href={`/administrator/sukien/${this.props.event.slug}`}><div className="movieComponentButton" style={{ background: "linear-gradient(to bottom right, #777777, #888888)" }}><i class="far fa-edit"></i> Edit</div></a>
                    <a onClick={() => this.onClickDelete(this.props.event._id)} href="#"><div className="movieComponentButton" style={{ background: "linear-gradient(to bottom right, #ffd752, #fa3838)" }}><i class="far fa-trash-alt"></i> Delete</div></a>
                </div>
            </div>
        )
    }
}

export default EventComponent