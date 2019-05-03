import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Search from '../Search/Search';
import Navbar from '../LandingPage/Navbar';
import Footbar from '../LandingPage/Footbar';
import SearchBar from '../LandingPage/SearchBar';
import Dashboard from '../Home/Dashboard';
import {Link} from 'react-router-dom';
//import { url } from 'inspector';

class Home extends Component {
    
    constructor(props){
    super(props);
        //maintain the state required for this component
        this.state = {
            homeFlag : false,
        }
        //Bind the handlers to this class
    }
    //get the books data from backend  

    render(){

        let searchbar = <SearchBar searchrender={this.props.searchrender}/>

       let foot = <Footbar footrender={this.props.footrender}/>

        let nav = <Navbar navdata={this.props.navdata}/>

        let dashboard = <Dashboard dashdata={this.props.dashdata}/>

                   
        if(this.props.location.state!==undefined){
            nav =(
                <Navbar 
                navdata= {this.props.navdata}
                loginFlag = {this.props.location.state.loginFlag}
                username = {this.props.location.state.username}
                />
            )
        }else{
            nav = (
                <Navbar 
                navdata= {this.props.navdata}
                /> 
            )
        }

        let redirectVar = null;
       
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        

       // console.log("1",this.props.location.state.username)
       // console.log("2",this.props.location.state.loginFlag)
       // console.log("3",this.props.navdata)
      /*  if(this.state.homeFlag)
        {
            redirectVar = <Redirect to= "/search"/>
        }*/

        return(
            <div>
                {redirectVar}
                {nav}
                {searchbar}
                {dashboard}
                <div class="content">
                    <div class="subtext">
                        <h2 id="hhome">List your property on HomeAway and open your <br></br> door to rental income</h2>
                        <button class="content_btn_home btn btn-lg"><Link to="/listproperty">List your property</Link></button>
                    </div>
                </div>

                {foot}
            </div> 
        )
    }
}
//export Home Component
export default Home;
