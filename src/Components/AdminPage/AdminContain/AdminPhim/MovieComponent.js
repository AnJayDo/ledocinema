import React, { Component } from 'react';
import Toggle from 'react-toggle'
import "react-toggle/style.css"

class MovieComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    onChangeDangChieu() {

    }

    onChangSapChieu() {

    }

    onClickDelete(id) {
        fetch(`http://localhost:3000/movie/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if(data.message=='Đã xóa')
                    window.location.reload()
            })
    }

    render() {
        const startDate = new Date(this.props.movie.date_start)
        return (
            <div className="movieComponent">
                <a href={`/administrator/phim/${this.props.movie.slug}`}><img className="movieImage" src={this.props.movie.image} /></a>
                <div className="movieInfo">
                    <h2><a className="movieName" href={`/administrator/phim/${this.props.movie.slug}`}>{this.props.movie.name}</a></h2>
                    <p><b>Đạo diễn: </b>{this.props.movie.director}</p>
                    <p><b>Diễn viên: </b>{this.props.movie.actor}</p>
                    <p><b>Thể loại: </b>{this.props.movie.type}</p>
                    <p><b>Ngày khởi chiếu: </b>{`${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`}</p>
                </div>
                <div className="movieButtons">
                    <div className="toggleContainer"><Toggle
                        defaultChecked={this.props.movie.isAvailable}
                        onChange={this.onChangeDangChieu} />
                        <span> Đang chiếu</span>
                    </div>
                    <div className="toggleContainer"><Toggle
                        defaultChecked={this.props.movie.isUpcoming}
                        onChange={this.onChangSapChieu} />
                        <span> Sắp chiếu</span>
                    </div>
                    <a  href={`/administrator/phim/${this.props.movie.slug}`}><div className="movieComponentButton" style={{ background: "linear-gradient(to bottom right, #777777, #888888)" }}><i class="far fa-edit"></i> Edit</div></a>
                    <a onClick={() => this.onClickDelete(this.props.movie._id)} href="#"><div className="movieComponentButton" style={{ background: "linear-gradient(to bottom right, #ffd752, #fa3838)" }}><i class="far fa-trash-alt"></i> Delete</div></a>
                </div>
            </div>
        )
    }
}

export default MovieComponent