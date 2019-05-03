import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { SplitButton,DropdownButton, MenuItem, Button, Image } from 'react-bootstrap';
import Footbar from './Footbar';


//create the Navbar Component
class NavbarResult extends Component {
    constructor(props){
    super(props);
        //maintain the state required for this component
        this.state = {
            username:cookie.load("cookie"),
            location : "",
            checkin : "",
            checkout : "",
            guests: "",
            authFlag : false,
            searchFlag : false,
            message : ""
        }
        //Bind the handlers to this class
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.checkinChangeHandler = this.checkinChangeHandler.bind(this);
        this.checkoutChangeHandler = this.checkoutChangeHandler.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }
    //get the books data from backend  

    componentWillMount(){
        this.setState({
            authFlag : false,
            searchFlag : false
        })
    }

    locationChangeHandler = (e) => {
        this.setState({
            location : e.target.value,
            message : ""
        })
    }
    checkinChangeHandler = (e) => {
        this.setState({
            checkin : e.target.value,
            message : ""
        })
    }
    checkoutChangeHandler = (e) => {
        this.setState({
            checkout : e.target.value,
            message : ""
        })
    }

    guestsChangeHandler = (e) => {
        this.setState({
            guests : e.target.value,
            message : ""
        })
    }


    submitSearch = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            location : this.state.location,
            checkin : this.state.checkin,
            checkout : this.state.checkout,
            guests :  this.state.guests
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/search',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200 && response.data!=400){  //if response data from search is not 400 i.e. empty query
                    this.setState({
                        searchFlag  : true,
                    })
                    window.location.reload(1);
                }else{
                    this.setState({
                        searchFlag : false,
                        message : "Sorry! No properties avaliable for these" //message for empty query
                    })
                }
                console.log(this.state.searchFlag)
            });
    }

    render(){
        //if not logged in go to login page

        let redirectVar = null;
        let navLogin = null;
        let help = null;
        let listyourproperty = null;

        navLogin = (
            <div>
            <ul class="nav navbar-nav navbar-right navbar-brand" style={{marginTop:"20px",marginRight:"10px"}}>
                    <DropdownButton title={this.state.username} style={{font:"50%",color:"#0067db",marginTop:"0px"}} >
                        <MenuItem eventKey="1" ><Link to="/mytrips">My Trips</Link></MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="2"><Link to="/userdisplay">My Profile</Link></MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="3" ><Link to="/account">Account</Link></MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4"><Link to="/dashboard">Owner Dashboard</Link></MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="5" onClick={this.handleLogout}><Link to="/">Logout</Link></MenuItem>
                    </DropdownButton>
            </ul>
            </div>
        );

        help = (
            <div>
            <ul class="nav navbar-nav navbar-right navbar-brand" style={{marginTop:"20px",marginRight:"10px"}}>
            <DropdownButton title="Help" style={{font:"50%",color:"#0067db",marginTop:"0px"}} >
                <MenuItem eventKey="1" ><Link to="/help">Traveller Help</Link></MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="2"><Link to="/help">Owner Help</Link></MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="5" onClick={this.handleLogout}><Link to="/">Logout</Link></MenuItem>
            </DropdownButton>
            </ul>
            </div>
        )

        listyourproperty = (
            <button style={{backgroundColor:"#ffff",borderColor:"#0067db",fontSize:"16px"}} class="btn btn-primary button-search"><Link to="/listproperty">List your property</Link></button>
      )
    
        if(this.state.searchFlag){
                redirectVar = <Redirect to= "/search"/>
            }   


            

        const imgurl = require(`../Images/large.jpg`);
            //<img src={require('../Images/bkg.png')}/>
            // <div style={{backgroundColor: "yellow"}}>
            //<div class="container" style={{backgroundColor: "green"}} >
            // <div class="login-form" style={{backgroundImage:`url(${imgurl})`}}>
            // <div class="main-div-login" style={{backgroundColor: "red"}}>
            //style={{backgroundImage:`url(${imgurl})`, backgroundSize:'cover'}}

        return(
         <div>
         {redirectVar}    
        <div>  
        <nav class="navbar navbar-fixed-top" style={{backgroundColor:"white",height:"100px"}}>
        <div class="container-fluid" >
        <div class="navbar-header" style={{marginLeft:"100px"}}>
            <a class="navbar-brand" href="/"><img alt="HomeAway logo" class="site-header-logo__img img-responsive" role="presentation" src="Images/Home.svg" style={{height:"100"}}></img></a>
        </div>
            <div class="nav navbar-nav navbar-right navbar-brand">
                <a class="navbar-brand" href="/"><img alt="About Us" class="site-header-logo__img img-responsive" role="presentation" src="Images/HAWAY.svg"></img></a>
            </div>
            <div class="nav navbar-nav navbar-right navbar-brand">
            {listyourproperty}
            </div>
            
            {help}
            
        
            {navLogin}
           
            
            
              
        </div>
    </nav>
        </div>
              
            <div class="container">
                <div class="login-form"> 
                    <div class="main-div-result">
                        <div class="table-col">
                            <div class="col-sm-3">
                                <input style={{height:"60px",backgroundColor:"white",fontSize:"16px"}} onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="Where do you want to go?"/>
                            </div>

                            <div class="col-sm-2">
                                <input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.checkinChangeHandler} type="Date" class="form-control" name="checkin" placeholder="Check In"/>
                            </div>

                            <div class="col-sm-2">
                                <input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.checkoutChangeHandler} type="Date" class="form-control" name="checkout" placeholder="Check Out"/>
                            </div>
                            <div class="col-sm-2">
                                <input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.guestsChangeHandler} type="Number" class="form-control" name="guests" placeholder="Guests"/>
                            </div>
                            <div class="col-sm-3">
                                <button onClick = {this.submitSearch} style={{backgroundColor:"#0067db",borderColor:"#0067db",fontSize:"18px"}} class="btn btn-primary button-search">Search</button>
                            </div>
                        </div> 
                        <div style={{backgroundColor: "red"}}>
                            <h3>{this.state.message}</h3> 
                        </div> 
                    </div>
                </div>
            </div>
            
    </div> 
            
        )
    }
}
export default NavbarResult;