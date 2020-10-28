import React, { Component } from 'react'
import './successChangePassword.css';

class SuccessChange extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(window.location.href.slice(window.location.origin.length) == "/successChange")
            return (
                <div className="success-animation" >
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                    ĐỔI MẬT KHẨU THÀNH CÔNG
                </div>
            )
        else return (
            <div className="fail-animation" >
                ĐỔI MẬT KHẨU THẤT BẠI
            </div>
        )
    }
}

export default SuccessChange