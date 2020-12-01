import React, { Component } from 'react';
import SideMoviesList from '../SideMoviesList/SideMoviesList';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './movies.css'
import TomatoesImage from '../../Images/RottenTomatoes.png'
import StarImage from '../../Images/Star.png'

const link = "http://localhost:3000/"

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {movie: [], movietimes: [], times: [] , chosenDate: [], chosenTime: ""}
        this.updateTime = this.updateTime.bind(this)
    }
    
    componentDidMount() {
        fetch(`http://localhost:3000/movie/${this.props.match.params.movie}`)
          .then(response => response.json())
          .then(data => 
            {     
                fetch(`http://localhost:3000/movietime/${data._id}`)
                .then(response => response.json())
                .then(res => {
                    this.setState({ movie: data, movietimes:res, times: res, chosenDate: res})
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
        for(let i=0; i<document.getElementsByClassName("ngayChieuPhim").length; i++) {
            document.getElementsByClassName("ngayChieuPhim")[i].style.backgroundColor='rgb(238, 238, 238)'
        }
        for(let i=0; i<document.getElementsByClassName("gioChieuPhim").length; i++) {
            document.getElementsByClassName("gioChieuPhim")[i].style.backgroundColor='white'
        }
        document.getElementById(key).style.backgroundColor="#ffd752"
        this.setState({chosenDate: this.state.times.filter( mvt => (new Date(mvt.movietime.date)).toLocaleDateString()==key )})
    }

    updateGio(key) {
        const result = this.state.movietimes.filter( mvt => mvt._id==key )
        console.log(result[0])
        for(let i=0; i<document.getElementsByClassName("gioChieuPhim").length; i++) {
            document.getElementsByClassName("gioChieuPhim")[i].style.backgroundColor='white'
        }
        document.getElementById(key).style.backgroundColor="#ffd752"
        this.setState({chosenTime: key})
    }
    render() {
        let startDate
        if(!this.state.movie.date) 
            startDate = new Date(this.state.movie.date_start)
        else startDate = new Date(this.state.movie.date.date_start)
        let image = this.state.movie.image
        if(String(image).indexOf("http")<0) image=link+image
        let suatchieu = []
        let today = new Date()
        suatchieu.push(new Date("2020-02-01T17:00:00.000+00:00"))
        suatchieu.push(today)
        if(today.getDay()>0) {
            for(let i=today.getDay(); i<7; i++) {
                suatchieu.push(new Date(suatchieu[suatchieu.length-1].getTime()+86400000))
            }
        }
        suatchieu=suatchieu.map(e => {
            const date = new Date(e)
            return(<div className="ngayChieuPhim" id={e.toLocaleDateString()} onClick={() => this.updateTime(e.toLocaleDateString())}>{date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()}</div>)
        })
        const giochieu = this.state.chosenDate.map(gio => <div className="gioChieuPhim" id={gio._id} onClick={() => this.updateGio(gio._id)}>{gio.movietime.hour}</div>)
	let trailer = new String(this.state.movie.trailer)
        trailer = trailer.slice(trailer.search('embed/')+6).slice(0,trailer.slice(trailer.search('embed/')+6).search('"'))
        return (
            <div className="movieDetail">
                <div style={{marginRight: '8%', width: "60%"}}>
                    <div className="movieHeadInfo">
                        <img id="filmImage" src={image}/>
                        <div className="movieHeadText">
                            <h3 className="header-text">{this.state.movie.name}</h3>
                            <div className="ratingLine"><img className="tomatoes" src={TomatoesImage}/> {this.state.movie.rating}/5<img className="starImg" src={StarImage}/></div>
                            <p><b>Đạo diễn: </b>{this.state.movie.director}</p>
                            <p><b>Diễn viên: </b>{this.state.movie.actor}</p>
                            <p><b>Thể loại: </b>{this.state.movie.type}</p>
                            <p><b>Ngày khởi chiếu: </b>{`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`}</p>
                        </div>
                        <div className="buttonContainer"><div className="button" onClick={this.onClickMuaVe}><i className="fa fa-shopping-cart"></i> Mua vé</div></div>
                    </div>
                    <div>
                        <p className="header-text">Trailer</p>
                        <iframe width="1000px" height="550px" src={`https://www.youtube.com/embed/${trailer}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>
                    </div>
                    <div>
                        <p className="header-text">Nội dung phim</p>
                        <p style={{width: "90%"}}>{ReactHtmlParser(this.state.movie.decription)}</p>
                    </div>
                    {this.state.movie.playing==true?<div id="mua-ve-div">
                        <p className="header-text">Suất chiếu</p>
                        <div className="suatchieu">
                            <div className="ngay-chieu">
                                {suatchieu}
                            </div>
                            <div className="gio-chieu">
                                {giochieu}
                            </div>
                            <div className="buttonchonghe"><div className="button" id="buttonGhe" onClick={() => { if(this.state.chosenTime!="") window.location.href=window.location.origin+"/movies/"+this.state.movie.slug+"/"+this.state.chosenTime}}><i className="fa fa-shopping-cart"></i> Chọn ghế</div></div>
                        </div>
                    </div>:null}

                </div>
                <SideMoviesList />
            </div>
        )
    }
}

export default MovieDetail;