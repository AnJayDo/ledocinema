import React, { Component } from 'react';
import './MovieCard.css'
import domain from '../domain'

class MovieCard extends Component {
    render() {
        return(
            <a className="movie-card" href={`/movies/${this.props.movie.slug}`}>
                <div style={{backgroundImage: `url("${this.props.movie.image.indexOf("http")<0?(domain.api+"/"+this.props.movie.image).replaceAll('\\','/'):this.props.movie.image}")`}} className="movie-image">
                </div>
                <span>{this.props.movie.name}</span>
            </a>
        )
    }
}

export default MovieCard;