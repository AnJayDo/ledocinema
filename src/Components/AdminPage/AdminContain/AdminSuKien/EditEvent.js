import React, { Component } from 'react';
import Cookies from 'js-cookie';
import '../AdminPage.css'
import AdminLogin from '../../AdminLogin'
import AdminNav from '../AdminNav'
import './adminSuKien.css'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import ReactQuill from 'react-quill'
import slugify from 'react-slugify'
import 'react-quill/dist/quill.snow.css'

class EditEvent extends Component {
    constructor(props) {
        super(props)
        this.onClickSuaSuKien = this.onClickSuaSuKien.bind(this)
        this.handleChangeText = this.handleChangeText.bind(this)
    }

    state = { event: {}, date: new Date() , image: {}, text: ""}

    componentDidMount() {
        document.getElementById('navbar').style.display = 'none'
        document.getElementById('footer').style.display = 'none'
        fetch(`http://localhost:3000/event/${this.props.match.params.movie}`)
          .then(response => response.json())
          .then(data => 
            {   
                this.setState({ event: data, date: data.date?new Date(data.date.date_start):new Date(), image: {}, text: data.discription?data.discription:""})
            })
    }

    onChangeImage(element) {
        let files = element.target.files
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (element) => {
            console.warn(element.target.result)
            console.log(files[0])
            this.setState({ event: this.state.event, date: this.state.date , image: files[0], text: this.state.text})
        }
    }

    onClickSuaSuKien() {
        const formData = new FormData()
        let startDate = this.state.date
        startDate=`${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`
        if(this.state.image.toString()!=="[object Object]")
            formData.append('image', this.state.image, this.state.image.name)
        formData.append('name', document.getElementById("eventName").value==""?this.state.event.name:document.getElementById("eventName").value)
        formData.append('discription', this.state.text)
        formData.append('date', {date_start: startDate, date_end: null})
        formData.append('slug', document.getElementById("eventName").value==""?this.state.event.slug:slugify(document.getElementById("eventName").value))
        fetch(`http://localhost:3000/event/${this.state.event._id}`, {
            method: 'PUT',
            body: formData
        }).then(res => {  
            window.location.href=window.location.origin+"/administrator/sukien" 
        })
    }

    handleChangeText = (value) => {
        this.setState({ event: this.state.event, date: this.state.date , image: this.state.image, text: value })
    }

    render() {

        if (Cookies.get('admin') == "admin" && Cookies.get('passwordAd') == "admin") {
            return (
                <div className="adminPage">
                    <AdminNav />
                    <div style={{maxHeight: window.innerHeight}} className="adminMainContainer">
                        <div className="topPhimAdmin">
                            <p className="header-text">Tạo sự kiện mới</p>
                        </div>
                        <div>
                            <form className="formEdit">
                                <div>
                                    <label for="image"><b>Hình:</b></label>
                                    <input type="file" name="image" id="image" onChange={(element) => this.onChangeImage(element)} required></input>
                                </div>
                                <div>
                                    <label for="eventName"><b>Tên sự kiện:</b></label>
                                    <input type="text" placeholder={this.state.event.name} name="eventName" id="eventName" required></input>
                                </div>
                                
                                <div>
                                    <label for="type"><b>Ngày bắt đầu sự kiện: </b></label>
                                    <Datepicker
                                        onChange={(value) => this.setState({date: value})}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                        selected={this.state.date}
                                    />
                                </div>
                                <div>
                                    <label for="description"><b>Nội dung sự kiện: </b></label>
                                    <ReactQuill value={this.state.text} onChange={this.handleChangeText} />
                                </div>
                            </form>
                        </div>
                        <a href="#" onClick={this.onClickSuaSuKien}><div className="button dangsua">Sửa</div></a>
                    </div>
                </div>
            )
        }

        else return (<AdminLogin />)
    }
}

export default EditEvent