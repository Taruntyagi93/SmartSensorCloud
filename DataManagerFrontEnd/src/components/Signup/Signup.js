import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import LoginNavbar from '../LandingPage/LoginNavbar';


//Define a Login Component
class Signup extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            type : "",
            firstname : "",
            message : "",
            authFlag : false

        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.typeChangeHandler = this.typeChangeHandler.bind(this);
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false,
            message : ""
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    typeChangeHandler = (e) => {
        this.setState({
            type : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    firstnameChangeHandler = (e) => {
        this.setState({
            firstname : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitSignup = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password,
            type : "traveller",
            firstname : this.state.firstname
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/signup',data)
            .then(response => {
                console.log("Status Code : ",response.data);
                if(response.data === 200){
                    this.setState({
                        authFlag : true,
                        message : "Successful Signup"
                    })
                }else{
                    this.setState({
                        authFlag : false,
                        message : "User Already Exist "
                    })
                }
            });
    }

    render(){
        let nav = <LoginNavbar navdata={this.props.navdata}/>
        //redirect based on successful login
        let redirectVar = null;
       /* if(cookie.load('cookie')){
                redirectVar = <Redirect to= "/userdisplay"/>
            }*/

            if(cookie.load('cookie')){
                redirectVar = <Redirect 
                to= {{
                        pathname : '/home',
                        state : {
                            username : this.state.username,
                            loginFlag : this.state.loginFlag
                        }
            
                    
                }} />
            }

        return(
            <div style={{backgroundColor:"#eee"}}>
            {redirectVar}
            {nav} 
            
            <div class="container"> 
                          
                <div class="login-form">
                
                    <div class="main-div-signups">
                    
                        <div class="panel">
                        <h2>Traveller Sign up for HomeAway </h2>
                        <p>Please enter your details</p>
                            <p>{this.state.message}</p>
                        </div>
                        
                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.usernameChangeHandler} type="email" class="form-control" name="username" placeholder="Email"/>
                        </div>
                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                        </div>

                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.typeChangeHandler} type="text" class="form-control" name="type" placeholder="Traveller"/>
                        </div>
                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.firstnameChangeHandler} type="text" class="form-control" name="firstname" placeholder="First Name"/>
                        </div>  
                        <button onClick = {this.submitSignup} class="btn btn-primary" style={{backgroundColor:"#ff8a00",borderColor:"#ff8a00",fontSize:"18px"}}>Sign Me Up</button>               
                    
                        </div>
                </div>
                
            </div>
            </div>
        )
    }
}
//export Login Component
export default Signup;