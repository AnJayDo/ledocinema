import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard'
import SideMoviesList from '../SideMoviesList/SideMoviesList';
import './movies.css'

class MoviesPage extends Component {
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
        let movies = []
        for(let i=0; i<(this.state.movies.length/5); i++) {
            movies[i] = this.state.movies.slice(i*5,i*5+5).map( movie => <MovieCard movie={movie}/>)
        }
        const mapedMovies = movies.map(arr => <div className='rowMovies'>{arr}</div>)
        return (
            <div className="moviesPage">
                <div style={{marginRight: '50px'}}> 
                    <p className="header-text">Phim</p>
                    {mapedMovies}
                </div>
                <SideMoviesList />
            </div>
        )
    }
}

export default MoviesPage;