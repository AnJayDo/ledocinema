import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Notify from '../../../Notify/Notify'
import AdminNav from '../AdminNav'
import Cookies from 'js-cookie'
import Datepicker from 'react-datepicker'
import Select from 'react-select'
import domain from '../../../domain'
import TimePicker from 'react-time-picker'
import AdminLogin from '../../AdminLogin'
import MovietimeCard from './MovietimeCard'
import './AdminSuatChieu.css'

function timeConvert(time) {
    time=String(time)
    return((Number(time.slice(0,2))-7)*60+Number(time.slice(3)))
}

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: '50%',
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        margin: 0,
    }),
    placeholder: (provided, state) => ({ ...provided, height: 30, margin: 0 }), 
    valueContainer: (provided, state) => ({ ...provided, height: 35, margin: 0 }),
    control: (provided) => ({
        ...provided,
        maxHeight: 40,
        width: '50%',
    }),
    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: 30,
    })
}

class AdminSuatChieu extends Component {
    constructor(props) {
        super(props)
        this.onClickTaoMovietime = this.onClickTaoMovietime.bind(this)
        this.state = { movies: [{length: 100}], options: [], movie: {}, selectedOption: "", startDate: new Date(), hour: "", theater: [], selectedTheater: "", movietimes: [], marginTop: 0 }
    }

    componentDidMount() {
        document.getElementById('navbar').style.display = 'none'
        document.getElementById('footer').style.display = 'none'
        fetch(domain.api)
            .then(response => response.json())
            .then(data => {
                let options = data.map(movie => {
                    return ({ value: movie._id, label: movie.name })
                })
                this.setState({ movies: data, options: options, movie: data[0] })
            })
        fetch(`${domain.api}/theater/all`)
            .then(response => response.json())
            .then(data => {
                this.setState({ theater: data, selectedTheater: data[0]._id })
            })
        fetch(`${domain.api}/movietime/all`)
            .then(response => response.json())
            .then(data => {
                this.setState({ movietimes: data })
            })
    }

    onClickTaoMovietime() {
        fetch(`${domain.api}/movietime/${this.state.selectedOption.value}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movie_id: this.state.selectedOption.value,
                theater_id: this.state.selectedTheater,
                hour: String(this.state.hour),
                price: Number(document.getElementById("price").value),
                date: this.state.startDate
            })
        })
            .then(res => { 
                window.location.reload()
                ReactDOM.render(<Notify  message="Đã xóa suất chiếu thành công." />, document.getElementById('notify'))
            })
    }

    onClickRap(id) {
        if(document.getElementById(id).className=="options Selected") {
            document.getElementById(id).className="options"
            this.setState({selectedTheater: ""})
        }
        else {
            if(document.getElementsByClassName("Selected").length==1) document.getElementsByClassName("Selected")[0].className="options"
            document.getElementById(id).className="options Selected"
            this.setState({selectedTheater: id})
        }
    }

    render() {
        if (Cookies.get('admin') == "admin" && Cookies.get('passwordAd') == "admin") {
            const theater = this.state.theater.map(e => <div onClick={() => this.onClickRap(e._id)} id={e._id} className="options">Rạp {e.theater_number}</div>)
            let suatchieu = []
            let today = new Date()
            suatchieu.push(today)
            for(let i=0; i<7; i++) {
                suatchieu.push(new Date(suatchieu[suatchieu.length-1].getTime()+86400000))
            }
            const {movies} = this.state
            suatchieu=suatchieu.map(e => {
                const date = new Date(e)
                let movietimes = this.state.movietimes.filter(mvt => (new Date(mvt.movietime.date)).toLocaleDateString()==date.toLocaleDateString())  
                let marginTop = 0              
                movietimes=movietimes.map(mvt => {
                    let temp = marginTop
                    if(this.state.movies.filter(m => m._id==mvt.movie_id)[0]) {
                        marginTop=timeConvert(mvt.movietime.hour)+this.state.movies.filter(m => m._id==mvt.movie_id)[0].length
                    }
                    return(<MovietimeCard mvt={mvt} 
                        mtop={temp} />)
                })
                marginTop = 0
                return(
                <div style={{width: '12%'}} id={e.toLocaleDateString()}>
                    <div>{date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()}</div>
                    {movietimes}
                </div>)
            })
            let timesrow = ['07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'].map(hour => <div style={{height: 100}}>{hour}:00</div>)
            return (
                <div className="adminPage">
                    <AdminNav />
                    <div style={{ maxHeight: (window.innerHeight - 60), minHeight: (window.innerHeight-60) }} className="adminMainContainer">
                        <div className="topPhimAdmin">
                            <p className="header-text">Quản lý suất chiếu</p>
                        </div>
                        <div className="tagOptions">
                            {theater}
                        </div>
                        <div>
                            <form className="formEdit">

                                <div>
                                    <label for="movieName"><b>Phim:</b></label>
                                    <Select
                                        value={this.state.selectedOption}
                                        onChange={(value) => {
                                            let movie = this.state.movies.filter(e => e._id == value.value)[0]
                                            this.setState({ selectedOption: value, movie: movie })
                                        }}
                                        options={this.state.options}
                                        styles={customStyles}
                                    />
                                </div>
                                <div>
                                    <label for="price"><b>Giá vé: </b></label>
                                    <input type="text" placeholder='50000' name="price" id="price" required></input>
                                </div>
                                <div>
                                    <label for="type"><b>Ngày chiếu: </b></label>
                                    <Datepicker
                                        onChange={(value) => this.setState({ startDate: value })}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                        selected={this.state.startDate}
                                    />
                                </div>
                                <div id="timePicker">
                                    <label><b>Giờ chiếu: </b></label>
                                    <div style={{padding: 4}}>
                                        <TimePicker
                                            format='HH:mm'
                                            clearAriaLabel="Clear value"
                                            onChange={(value) => this.setState({hour: value})}
                                            maxTime='23:45:00'
                                            minTime='07:00:00'
                                            value={this.state.hour}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <a onClick={this.onClickTaoMovietime}><div style={{marginLeft: '36%', marginTop: 0, marginBottom: '30px'}} className="button dangsua">Tạo suất chiếu</div></a>
                        <div className="timeTable">
                            <div style={{display: 'flex'}}>
                                <div style={{width: '12%'}}>
                                    <div>Giờ</div>
                                    {timesrow}
                                </div>
                                {suatchieu}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return(<AdminLogin />)
        }
    }
}

export default AdminSuatChieu