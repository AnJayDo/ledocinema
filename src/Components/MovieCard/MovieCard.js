import React, { Component } from 'react';
import './MovieCard.css'

class MovieCard extends Component {
    render() {
        return(
            <a className="movie-card" href="#">
                <div style={{backgroundImage: `url("https://lichchieu.vn/uploads/movie/poster/160/thumb_gemini_man_intl_tsr_1-sht_27x40_eng_1_.jpg")`}} className="movie-image">
                </div>
                <span>{this.props.movie.name}</span>
            </a>
        )
    }
}

export default MovieCard;