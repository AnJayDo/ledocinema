import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard'
import { Slide } from 'react-slideshow-image';
import './movies.css'

class AvailableMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {movies: []}
    }
    
    componentDidMount() {
        fetch('http://localhost:3000')
          .then(response => response.json())
          .then(data => this.setState({ movies: data }))
    }

    render() {
        const movies = this.state.movies.filter(e => e.playing==true).map( movie => <MovieCard movie={movie}/>)
        return (
            <div className="available moviesList">
                {/* <Slide> */}
                    {movies}
                {/* </Slide> */}
            </div>
        )
    }
}

export default AvailableMovies;