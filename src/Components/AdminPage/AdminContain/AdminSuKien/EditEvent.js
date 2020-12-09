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
import domain from '../../../domain'

class EditEvent extends Component {
    constructor(props) {
        super(props)
        this.onClickSuaSuKien = this.onClickSuaSuKien.bind(this)
        this.handleChangeText = this.handleChangeText.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
    }

    state = { event: {}, date: new Date() , image: {}, cover_image: {}, text: ""}

    componentDidMount() {
        document.getElementById('navbar').style.display = 'none'
        document.getElementById('footer').style.display = 'none'
        fetch(`${domain.api}/event/${this.props.match.params.movie}`)
          .then(response => response.json())
          .then(data => 
            {   
                this.setState({ event: data, date: data.date?new Date(data.date.date_start):new Date(data.date_start), image: {}, text: data.discription?data.discription:""})
            })
    }

    onChangeImage(element) {
        this.setState({ image: element.target.files[0], cover_image: element.target.files[1] })
    }

    onClickSuaSuKien() {
        const formData = new FormData()
        let startDate = this.state.date
        startDate=`${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`
        if(this.state.image.toString()!=="[object Object]") {
            formData.append('image', this.state.cover_image, this.state.cover_image.name)
            formData.append('image', this.state.image, this.state.image.name)
        }
        formData.append('name', document.getElementById("eventName").value==""?this.state.event.name:document.getElementById("eventName").value)
        formData.append('discription', this.state.text)
        formData.append('date_start', this.state.date.toJSON())
        formData.append('date_end', this.state.date.toJSON())
        formData.append('slug', document.getElementById("eventName").value==""?this.state.event.slug:slugify(document.getElementById("eventName").value))
        fetch(`${domain.api}/event/${this.state.event._id}`, {
            method: 'PUT',
            body: formData
        }).then(res => {  
            window.location.href=window.location.origin+"/administrator/sukien" 
        })
    }

    handleChangeText = (value) => {
        this.setState({ text: value })
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
                                    <input type="file" multiple name="image" id="image" onChange={(element) => this.onChangeImage(element)} required></input>
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