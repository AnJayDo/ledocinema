import React, { Component } from 'react';
import domain from '../domain';
import MovieCard from '../MovieCard/MovieCard'
import './SideMovieList.css'

class SideMoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = { movies: [] };
    }
    
    componentDidMount() {
        fetch(domain.api)
          .then(response => response.json())
          .then(data => this.setState({ movies: data }))
    }

    render() {
        const movies = this.state.movies.filter(e=> e.playing==true).slice(0,3).map(movie => <MovieCard movie={movie} />)
        return (
            <div style={{width: "20%", marginTop: '40px'}}>
                <div>
                    <a href="#" className="header-text">Phim đang chiếu</a>
                </div>
                <div className="sideList">{movies}</div>
            </div>
        )
    }
}

export default SideMoviesList;