import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import LoginNavbar from '../LandingPage/LoginNavbar';
import NavbarMain from '../Login/NavbarMain';
import './UserRegistration.css';


//Define a Login Component
class Signup extends Component{
    //call the constructor method
    constructor(props) {
        super(props);
    
        this.state = {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          role: "",
          authFlag: false,
          loginflag :false,
          username: "",
        };
      }



    handleFirstName = e => {
        this.setState({
          firstname: e.target.value
        });
      };
    
      handleLastName = e => {
        this.setState({
          lastname: e.target.value
        });
      };
    
      handleEmail = e => {
        this.setState({
          email: e.target.value
        });
      };
    
      handlePassword = e => {
        this.setState({
          password: e.target.value
        });
      };
    
      changeHandlerRadio = e => {
        this.setState({
          role: e.target.value
        });
      };

    handleSignmeup = async e => {
        e.preventDefault();
        var data = {
          firstName: this.state.firstname,
          lastName: this.state.lastname,
          email: this.state.email,
          password: this.state.password,
          role: this.state.role
        };
       
        axios.post("http://localhost:3001/user/register", data).then(response => {
          
          if ((response.status = 200)) {
            this.setState({
              authFlag: true
            });
          } else {
            this.setState({
              authFlag: false
            });
          }
        });
      };


    render(){

        let redirectvar=null;

        if(this.state.authFlag){
            console.log('inside cookie')
            redirectvar=<Redirect 
            to= {{
                pathname : '/login',
                }
            }
        
        />
        }

        return(
            
                <div className = "main-class col-md-12">
                    <NavbarMain/>
                    {redirectvar}
                    
                    <div className="empty col-md-4"> 
                        </div>

                    <div className="Form-control form user-register-main col-md-4">

                        <div className="form-main ">

                            <div className="user-form">
                            
                                <div class="input-group firstname">
                                <span class="input-group-addon" id="basic-addon1">FirstName</span>
                                <input onChange={this.handleFirstName} type="text" class="form-control" placeholder="First Name"/>
                                </div>

                                <div class="input-group lastname">
                                <span class="input-group-addon" id="basic-addon1">LastName</span>
                                <input onChange={this.handleLastName} type="text" class="form-control" placeholder="Last Name"/>
                                </div>

                                <div class="input-group username">
                                <span class="input-group-addon" id="basic-addon1">EmailID</span>
                                <input onChange={this.handleEmail} type="text" class="form-control" placeholder="Username"/>
                                </div>

                                <div class="input-group password">
                                <span class="input-group-addon" id="basic-addon1">Password</span>
                                <input onChange={this.handlePassword} type="password" class="form-control" placeholder="Password"/>
                                </div>

                                <div className="radio-parent">
                                <input
                                    type="radio"
                                    onChange={this.changeHandlerRadio}
                                    checked={this.state.role === "support"}
                                    name="role"
                                    value="support"
                                />
                                <label>IOT Support</label>
                                </div>
                                <div className="radio-parent">
                                <input
                                    type="radio"
                                    onChange={this.changeHandlerRadio}
                                    checked={this.state.role === "officer"}
                                    name="role"
                                    value="officer"
                                />
                                <label>City Emergency Officer</label>
                                </div>
                                <div className="radio-parent">
                                <input
                                    type="radio"
                                    onChange={this.changeHandlerRadio}
                                    checked={this.state.role === "admin"}
                                    name="role"
                                    value="admin"
                                />
                                <label>Infrastructure Admin</label>
                                </div>

                                <div className="submit-button">
                                <Link to ='/login'>
                                <button onClick={this.handleSignmeup} type="submit" class="btn btn-default button-sub">Submit</button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="empty col-md-4"> 
                        </div>
                </div>
            
        );
    }
}

//export Login Component
export default Signup;