import React, { Component } from 'react';
import './MovieCard.css'

class MovieCard extends Component {
    render() {
        return(
            <a className="movie-card" href="#">
                <div style={{backgroundImage: {}}} className="movie-image">
                </div>
                <span>{this.props.movie}</span>
            </a>
        )
    }
}

export default MovieCard;