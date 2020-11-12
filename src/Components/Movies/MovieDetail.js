import React, { Component } from 'react';
import SideMoviesList from '../SideMoviesList/SideMoviesList';
import './movies.css'

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {movie: [], movietimes: [], times: [] , chosenDate: "", chosenTime: ""}
    }
    
    componentDidMount() {
        fetch(`http://localhost:3000/movie/${this.props.match.params.movie}`)
          .then(response => response.json())
          .then(data => 
            {     
                fetch(`http://localhost:3000/movietime/${data._id}`)
                .then(response => response.json())
                .then(res => {
                    this.setState({ movie: data, movietimes:res, times: res[0]?res[0].movietime.times:[], chosenDate: "", chosenTime: ""})
                })
            })
    }
    onClickMuaVe() {
        window.scrollTo({
            top: document.getElementById('mua-ve-div').offsetTop,
            behavior: 'smooth'
          })
    }

    updateTime(key) {
        const result = this.state.movietimes.filter( mvt => mvt._id==key )
        console.log(result[0])
        for(let i=0; i<document.getElementsByClassName("ngayChieuPhim").length; i++) {
            document.getElementsByClassName("ngayChieuPhim")[i].style.backgroundColor='rgb(238, 238, 238)'
        }
        for(let i=0; i<document.getElementsByClassName("gioChieuPhim").length; i++) {
            document.getElementsByClassName("gioChieuPhim")[i].style.backgroundColor='white'
        }
        document.getElementById(key).style.backgroundColor="#ffd752"
        this.setState({movie: this.state.movie, movietimes:this.state.movietimes,times: result[0].movietime.times, chosenDate: key, chosenTime: ""})
    }

    updateGio(key) {
        const result = this.state.movietimes.filter( mvt => mvt._id==key )
        console.log(result[0])
        for(let i=0; i<document.getElementsByClassName("gioChieuPhim").length; i++) {
            document.getElementsByClassName("gioChieuPhim")[i].style.backgroundColor='white'
        }
        document.getElementById(key).style.backgroundColor="#ffd752"
        this.setState({movie: this.state.movie, movietimes:this.state.movietimes, times: this.state.times, chosenDate: this.state.chosenDate, chosenTime: key})
    }
    render() {
        const startDate = new Date(this.state.movie.date_start)
        const img = this.state.movie.image
        let trailer = new String(this.state.movie.trailer)
        let suatchieu = this.state.movietimes.filter(element => (new Date(element.movietime.date))<(new Date())).slice(0,7).map(mvt => {
            const date = new Date(mvt.movietime.date)
            return(<div className="ngayChieuPhim" id={mvt._id} onClick={() => this.updateTime(mvt._id)}>{date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}</div>)
        })
        const giochieu = this.state.times.map(gio => <div className="gioChieuPhim" id={gio._id} onClick={() => this.updateGio(gio._id)}>{gio.hour}</div>)
        console.log(this.state)
        trailer = trailer.slice(trailer.search('embed/')+6).slice(0,trailer.slice(trailer.search('embed/')+6).search('"'))
        return (
            <div className="movieDetail">
                <div style={{marginRight: '8%', width: "60%"}}>
                    <div className="movieHeadInfo">
                        <img src={img}/>
                        <div className="movieHeadText">
                            <h3 className="header-text">{this.state.movie.name}</h3>
                            {/* <p>{this.state.movie.name}</p> */}
                            <div><img />{this.state.movie.rating}</div>
                            <p><b>Đạo diễn: </b>{this.state.movie.director}</p>
                            <p><b>Diễn viên: </b>{this.state.movie.actor}</p>
                            <p><b>Thể loại: </b>{this.state.movie.type}</p>
                            <p><b>Ngày khởi chiếu: </b>{`${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`}</p>
                            <div className="button" onClick={this.onClickMuaVe}><i className="fa fa-shopping-cart"></i> Mua vé</div>
                        </div>
                    </div>
                    <div>
                        <p className="header-text">Trailer</p>
                        <iframe width="1000px" height="550px" src={`https://www.youtube.com/embed/${trailer}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>
                    </div>
                    <div>
                        <p className="header-text">Nội dung phim</p>
                        <p style={{width: "90%"}}>{this.state.movie.decription}</p>
                    </div>
                    <div id="mua-ve-div">
                        <p className="header-text">Suất chiếu</p>
                        <div className="suatchieu">
                            <div className="ngay-chieu">
                                {suatchieu}
                            </div>
                            <div className="gio-chieu">
                                {giochieu}
                            </div>
                            <div className="buttonchonghe"><div className="button" id="buttonGhe" onClick={() => { if(this.state.chosenTime!="") window.location.href=window.location.href+"/"+this.state.chosenDate+"/"+this.state.chosenTime}}><i className="fa fa-shopping-cart"></i> Chọn ghế</div></div>
                        </div>
                    </div>

                </div>
                <SideMoviesList />
            </div>
        )
    }
}

export default MovieDetail;