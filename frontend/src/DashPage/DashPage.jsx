import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/a.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';

function DashPage() {
    return (
        <div className="dashboard-container">
            <h1>This Web Site is for Mobile ShoveVote</h1>
            <div className="phone-images">
                <img src={image1} className="phone-image" />
                <img src={image2} className="phone-image" />
                <img src={image3} className="phone-image" />
                <img src={image4} className="phone-image" />
            </div>
           
        </div>
    );
}

export { DashPage };