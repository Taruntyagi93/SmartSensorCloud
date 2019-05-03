import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { SplitButton,DropdownButton, MenuItem, Button, Image } from 'react-bootstrap';



//create the Navbar Component
class Navbar extends Component {
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
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            console.log("User Info Page:",this.state.username);
            console.log("User Info Page:",this.props.username);
            console.log("User flag Page:",this.props.loginFlag);
            //  <MenuItem eventKey="2" onClick={this.handleUser}>
            navLogin = (
                <ul class="nav navbar-nav navbar-right navbar-brand" style={{marginTop:"20px"}}>
                        <DropdownButton title={this.state.username} style={{backgroundColor:"transparent",font:"50%",color:"white",marginTop:"0px"}} >
                            <MenuItem eventKey="1" ><Link to="/mytrips">My Infrastructure</Link></MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="2"><Link to="/userdisplay">My Profile</Link></MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="3" ><Link to="/account">Account</Link></MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="4"><Link to="/dashboard">Administration</Link></MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="5" onClick={this.handleLogout}><Link to="/">Logout</Link></MenuItem>
                        </DropdownButton>
                </ul>
            );
        }else{
            
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right navbar-brand" style={{marginTop:"20px"}}>
                <DropdownButton title="Management" style={{backgroundColor:"transparent",font:"50%",color:"white",marginTop:"0px"}} >
                    <MenuItem eventKey="1" ><Link to="/login">System Profile</Link></MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="2"><Link to="/ownerlogin">Data</Link></MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="3"><Link to="/">Report</Link></MenuItem>
                </DropdownButton>
                </ul>
            )
        }

        help = (
            <ul class="nav navbar-nav navbar-right navbar-brand" style={{marginTop:"20px"}}>
            <DropdownButton title="Help" style={{backgroundColor:"transparent",font:"50%",color:"white",marginTop:"0px"}} >
                <MenuItem eventKey="1" ><Link to="/help">Data Help</Link></MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="2"><Link to="/help">System Help</Link></MenuItem>
                <MenuItem divider />
            </DropdownButton>
            </ul>
        )
        if(!cookie.load('cookie')){
        listyourproperty = (
                        <button style={{backgroundColor:"#ffff",borderColor:"#ffff",fontSize:"16px"}} class="btn btn-primary button-search"><Link to="/ownerlogin">Add Sensor</Link></button>
                  )}else{
                    listyourproperty = (
                        <button style={{backgroundColor:"#ffff",borderColor:"#ffff",fontSize:"16px"}} class="btn btn-primary button-search"><Link to="/listproperty">Update Data</Link></button>
                  )             
                  }

        
          // {redirectVar} 

        return(
            <div style={{opacity:"0.8",zIndex:"1000",position:"absolute"}}> 
            {redirectVar}  
            <nav class="navbar navbar-inverse navbar-fixed-top ">
                <div class="container-fluid" >
                    
                    
                    <div class="nav navbar-nav navbar-right navbar-brand">
                    {listyourproperty}
                    </div>
                    {help}
                    {navLogin}
                      
                </div>
            </nav>
    </div>
            
        )
    }
}

export default Navbar;