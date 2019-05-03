import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import OwnerLogin from './Login/OwnerLogin';
import Home from './Home/Home';
import UserDisplay from './User/UserDisplay';
import Account from './User/Account';
import Search from './Search/Search';
import Property from './Property/Property';
import MyTrips from './Home/MyTrips';
import Booking from './Booking/Booking';
import Signup from './Signup/Signup';
import OwnerSignup from './Signup/OwnerSignup';
import Navbar from './LandingPage/Navbar';
import LoginNavbar from './LandingPage/LoginNavbar';
import Footbar from './LandingPage/Footbar';
import LandingPage from './LandingPage/LandingPage';
import ListProperty from './ListProperty/ListProperty';
import SearchBar from './LandingPage/SearchBar';
import Dashboard from './Home/Dashboard';
import Help from './Help/Help';
import NavbarResult from './LandingPage/NavbarResult';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            
            <div>
                {/*Render Different Component based on Route*/}
                
                <Route exact path="/navbar" component={Navbar}/>
                <Route exact path="/navbarresult" component={NavbarResult}/>
                <Route exact path="/loginnavbar" component={LoginNavbar}/>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/login" component={Login}/> 
                <Route exact path="/ownerlogin" component={OwnerLogin}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/userdisplay" component={UserDisplay}/>
                <Route exact path="/account" component={Account}/>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/property" component={Property}/>
                <Route exact path="/mytrips" component={MyTrips}/>
                <Route exact path="/booking" component={Booking}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/ownersignup" component={OwnerSignup}/>
                <Route exact path="/listproperty" component={ListProperty}/>
                <Route exact path="/help" component={Help}/>
                <Route exact path="/searchbar" component={SearchBar}/>
                <Route path="/footbar" component={Footbar}/> 
            
            </div>
           
        )
    }
}
//Export The Main Component
export default Main;