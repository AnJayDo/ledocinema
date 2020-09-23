import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Event from './Event'
 
const fadeImages = [  '1',  '2',  '3'];
const Events = fadeImages.map(num => <Event number={num}/>)
 
const Slideshow = () => {
  return (
    <div className="slide-container">
      <Fade>
            {Events}
      </Fade>
    </div>
  )
}

export default Slideshow