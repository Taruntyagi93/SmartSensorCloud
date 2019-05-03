import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import LoginNavbar from '../LandingPage/LoginNavbar';

class ListProperty extends Component {
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            location : "",
            checkin : "",
            checkout : "",
            guests :"",
            bedroom:"",
            bathroom:"",
            minstay:"",
            price:"",
            pincode:"",
            owner : cookie.load("cookie"),
            message : "",
            description: '',
            selectedFile: '',
           // selectedFile1: '',
            authFlag : false

        }
        //Bind the handlers to this class
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.checkinChangeHandler = this.checkinChangeHandler.bind(this);
        this.checkoutChangeHandler = this.checkoutChangeHandler.bind(this);
        this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
        this.priceChangeHandler = this.priceChangeHandler.bind(this);
        this.pincodeChangeHandler = this.pincodeChangeHandler.bind(this);
        this.bedroomChangeHandler = this.bedroomChangeHandler.bind(this);
        this.bathroomChangeHandler = this.bathroomChangeHandler.bind(this);
        this.minstayChangeHandler = this.minstayChangeHandler.bind(this);
        this.submitProperty = this.submitProperty.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false,
            message : ""
        })
    }
    //username change handler to update state variable with the text entered by the user
    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    locationChangeHandler = (e) => {
        this.setState({
            location : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    checkinChangeHandler = (e) => {
        this.setState({
            checkin : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    checkoutChangeHandler = (e) => {
        this.setState({
            checkout : e.target.value
        })
    }

    guestsChangeHandler = (e) => {
        this.setState({
            guests : e.target.value
        })
    }

    priceChangeHandler = (e) => {
        this.setState({
            price : e.target.value
        })
    }

    pincodeChangeHandler = (e) => {
        this.setState({
            pincode : e.target.value
        })
    }

    bedroomChangeHandler = (e) => {
        this.setState({
            bedroom : e.target.value
        })
    }

    bathroomChangeHandler = (e) => {
        this.setState({
            bathroom : e.target.value
        })
    }

    minstayChangeHandler = (e) => {
        this.setState({
            minstay : e.target.value
        })
    }

//for setting image description
    onChange = (e) => {
        if(e.target.name === 'selectedFile'){

          this.setState({
            selectedFile: e.target.files[0],
           // selectedFile1: e.target.files[0]
          })
        }else{
          this.setState({ [e.target.name]: e.target.value });
        }
    }

    //submit Property handler to send a request to the node backend
    submitProperty = (e) => {
        var headers = new Headers();
        //const { description, selectedFile } = this.state;
        let formData = new FormData();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name : this.state.name,
            location : this.state.location,
            checkin : this.state.checkin,
            checkout : this.state.checkout,
            guests : this.state.guests,
            price : this.state.price,
            bedroom:this.state.bedroom,
            bathroom:this.state.bathroom,
            minstay:this.state.minstay,
            pincode : this.state.pincode,
            owner : this.state.owner,
            description : this.state.description,
            selectedFile : this.state.selectedFile,
            authFlag : true
            //selectedFile1 : this.state.selectedFile1
        }
        formData.append('description',data.description);
        formData.append('selectedFile',data.selectedFile);
        //formData.append('selectedFile',data.selectedFile1);
        formData.append('name',data.name);

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/listproperty',data)
            .then(response => {
                console.log("Status Code : ",response.data);
                if(response.data === 200){
                    this.setState({
                        authFlag : true,
                        message : "Congratulations! Successfully listed"
                    })
                    axios.post('http://localhost:3001/image', formData)
                    .then((result) => {
                      // access results...
                    });
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

        const { description, selectedFile } = this.state;
        //redirect based on successful login
        let redirectVar = null;
        if(this.state.authFlag){
                redirectVar = <Redirect to= "/home"/>
            }
   
           
          /*   <div class="form-group"><input
                        class="form-control"
                        type="file"
                        name="selectedFile1"
                        onChange={this.onChange}
                        single
                        />
                    </div>   

            */

        return(
            <div>
            {redirectVar}
            {nav} 
            <div class="container"> 
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            
                            <h2>List Your Property</h2>
                            <p>Please enter property details</p>
                            <p>{this.state.message}</p>
                        </div>
                        <div class="col-sm-6">
                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Property Name"/>
                        </div>
                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="Location"/>
                        </div>

                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.checkinChangeHandler} type="Date" class="form-control" name="checkin" placeholder="Available from"/>
                        </div>
                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.checkoutChangeHandler} type="Date" class="form-control" name="checkout" placeholder="Available till"/>
                        </div>

                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.guestsChangeHandler} type="number" class="form-control" name="guests" placeholder="Guests"/>
                        </div>

                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.bedroomChangeHandler} type="number" class="form-control" name="bedroom" placeholder="Bedroom"/>
                        </div>

                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.bathroomChangeHandler} type="number" class="form-control" name="bathroom" placeholder="Bathroom"/>
                        </div>
                        
                        </div>

                        <div class="col-sm-6">

                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.minstayChangeHandler} type="number" class="form-control" name="minstay" placeholder="Minimum Stay"/>
                        </div>

                        <div class="form-group">
                                <input style={{fontSize:"18px"}} onChange = {this.priceChangeHandler} type="number" class="form-control" name="price" placeholder="Price"/>
                        </div>

                        <div class="form-group">
                        <input style={{fontSize:"18px"}} onChange = {this.pincodeChangeHandler} type="number" class="form-control" name="pincode" placeholder="Pin Code"/>
                        </div>

                        <div class="form-group"><input
                        class="form-control"
                        type="text"
                        name="description"
                        value={description}
                         onChange={this.onChange}
                         multiple
                         enctype="multipart/form-data"
                        /></div>
                        <div class="form-group"><input
                            class="form-control"
                            type="file"
                            name="selectedFile"
                            onChange={this.onChange}
                            multiple
                            />
                        </div>  
                        
                        </div>
                        
                        
                        

                        
                           
                        <button onClick = {this.submitProperty} class="btn btn-primary" style={{backgroundColor:"#ff8a00",borderColor:"#ff8a00",fontSize:"24px"}}>Submit</button>                 
                    </div>

                </div>
                
            </div>
            </div>
        )
    }
}
//export Login Component
export default ListProperty;