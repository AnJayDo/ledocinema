import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard'
import './SideMovieList.css'

class SideMoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = { movies: [] };
    }
    
    componentDidMount() {
        fetch('http://localhost:3000')
          .then(response => response.json())
          .then(data => this.setState({ movies: data }))
    }

    render() {
        const movies = this.state.movies.slice(0,3).map(movie => <MovieCard movie={movie} />)
        return (
            <div style={{width: "30%", marginTop: '40px'}}>
                <div>
                    <a href="#" className="header-text">Phim đang chiếu</a>
                </div>
                <div className="sideList">{movies}</div>
            </div>
        )
    }
}

export default SideMoviesList;