import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Help extends Component {
    render(){
        //iterate over books to create a table row
        return(
            <div>
                <div class="container">
                    <h2>Test Page</h2>     
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Help;