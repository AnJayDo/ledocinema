import React, { Component } from 'react'
import './successChangePassword.css';

class SuccessChange extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.match.params.status==0)
            return (
                <div className="success-animation" >
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                    <p style={{maxWidth: '60%'}}>{this.props.match.params.message=="Thành công"?"Thanh toán thành công":this.props.match.params.message}</p>
                </div>
            )
        else return (
            <div className="fail-animation" >
                <svg style={{width: '50px', margin: '0 10'}} xmlns="http://www.w3.org/2000/svg" viewBox="3 3 16 16"><defs><linearGradient gradientUnits="userSpaceOnUse" y2="-2.623" x2="0" y1="986.67"><stop stop-color="#ffce3b"/><stop offset="1" stop-color="#ffd762"/></linearGradient><linearGradient id="0" gradientUnits="userSpaceOnUse" y1="986.67" x2="0" y2="-2.623"><stop stop-color="#ffce3b"/><stop offset="1" stop-color="#fef4ab"/></linearGradient><linearGradient gradientUnits="userSpaceOnUse" x2="1" x1="0"/></defs><g transform="matrix(2 0 0 2-11-2071.72)"><path transform="translate(7 1037.36)" d="m4 0c-2.216 0-4 1.784-4 4 0 2.216 1.784 4 4 4 2.216 0 4-1.784 4-4 0-2.216-1.784-4-4-4" fill="#da4453"/><path d="m11.906 1041.46l.99-.99c.063-.062.094-.139.094-.229 0-.09-.031-.166-.094-.229l-.458-.458c-.063-.062-.139-.094-.229-.094-.09 0-.166.031-.229.094l-.99.99-.99-.99c-.063-.062-.139-.094-.229-.094-.09 0-.166.031-.229.094l-.458.458c-.063.063-.094.139-.094.229 0 .09.031.166.094.229l.99.99-.99.99c-.063.062-.094.139-.094.229 0 .09.031.166.094.229l.458.458c.063.063.139.094.229.094.09 0 .166-.031.229-.094l.99-.99.99.99c.063.063.139.094.229.094.09 0 .166-.031.229-.094l.458-.458c.063-.062.094-.139.094-.229 0-.09-.031-.166-.094-.229l-.99-.99" fill="#fff"/></g></svg>
                <p style={{maxWidth: '60%'}}>{this.props.match.params.message}</p>
            </div>
        )
    }
}

export default SuccessChange