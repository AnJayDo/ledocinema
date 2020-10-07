import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard'
import { Slide } from 'react-slideshow-image';
import './movies.css'

class AvailableMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {movies: ["1"]}
    }
    
    componentDidMount() {
        fetch('http://localhost:3000')
          .then(response => response.json())
          .then(data => this.setState({ movies: data }))
        console.log(this.state.movies)
    }

    render() {
        const movies = this.state.movies.map( movie => <MovieCard movie={movie}/>)
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