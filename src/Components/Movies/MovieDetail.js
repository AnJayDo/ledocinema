import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard'
import SideMoviesList from '../SideMoviesList/SideMoviesList';
import './movies.css'

class AvailableMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {movie: []}
    }
    
    componentDidMount() {
        fetch(`http://localhost:3000/movie/${this.props.match.params.movie}`)
          .then(response => response.json())
          .then(data => this.setState({ movie: data }))
    }

    render() {
        const startDate = new Date(this.state.movie.date_start)
        const img = "https://lichchieu.vn/uploads/movie/poster/160/thumb_gemini_man_intl_tsr_1-sht_27x40_eng_1_.jpg"
        let trailer = new String(this.state.movie.trailer)
        trailer = trailer.slice(trailer.search('embed/')+6).slice(0,trailer.slice(trailer.search('embed/')+6).search('"'))
        return (
            <div className="movieDetail">
                <div>
                    <div className="movieHeadInfo">
                        <img src={img}/>
                        <div>
                            <h3>{this.state.movie.name}</h3>
                            <p>{this.state.movie.name}</p>
                            <div><img />{this.state.movie.rating}</div>
                            <p><b>Đạo diễn: </b>{this.state.movie.director}</p>
                            <p><b>Diễn viên: </b>{this.state.movie.actor}</p>
                            <p><b>Thể loại: </b>{this.state.movie.type}</p>
                            <p><b>Ngày khởi chiếu: </b>{`${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`}</p>
                        </div>
                    </div>
                    <div>
                        <p className="header-text">Trailer</p>
                        <iframe width="560px" height="315" src={`https://www.youtube.com/embed/${trailer}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>
                    </div>

                </div>
                <SideMoviesList />
            </div>
        )
    }
}

export default AvailableMovies;