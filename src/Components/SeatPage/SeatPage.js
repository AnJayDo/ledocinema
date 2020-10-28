import React, { Component } from 'react';
import './seat.css'
import SideMoviesList from '../SideMoviesList/SideMoviesList';

class SeatPage extends Component {
    constructor(props) {
        super(props);
        this.state = { movie: {}, movietime: {}, seats: { seat: [] }, chosenSeats: []}
    }

    componentDidMount() {
        fetch(`http://localhost:3000/movie/${this.props.match.params.movie}`)
            .then(response => response.json())
            .then(data => {
                fetch(`http://localhost:3000/movietime/${data._id}`)
                    .then(response => response.json())
                    .then(res => {
                        const movietime = res.filter(element => element._id == this.props.match.params.movietime)[0].movietime
                        const seats = movietime.times.filter(element => element._id == this.props.match.params.time)[0]
                        this.setState({ movie: data, movietime: movietime, seats: seats, chosenSeats: []})
                    })
            })
    }
    onClickSeat(seat) {
        if (document.getElementById("seat" + seat).getElementsByTagName('div')[0].className == "seat") {
            document.getElementById("seat" + seat).getElementsByTagName('div')[0].className = "selectedSeat"
            let seats = this.state.chosenSeats
            seats.push(seat)
            this.setState({ movie: this.state.movie, movietime: this.state.movietime, seats: this.state.seats, chosenSeats: seats})
        } else {
            document.getElementById("seat" + seat).getElementsByTagName('div')[0].className = "seat"
            this.setState({ movie: this.state.movie, movietime: this.state.movietime, seats: this.state.seats, chosenSeats: this.state.chosenSeats.filter(e => e!=seat)})
        }
    }
    render() {
        console.log(this.state)
        const seats = this.state.seats.seat.map(row =>
            <div className="rowSeat">{row.map(column => 
            {
                if(column.available==true){
                    return(<div id={"seat" + column.id} class="seatContainer" onClick={() => this.onClickSeat(column.id)}><div className="seat">{column.id}</div></div>)
                }
                else return(<div class="seatContainer"><div className="seatUnavailable">{column.id}</div></div>)
            })}</div>)
        const startDate = new Date(this.state.movie.date_start)
        const img = this.state.movie.image
        let suatchieu = ""//this.state.movietimes.map(mvt => {
        //     const date = new Date(mvt.movietime.date)
        //     return (<div className="ngayChieuPhim" id={mvt._id} onClick={() => this.updateTime(mvt._id)}>{date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}</div>)
        // })
        const giochieu = ""//this.state.times.map(gio => <div className="gioChieuPhim" id={gio._id} onClick={() => this.updateGio(gio._id)}>{gio.hour}</div>)
        // console.log(this.state)
        // trailer = trailer.slice(trailer.search('embed/') + 6).slice(0, trailer.slice(trailer.search('embed/') + 6).search('"'))
        return (
            <div className="movieDetail">
                <div style={{ paddingRight: '50px' }}>
                    <div>
                        <p className="header-text">Chọn ghế</p>
                        {seats}
                    </div>
                </div>
                <div className="movieHeadInfo">
                    <div className="movieHeadText">
                        <h3 className="header-text">{this.state.movie.name}</h3>
                        {/* <p>{this.state.movie.name}</p> */}
                        <img src={img} />
                        <p><b>Giá vé: {this.state.seats.price}đ</b></p>
                        <p><b>Ghế đã chọn: </b>{this.state.chosenSeats.toString()}</p>
                        <p><b>Số ghế đã chọn: </b>{this.state.chosenSeats.length}</p>
                        <p><b>Tổng: {this.state.seats.price*this.state.chosenSeats.length}đ</b></p>
                        <div className="button" onClick={this.onClickMuaVe}> Thanh toán </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SeatPage;