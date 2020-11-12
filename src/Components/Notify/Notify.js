import React from 'react';
import ReactDOM from 'react-dom'
import './Notify.css'

const link = `http://localhost:3000`

function Notify(props) {
    let removeNotify = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('notify'))
    }
    return (
        <div id="Notify">
            <div className="clickHide" onClick={removeNotify}>
            </div>
            <div className="success-animation" >
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                    {props.message}
            </div>
        </div>
    );
}

export default Notify;
