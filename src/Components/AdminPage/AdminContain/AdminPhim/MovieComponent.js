import React, { Component } from 'react';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import domain from '../../../domain'

class MovieComponent extends Component {
    constructor(props) {
        super(props)
    }
    state = {playing: this.props.movie.playing}

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
        fetch(`${domain.api}/movie/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if(data.message=='Đã xóa')
                    window.location.reload()
            })
    }

    render() {
        let startDate
        if(!this.props.movie.date) 
            startDate = new Date(this.props.movie.date_start)
        else startDate = new Date(this.props.movie.date.date_start)
        let image = this.props.movie.image?this.props.movie.image:""
        if(image.indexOf("http")<0)
            image=(domain.api+"/"+this.props.movie.image).replaceAll('\\','/')
        return (
            <div className="movieComponent">
                <a href={`/administrator/phim/${this.props.movie.slug}`}><img className="movieImage" src={image} /></a>
                <div className="movieInfo">
                    <h2><a className="movieName" href={`/administrator/phim/${this.props.movie.slug}`}>{this.props.movie.name}</a></h2>
                    <p><b>Đạo diễn: </b>{this.props.movie.director}</p>
                    <p><b>Diễn viên: </b>{this.props.movie.actor}</p>
                    <p><b>Thể loại: </b>{this.props.movie.type}</p>
                    <p><b>Ngày khởi chiếu: </b>{`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`}</p>
                </div>
                <div className="movieButtons">
                    <div className="toggleContainer"><Toggle
                        defaultChecked={this.state.playing}
                        onChange={() => {
                            if(this.props.movie.playing==false) this.onChangeDangChieu(this.props.movie._id)
                            else this.onChangeSapChieu(this.props.movie._id)
                        }} />
                        <span> Đang chiếu</span>
                    </div>
                    {/* <div className="toggleContainer"><Toggle
                        defaultChecked={this.props.movie.playing?false:true}
                        onChange={() => this.onChangeSapChieu(this.props.movie._id)} />
                        <span> Sắp chiếu</span>
                    </div> */}
                    <a  href={`/administrator/phim/${this.props.movie.slug}`}><div className="movieComponentButton" style={{ background: "linear-gradient(to bottom right, #777777, #888888)" }}><i class="far fa-edit"></i> Edit</div></a>
                    <a onClick={() => this.onClickDelete(this.props.movie._id)} href="#"><div className="movieComponentButton" style={{ background: "linear-gradient(to bottom right, #ffd752, #fa3838)" }}><i class="far fa-trash-alt"></i> Delete</div></a>
                </div>
            </div>
        )
    }
}

export default MovieComponent