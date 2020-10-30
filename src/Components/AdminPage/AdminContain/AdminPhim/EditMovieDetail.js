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
        this.onClickEditButton = this.onClickEditButton.bind(this)
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
                    this.setState({ movie: data, date: new Date(data.date_start?data.date_start:null), movietimes:res, times: res[0]?res[0].movietime.times:[]})
                })
            })
    }

    
    onChangeImage(element) {
        let files = element.target.files
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (element) => {
            console.warn(element.target.result)
            console.log(files[0])
            this.setState({ movie: this.state.movie, date: this.state.date , image: files[0]})
        }
    }

    onClickEditButton() {
        const formData = new FormData()
        if(this.state.image)
            formData.append('image', this.state.image, this.state.image.name)
        formData.append('name', document.getElementById("movieName").value==""?this.state.movie.name:document.getElementById("movieName").value)
        formData.append('decription', document.getElementById("description").value==""?this.state.movie.decription:document.getElementById("description").value)
        formData.append('director', document.getElementById("director").value==""?this.state.movie.director:document.getElementById("director").value)
        formData.append('actor', document.getElementById("actors").value==""?this.state.movie.actor:document.getElementById("actors").value)
        formData.append('type', document.getElementById("type").value==""?this.state.movie.type:document.getElementById("type").value)
        formData.append('length', document.getElementById("length").value==""?this.state.movie.length:document.getElementById("length").value)
        formData.append('language', document.getElementById("language").value==""?this.state.movie.language:document.getElementById("language").value)
        formData.append('rating', document.getElementById("rating").value==""?this.state.movie.rating:document.getElementById("rating").value)
        formData.append('date', {date_start: new Date(), date_end: null})
        formData.append('slug', document.getElementById("shortlink").value==""?this.state.movie.slug:document.getElementById("shortlink").value)
        fetch(`http://localhost:3000/movie/${this.state.movie._id}`, {
            method: 'PUT',
            body: formData
        })
        .then(e => window.location.href=window.location.origin+"/administrator/phim")
    }

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
                                    <input type="file"  name="image" id="image" onChange={(element) => this.onChangeImage(element)} required></input>
                                </div>
                                <div>
                                    <label for="movieName"><b>Tên phim:</b></label>
                                    <input type="text" placeholder={this.state.movie.name} name="movieName" id="movieName" required></input>
                                </div>
                                <div>
                                    <label for="director"><b>Đạo diễn: </b></label>
                                    <input type="text" placeholder={this.state.movie.director} name="director" id="director" required></input>
                                </div>
                                <div>
                                    <label for="actors"><b>Diễn viên: </b></label>
                                    <input type="text" placeholder={this.state.movie.actor} name="actors" id="actors" required></input>
                                </div>
                                <div>
                                    <label for="type"><b>Thể loại: </b></label>
                                    <input type="text" placeholder={this.state.movie.type} name="type" id="type" required></input>
                                </div>
                                <div>
                                    <label for="length"><b>Thời lượng: </b></label>
                                    <input type="text" placeholder={this.state.movie.length} name="length" id="length" required></input>
                                </div>
                                <div>
                                    <label for="language"><b>Ngôn ngữ: </b></label>
                                    <input type="text" placeholder={this.state.movie.language} name="language" id="language" required></input>
                                </div>
                                <div>
                                    <label for="rating"><b>Rating: </b></label>
                                    <input type="text" placeholder={this.state.movie.rating} name="rating" id="rating" required></input>
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
                                    <textarea type="text" style={{height: '500px'}} placeholder={this.state.movie.decription} name="description" id="description" required></textarea>
                                </div>
                                <div>
                                    <label for="linkTrailer"><b>Link trailer: </b></label>
                                    <input type="text" placeholder={this.state.movie.trailer} name="linkTrailer" id="linkTrailer" required></input>
                                </div>
                                <div>
                                    <label for="shortlink"><b>Shortlink phim: </b></label>
                                    <input type="text" placeholder={this.state.movie.slug} name="shortlink" id="shortlink" required></input>
                                </div>
                            </form>
                        </div>
                        <a onClick={this.onClickEditButton} href="#"><div className="button dangsua">Đăng sửa</div></a>
                    </div>
                </div>
            )
        }

        else return (<AdminLogin />)
    }
}

export default EditMovieDetail