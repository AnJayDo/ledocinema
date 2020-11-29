import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard'
import './movies.css'
import domain from '../domain'

class AvailableMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {movies: []}
    }
    
    componentDidMount() {
        fetch(domain.api)
          .then(response => response.json())
          .then(data => this.setState({ movies: data }))
    }

    render() {
        const movies = this.state.movies.filter(e => e.playing==true).map( movie => <MovieCard movie={movie}/>)
        return (
            <div className="available moviesList">
                    {movies}
            </div>
        )
    }
}

export default AvailableMovies;