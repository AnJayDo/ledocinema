import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard'
import './movies.css'
import domain from '../domain'

class NonAvailableMovies extends Component {
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
        const movies = this.state.movies.filter(e => e.playing==false).map( movie => <MovieCard movie={movie}/>)
        return (
            <div className="available moviesList">
                {/* <Slide> */}
                    {movies}
                {/* </Slide> */}
            </div>
        )
    }
}

export default NonAvailableMovies;