import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import EventSlide from './EventSlide'
 
const fadeImages = [  '1',  '2',  '3'];
const EventsSlide = fadeImages.map(num => <EventSlide number={num}/>)
 
const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide duration={5000} transitionDuration={800} >
            {EventsSlide}
      </Slide>
    </div>
  )
}

export default Slideshow