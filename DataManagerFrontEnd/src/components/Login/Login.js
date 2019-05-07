import React, {Component} from "react";
import NavbarMain from './NavbarMain';
import './Login.css';
import '../../App.css';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';
import cookie from "react-cookies";


class Login extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
          authFlag: false,
          error: false
        };
      }

      emailChangeHandler = e => {
        this.setState({
          email: e.target.value
        });
      };

      passwordChangeHandler = e => {
        this.setState({
          password: e.target.value
        });
      };

      submitLogin = e => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
          email: this.state.email,
          password: this.state.password
        };

        axios.defaults.withCredentials = true;

        axios
      .post("http://localhost:3001/user/login", data)
      .then(response => {
        console.log("Response : ", response);
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            authFlag: true,
            email: response.data
          });
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        this.setState({ error: true });
        console.log(err);
      });
  };



    render(){
        let redirectVar = null;

        if(cookie.load('cookie')){
            redirectVar=<Redirect 
            to= {{
                pathname : '/dashboard',
                }
            }
        
        />
        
        }


        return(
            <div className="super-login1">
            <NavbarMain/>
            {redirectVar}
                <div className="col-md-12 main-login">

                    <div className="empty col-md-3"></div>

                    <div className="login-form1 col-md-6">

                        <div className="login-text1">
                         <h3>Please Enter Login Details</h3>
                        </div>
                    
                        <div class="input-group login-email1">

                            <span class="input-group-addon" id="basic-addon1">EmailID</span>
                            <input onChange={this.emailChangeHandler} type="text" class="form-control" placeholder="EmailID"/>

                        </div>

                        <div class="input-group login-password1">

                            <span class="input-group-addon" id="basic-addon1">Password</span>
                            <input onChange={this.passwordChangeHandler} type="password" class="form-control" placeholder="Password"/>

                        </div>

                        <div className="login-submit-button1">

                        
                            <button onClick={this.submitLogin} type="submit" class="btn btn-default login-button-sub1">Login</button>
                            

                        </div>

                        <a href="/signup">

                        <span className="signup-text1">New User? click to SignUp</span>
                        
                        </a>
                    
                    </div>

                    <div className="empty col-md-3"></div>
                
                </div>
            </div>
        );
    }
}

export default Login;