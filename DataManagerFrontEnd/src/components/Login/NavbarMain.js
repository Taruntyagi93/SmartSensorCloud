import React, {Component} from 'react';
import './NavbarMain.css';


class NavbarMain extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-md navbar-light nav-main">
                <a className="navbar-home" href="/">
                SmartAlertCloud
                </a>
                <a className="navbar-login navbar-right" href="/login">
                Login
                </a>
                <a className="navbar-about navbar-right" href="/">
                About
                </a>

            </nav>
        );
    }
}
export default NavbarMain;