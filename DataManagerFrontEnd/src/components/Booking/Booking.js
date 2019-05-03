import React, {Component} from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Booking extends Component {
    render(){
        const imgurl = require(`../Images/large.jpg`);
        //iterate over books to create a table row
        return(
            <div style={{backgroundImage:`url(${imgurl})`,backgroundSize:"cover",backgroundPosition:"100%",backgroundRepeat:"no-repeat",height:"700px"}}>
                <div class="container">
                    <h2>Congratulations!!...</h2> 
                    <h3><Link to='/home'>Click here</Link> to go back to home</h3>     
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Booking;