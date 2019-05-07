import React, {Component} from 'react';
import '../Login/NavbarMain';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';


class NavbarMain extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          
          authFlag: false,
          
        };
      }

    logoutclick = e => {
        cookie.remove('cookie', {path : '/'})
        this.setState({
            authFlag: true,
        
        });
      };

    render(){
        let redirectVal = null;

        if(!cookie.load('cookie')){
            redirectVal =<Redirect 
            to= {{
                pathname : '/',
                }
            }
        
        />
        
        
        }

        return(
            
            <nav className="navbar navbar-expand-lg navbar-light nav-main1">
            {redirectVal}
                <a className="navbar-home" href="/">
                SmartAlertCloud
                </a>
                <a className="navbar-login1 navbar-right">
                <div onClick = {this.logoutclick}>
                Logout
                </div>
                </a>
                <a className="navbar-about1 navbar-right" href="/">
                About
                </a>

            </nav>
        );
    }
}
export default NavbarMain;
