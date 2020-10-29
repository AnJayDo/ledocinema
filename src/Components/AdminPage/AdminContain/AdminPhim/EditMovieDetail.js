import React, { Component } from 'react';
import Cookies from 'js-cookie';
import '../AdminPage.css'
import AdminLogin from '../../AdminLogin'
import MovieComponent from './MovieComponent'
import AdminNav from '../AdminNav'
import './adminPhim.css'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


class EditMovieDetail extends Component {
    constructor(props) {
        super(props)
        this.state = { movie: {} }
    }

    componentDidMount() {
        document.getElementById('navbar').style.display = 'none'
        document.getElementById('footer').style.display = 'none'
        fetch(`http://localhost:3000/movie/${this.props.match.params.movie}`)
          .then(response => response.json())
          .then(data => 
            {     
                fetch(`http://localhost:3000/movietime/${data._id}`)
                .then(response => response.json())
                .then(res => {
                    this.setState({ movie: data, date: new Date(data.date_start), movietimes:res, times: res[0]?res[0].movietime.times:[]})
                })
            })
    }

    onSelectDate() {}

    render() {

        if (Cookies.get('admin') == "admin" && Cookies.get('passwordAd') == "admin") {
            return (
                <div className="adminPage">
                    <AdminNav />
                    <div style={{maxHeight: window.innerHeight}} className="adminMainContainer">
                        <div className="topPhimAdmin">
                            <p className="header-text">{this.state.movie.name}</p>
                        </div>
                        <div>
                            <MovieComponent movie={this.state.movie}/>
                        </div>
                        <div>
                            <p className="header-text">Thông tin chỉnh sửa</p>
                            <form className="formEdit">
                                <div>
                                    <label for="movieName"><b>Hình:</b></label>
                                    <input type="file"  name="image" id="image" required></input>
                                </div>
                                <div>
                                    <label for="movieName"><b>Tên phim:</b></label>
                                    <input type="text" value={this.state.movie.name} name="movieName" id="movieName" required></input>
                                </div>
                                <div>
                                    <label for="director"><b>Đạo diễn: </b></label>
                                    <input type="text" value={this.state.movie.director} name="director" id="director" required></input>
                                </div>
                                <div>
                                    <label for="actors"><b>Diễn viên: </b></label>
                                    <input type="text" value={this.state.movie.actor} name="actors" id="actors" required></input>
                                </div>
                                <div>
                                    <label for="type"><b>Thể loại: </b></label>
                                    <input type="text" value={this.state.movie.type} name="type" id="type" required></input>
                                </div>
                                <div>
                                    <label for="type"><b>Ngày khởi chiếu: </b></label>
                                    <Datepicker
                                        onChange={(value) => this.setState({movie: this.state.movie, 
                                            date: value, movietimes: this.state.movietimes, times: this.state.times})}
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.date}
                                    />
                                </div>
                                <div>
                                    <label for="description"><b>Nội dung phim: </b></label>
                                    <textarea type="text" style={{height: '500px'}} value={this.state.movie.decription} name="description" id="description" required></textarea>
                                </div>
                                <div>
                                    <label for="linkTrailer"><b>Link trailer: </b></label>
                                    <input type="text" value={this.state.movie.trailer} name="linkTrailer" id="linkTrailer" required></input>
                                </div>
                            </form>
                        </div>
                        <a href="#"><div className="button dangsua">Đăng sửa</div></a>
                    </div>
                </div>
            )
        }

        else return (<AdminLogin />)
    }
}

export default EditMovieDetail