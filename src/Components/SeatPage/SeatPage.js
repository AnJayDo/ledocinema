import React, { Component } from 'react';
import './seat.css'
import Cookies from 'js-cookie'

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
    onClickMuaVe() {
        if(Cookies.get("jwt")) {
            document.getElementById("buttonThanhToan").className="button animate__animated animate__fadeOut"
            document.getElementById("phuongThucThanhToan").className="phuongThucThanhToan animate__animated animate__fadeInUp"
            document.getElementById("phuongThucThanhToan").style.display="block"
        }
        else {
            document.getElementById('loginButton').getElementsByTagName('a')[0].click()
        }
    }
    render() {
        console.log(this.state)
        const seats = this.state.seats.seat.map(row =>
            <div className="rowSeat">{row.map(column => 
            {
                if(column.available==true){
                    return(<a href="#"><div id={"seat" + column.id} class="seatContainer" onClick={() => this.onClickSeat(column.id)}><div className="seat">{column.id}</div></div></a>)
                }
                else return(<div class="seatContainer"><div className="seatUnavailable">{column.id}</div></div>)
            })}</div>)
        const startDate = new Date(this.state.movie.date_start)
        const img = this.state.movie.image
        let ngayChieuPhim = new Date(this.state.movietime.date)
        return (
            <div className="seatPage">
                <div style={{ paddingRight: '50px' }}>
                    <div>
                        <p style={{margin: "20px 0"}} className="header-text">Chọn ghế</p>
                        <div className="seats">
                            {seats}
                        </div>
                    </div>
                </div>
                <div style={{margin: "30px 0"}} >
                    <div className="movieHeadInfo">
                        <img src={img} />
                        <div className="movieHeadText">
                            <h3>{this.state.movie.name}</h3>
                            <p><b>Ngày chiếu: {ngayChieuPhim.getDate()+"/"+ngayChieuPhim.getMonth()+"/"+ngayChieuPhim.getFullYear()}</b></p>
                            <p><b>Giờ chiếu: {this.state.seats.hour}</b></p>
                            <p><b>Giá vé: {this.state.seats.price}đ</b></p>
                            <p><b>Ghế đã chọn: </b>{this.state.chosenSeats.toString()}</p>
                            <p><b>Số ghế đã chọn: </b>{this.state.chosenSeats.length}</p>
                            <p><b>Tổng: {this.state.seats.price*this.state.chosenSeats.length}đ</b></p>
                        </div>
                    </div>
                    <div className="phuongThucThanhToan" id="phuongThucThanhToan">
                        <a href="#"><div style={{backgroundColor: "#ae2070"}} class="hinhThucThanhToan">Thanh toán bằng ví Momo</div></a>
                        <a href="#"><div style={{backgroundColor: "#1492fd"}} class="hinhThucThanhToan">Thanh toán bằng AirPay</div></a>
                        <a href="#"><div style={{backgroundColor: "#6772e5"}} class="hinhThucThanhToan">Thanh toán bằng thẻ</div></a>
                    </div>
                    <a href="#"><div id="buttonThanhToan" className="button" onClick={this.onClickMuaVe}> Thanh toán </div></a>
                </div>
            </div>
        )
    }
}

export default SeatPage;