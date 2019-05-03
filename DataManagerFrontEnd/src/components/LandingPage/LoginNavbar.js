import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { SplitButton,DropdownButton, MenuItem, Button, Image } from 'react-bootstrap';



//create the Navbar Component
class LoginNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {  
           // username : "test",
          // username : this.props.username,
            username : cookie.load("cookie"),
            authFlag : this.props.loginFlag,
            userdisplay : false
        }  
        this.handleLogout = this.handleLogout.bind(this);
      //  this.handleUser = this.handleUser.bind(this);
    }
    
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    
    render(){
        //if Cookie is set render Logout and user Button
        //<li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
        let navLogin = null;
        let help = null;
        let listyourproperty = null;
       
        let redirectVar = null;

        
          // {redirectVar} 

        return(
            <div style={{opacity:"1",zIndex:"1000",position:"absolute"}}> 
            {redirectVar}  
            <nav class="navbar navbar-fixed-top" style={{backgroundColor:"white",height:"100px"}}>
                <div class="container-fluid" >
                    <div class="navbar-header" style={{marginLeft:"100px"}}>
                        <a class="navbar-brand" href="/"><img alt="HomeAway logo" class="site-header-logo__img img-responsive" role="presentation" src="Images/Home.svg" style={{height:"100"}}></img></a>
                    </div>
                    <div class="nav navbar-nav navbar-right navbar-brand">
                        <a class="navbar-brand" href="/"><img alt="About Us" class="site-header-logo__img img-responsive" role="presentation" src="Images/HAWAY.svg"></img></a>
                    </div>
                    <div class="nav navbar-nav navbar-right navbar-brand">
                    
                    </div>
                      
                </div>
            </nav>
    </div>
            
        )
    }
}

export default LoginNavbar;