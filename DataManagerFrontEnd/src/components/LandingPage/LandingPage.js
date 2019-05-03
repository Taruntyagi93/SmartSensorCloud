import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { SplitButton,DropdownButton, MenuItem, Button, Image } from 'react-bootstrap';
import Navbar from './Navbar';
import Footbar from './Footbar';
import SearchBar from './SearchBar';


//create the Navbar Component
class LandingPage extends Component {
    constructor(props){
    super(props);
        //maintain the state required for this component
        this.state = {
            location : "",
            checkin : "",
            checkout : "",
            guests: "",
            authFlag : false,
            searchFlag : false,
            message : ""
        }
        
    }
    //get the books data from backend  

    componentWillMount(){
        this.setState({
            authFlag : false,
            searchFlag : false
        })
    }
    render(){
        //if not logged in go to login page

        let redirectVar = null;
    
        if(this.state.searchFlag){
                redirectVar = <Redirect to= "/search"/>
            } 
        
            if(cookie.load('cookie')){
                redirectVar = <Redirect to= "/home"/>
            }    
        
       
        let nav = <Navbar navrender={this.props.navrender}/>
        let searchbar = <SearchBar searchrender={this.props.searchrender}/>
        let foot = <Footbar footrender={this.props.footrender}/>
        let listyourproperty = null;
        if(!cookie.load('cookie')){
            listyourproperty = (
                            <button class="content_btn1 btn btn-lg"><Link to="/ownerlogin">List your property</Link></button>
                      )}else{
                        listyourproperty = (
                            <button class="content_btn1 btn btn-lg"><Link to="/listproperty">List your property</Link></button>
                      )             
                      }
        return(
            <div> 
                {redirectVar} 
                {nav}
                {searchbar}
                {foot}   
            </div>
            
        )
    }
}
export default LandingPage;