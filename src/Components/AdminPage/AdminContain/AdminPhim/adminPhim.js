import React, { Component } from 'react';
import Cookies from 'js-cookie';
import '../AdminPage.css'
import AdminLogin from '../../AdminLogin'
import AdminNav from '../AdminNav'
import './adminPhim.css'
import MovieComponent from './MovieComponent'
import domain from '../../../domain'


class AdminPhimPage extends Component {
    constructor(props) {
        super(props)
        this.state = { movies: [] }
    }

    componentDidMount() {
        document.getElementById('navbar').style.display = 'none'
        document.getElementById('footer').style.display = 'none'
        fetch(domain.api)
            .then(response => response.json())
            .then(data => this.setState({ movies: data }))
    }

    render() {

        if (Cookies.get('admin') == "admin" && Cookies.get('passwordAd') == "admin") {
            const movies = this.state.movies.map(movie => <MovieComponent movie={movie} />)
            return (
                <div className="adminPage">
                    <AdminNav />
                    <div style={{maxHeight: (window.innerHeight-60), minHeight: '100vh'}} className="adminMainContainer">
                        <div className="topPhimAdmin">
                            <p className="header-text">Danh sách phim</p>
                            <a href="/administrator/phim/themphim"><div className="button">+ Thêm phim</div></a>
                        </div>
                        <div>
                            {movies}
                        </div>
                    </div>
                </div>
            )
        }

        else return (<AdminLogin />)
    }
}

export default AdminPhimPage