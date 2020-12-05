import React, { Component } from 'react';
import './seat.css'
import Cookies from 'js-cookie'
import domain from '../domain';
import ReactDOM from 'react-dom'
import Notify from '../Notify/Notify'
import CheckoutForm from './CheckoutForm'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'

let encodedToken = ""
try {
    encodedToken = Cookies.get("jwt")
} catch(e) {
    console.log(e)
}


const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ],
  };

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');


class SeatPage extends Component {
    constructor(props) {
        super(props);
        this.state = { movie: {}, movietime: { movietime: {price: 0, hour: "19:00"}}, seats: [], chosenSeats: [], date: new Date() , ticketID: "", stripe: {}, elements: {} }
        this.onClickMuaVe = this.onClickMuaVe.bind(this)
        this.onClickThanhToan = this.onClickThanhToan.bind(this)
    }

    componentDidMount() {
        fetch(`${domain.api}/movie/${this.props.match.params.movie}`)
            .then(response => response.json())
            .then(data => {
                fetch(`${domain.api}/movietime/${data._id}`)
                    .then(response => response.json())
                    .then(res => {
                        const movietime = res.filter(element => element._id==this.props.match.params.movietime)[0]
                        const seats = movietime.movietime.seat
                        this.setState({ movie: data, movietime: movietime, seats: seats, date: new Date(movietime.movietime.date) })
                        console.log(this.state)
                    })
            })
    }
    onClickSeat(seat) {
        if (document.getElementById("seat" + seat).getElementsByTagName('div')[0].className == "seat") {
            document.getElementById("seat" + seat).getElementsByTagName('div')[0].className = "selectedSeat"
            let seats = this.state.chosenSeats
            seats.push(seat)
            this.setState({ chosenSeats: seats })
        } else {
            document.getElementById("seat" + seat).getElementsByTagName('div')[0].className = "seat"
            this.setState({ chosenSeats: this.state.chosenSeats.filter(e => e != seat) })
        }
    }
    onClickMuaVe() {
        if (encodedToken) {
            if (this.state.chosenSeats.length > 0) {
                const data = {numberticket: this.state.chosenSeats.length, seat: JSON.stringify(this.state.chosenSeats)}
                fetch(`${domain.api}/ticket/${this.props.match.params.movietime}/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': Cookies.get("jwt")
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json()).then(data => {
                    if (data._id) {
                        this.setState({ticketID: data._id})
                        document.getElementById("buttonThanhToan").style.display = "none"
                        document.getElementById("phuongThucThanhToan").className = "phuongThucThanhToan animate__animated animate__fadeInUp"
                        document.getElementById("phuongThucThanhToan").style.display = "block"
                    }
                }).catch(e => console.log(e))
            }
        }
        else {
            document.getElementById('loginButton').getElementsByTagName('a')[0].click()
        }
    }

    onClickThanhToan(key) {
        if (key == "momo") {
            ///paymentMoMo/:id
            fetch(`${domain.api}/ticket/paymentMoMo/${this.state.ticketID}`, {
                method: 'POST',
                headers: {
                    'auth-token': Cookies.get("jwt")
                },
            }).then(res => res.json()).then(data => {
                window.location.href=data.link
            }).catch(e => console.log(e))
        }
        else if(key == "stripe") {
            ReactDOM.render(
                <div id="stripePayment">
                    <div className="clickHide" onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById('stripePayment'))}>
                    </div>
                    <div className="stripeDetail" >
                        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </div>,
                document.getElementById('notify'))
        }
    }

    render() {
        const seats = this.state.seats.map(row =>
            <div className="rowSeat">{row.map(column => {
                if (column.available == false) {
                    return (<a href="#"><div id={"seat" + column.id} class="seatContainer" onClick={() => this.onClickSeat(column.id)}><div className="seat">{column.id}</div></div></a>)
                }
                else return (<div class="seatContainer"><div className="seatUnavailable">{column.id}</div></div>)
            })}</div>)
        const startDate = new Date(this.state.movie.date_start)
        const img = this.state.movie.image
        let ngayChieuPhim = new Date(this.state.date)
        return (
            <div className="seatPage">
                <div style={{ paddingRight: '50px' }}>
                    <div>
                        <p style={{ margin: "20px 0" }} className="header-text">Chọn ghế</p>
                        <div className="seats">
                            {seats}
                        </div>
                    </div>
                </div>
                <div style={{ margin: "30px 0" }} >
                    <div className="movieHeadInfo">
                        <img src={img} />
                        <div className="movieHeadText">
                            <h3>{this.state.movie.name}</h3>
                            <p>Ngày chiếu: <b>{ngayChieuPhim.getDate() + "/" + ngayChieuPhim.getMonth() + "/" + ngayChieuPhim.getFullYear()}</b></p>
                            <p>Giờ chiếu: <b>{this.state.movietime.movietime.hour}</b></p>
                            <p>Giá vé: <b>{this.state.movietime.movietime.price}đ</b></p>
                            <p>Ghế đã chọn: <b>{this.state.chosenSeats.toString()}</b></p>
                            <p>Số ghế đã chọn: <b>{this.state.chosenSeats.length}</b></p>
                            <p><b>Tổng: {this.state.movietime.movietime.price * this.state.chosenSeats.length}đ</b></p>
                        </div>
                    </div>
                    <div>

                    </div>
                    <div className="phuongThucThanhToan" style={{display: 'block'}} id="phuongThucThanhToan">
                        <a><div style={{ backgroundColor: "#ae2070" }} onClick={() => this.onClickThanhToan("momo")} class="hinhThucThanhToan">Thanh toán bằng ví Momo</div></a>
                        <a><div style={{ backgroundColor: "#1492fd" }} onClick={() => this.onClickThanhToan("airpay")} class="hinhThucThanhToan">Thanh toán bằng AirPay</div></a>
                        <a><div style={{ backgroundColor: "#6772e5" }} onClick={() => this.onClickThanhToan("stripe")} class="hinhThucThanhToan">Thanh toán bằng thẻ</div></a>
                    </div>
                    <a><div id="buttonThanhToan" className="button" onClick={this.onClickMuaVe}> Thanh toán </div></a>
                </div>
            </div>
        )
    }
}

export default SeatPage;