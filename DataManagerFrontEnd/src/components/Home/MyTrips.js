import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { SplitButton,DropdownButton, MenuItem, Button, Image } from 'react-bootstrap';
import NavbarResult from '../LandingPage/NavbarResult';



//create the Navbar Component
class MyTrips extends Component {
    constructor(props){
    super(props);
        //maintain the state required for this component
        this.state = {
            username : cookie.load("cookie"),
            Properties : [],
            imageView : [],
            displayprop :"", //to transfer props when clicked
            authFlag : false,
            message : ""
        }
        //Bind the handlers to this class
        this.propertyChangeHandler = this.propertyChangeHandler.bind(this);
       
    }
    //get the books data from backend  


    componentDidMount(){
        const data = {
            username : this.state.username,
        }
        //set the with credentials to true
        console.log("Inside Dashboard")
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/dashboard',data)
            .then(response => {
                console.log("Status Code : ",response.data);
                if(response.status === 200){  //if response data from search is not 400 i.e. empty query
                    this.setState({
                        authFlag  : true,
                        Properties : response.data,
                    })
                }else{
                    this.setState({
                        authFlag : false,
                        message : "Sorry! No properties avaliable for these" //message for empty query
                    })
                }
                console.log("dasboard",this.state.Properties)
            });
    }

    propertyChangeHandler = (e) => {
        this.setState({
            displayprop : e.target.dataset.attr,
        })
        console.log("Successful test - ",e.target.dataset.attr)
        console.log("Successful test 1- ",e.target.dataset)
    }

    render(){
        //if not logged in go to login page
        let nav = <NavbarResult navdata={this.props.navdata}/>

        let redirectVar = null; 

       /* if(this.state.displayprop!==""){
            this.props.history.push({
                pathname : '/property',
                state : {
                    displayprops : this.state.displayprop
                }

            })
        } */

        if(this.state.displayprop!==""){
            redirectVar = <Redirect 
            to= {{
                    pathname : '/property',
                    state : {
                        displayprops : this.state.displayprop
                    }
        
                
            }} />
        }

       
        
            //<img src={require('../Images/bkg.png')}/>
            // <div style={{backgroundColor: "yellow"}}>
            //<div class="container" style={{backgroundColor: "green"}} >
            // <div class="login-form" style={{backgroundImage:`url(${imgurl})`}}>
            // <div class="main-div-login" style={{backgroundColor: "red"}}>
            //style={{backgroundImage:`url(${imgurl})`, backgroundSize:'cover'}}
            let details = this.state.Properties.map(property => {
                //const imgurl1 = require(`../uploads/${property.img}`);
                const imgurl1 = require(`../uploads/${property.img}`);
                return(
                    <div>
                        
                    <div class="main-div-search1 col-sm-4" style={{backgroundColor:"#eee"}}>
                        
                    <img src={imgurl1} height="300px" width="300px"></img><br></br>
                
                    <td onClick={this.propertyChangeHandler} name="displayprop" data-attr={property.property_name} style={{fontSize:"20px",fontFamily:"Lato, Roboto !important",paddingTop:"15px"}}>
                    {property.property_name}
                    </td>
                    <p>Sleeps {property.guests} {property.bedroom} BR {property.bathroom} BA</p>
                       
                    </div>
                    </div>
                )
            })
               
            return(
    
                <div>
                {redirectVar}
                {nav}
                <div class="main-div-listproperty" style={{marginTop:"50px",borderColor:"white"}}>
                    <h2>Recent Activity</h2>
                        <table class="table">
                            <thead>
                               
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                </div>  
            </div> 

            
        )
    }
}

export default MyTrips;