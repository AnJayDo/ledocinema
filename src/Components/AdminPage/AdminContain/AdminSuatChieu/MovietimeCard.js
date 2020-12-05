import React, {Component} from 'react'
import Notify from '../../../Notify/Notify'
import ReactDOM from 'react-dom'
import domain from '../../../domain'


function timeConvert(time) {
    time=String(time)
    return((Number(time.slice(0,2))-7)*60+Number(time.slice(3)))
}

class MovietimeCard extends Component {
    constructor(props) {
        super(props)
        this.state = { movie: {}}
        this.clickDelete = this.clickDelete.bind(this)
    }
    componentDidMount() {
        fetch(`${domain.api}/movie/id/${this.props.mvt.movie_id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ movie: data })
            })
    }

    clickDelete() {
        fetch(`${domain.api}/movietime/${this.props.mvt._id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if(data.message == 'Đã xóa') {
                    window.location.reload()
                    ReactDOM.render(<Notify  message="Đã xóa suất chiếu thành công." />, document.getElementById('notify'))
                }
            })
    }

    render() {
        let untilHour = (Number(this.props.mvt.movietime.hour.slice(0,2))+this.state.movie.length/60-this.state.movie.length/60%1)
        let untilMin = Number(this.props.mvt.movietime.hour.slice(3))+this.state.movie.length%60
        if(untilMin>=60) {
            untilHour++
            untilMin=untilMin%60
        }
        if((Number(this.props.mvt.movietime.hour.slice(0,2))+this.state.movie.length/60-this.state.movie.length/60%1)<10) {
            untilHour="0"+untilHour
        }
        let image = this.state.movie.image
        if(String(image).indexOf("http")<0) image=domain.api+"/"+image
        return(
            <div style={{
                width: `96%`,
                marginLeft: '2%',
                marginRight: '2%',
                height: Number(100*this.state.movie.length/60),
                borderRadius: '10px',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 5,
                marginTop: (timeConvert(this.props.mvt.movietime.hour)-this.props.mtop)/60*100
            }}>
                <div style={{width: '100%', height: '100%', backgroundColor: 'rgba(256, 256, 256, 0.3)', borderRadius: 8}}>
                    <div>
                        <div className="deleteButton" onClick={this.clickDelete}><i class="far fa-trash-alt"></i></div>
                    </div>
                    <div>
                        <b>{this.state.movie.name}</b>
                    </div>
                    <p>Từ: {this.props.mvt.movietime.hour} đến {untilHour+":"+untilMin}</p>
                </div>
            </div>
        )
    }
}

export default MovietimeCard