import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import Footbar from './Footbar';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '90%',
    height: '90%'
  };

class SensorProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
        User : [],
        sensorId:"",
        smartNodeId:"",
        clusterId:"",
        latitude : "",
        logitude : "",
        type : "",
        status : "",
        guests: "",
        searchFlag : false,
        authFlag : false,
        mapFlag:false
    }
    //Bind the handlers to this class
    this.sensorIdChangeHandler = this.sensorIdChangeHandler.bind(this);
    this.smartNodeIdChangeHandler = this.smartNodeIdChangeHandler.bind(this);
    this.clusterIdChangeHandler = this.clusterIdChangeHandler.bind(this);
    this.latitudeChangeHandler = this.latitudeChangeHandler.bind(this);
    this.longitudeChangeHandler = this.longitudeChangeHandler.bind(this);
    this.typeChangeHandler = this.typeChangeHandler.bind(this);
    this.statusChangeHandler = this.statusChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
}
//Call the Will Mount to set the auth Flag to false
componentWillMount(){
    this.setState({
        authFlag : false,
        User : []
    }) 
    console.log("my cookie",cookie.load("cookie"))
    
}

locationChangeHandler = (e) => {
    this.setState({
        location : e.target.value,
        message : ""
    })
    console.log(this.state.location)
}

guestsChangeHandler = (e) => {
    this.setState({
        guests : e.target.value,
        message : ""
    })
}

submitSearch = (e) => {
    //this.state.searchFlag=false;
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    let queryMade=""
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    if(this.state.location.toLowerCase()=="cluster"){
        queryMade='http://localhost:3001/api/fetchCluster'
    }else if (this.state.location.toLowerCase()=="smartnode"){
        queryMade='http://localhost:3001/api/fetchSmartNode'
    }else if (this.state.location.toLowerCase()=="sensor"){
        queryMade='http://localhost:3001/api/fetchSensor'
    }else{

        this.setState({
            searchFlag : false,
            message : "Sorry! No data avaliable for these" //message for empty query
        })
        
    }
    console.log(queryMade)
    //make a post request with the user data
    axios.get(queryMade,{
        params:{
            location : this.state.location, //cluster, smart node or sensor
            guests :  this.state.guests  //sensorId
        }
    })
        .then(response => {
            console.log("Status Code : ",response.status,response.data);
            if(response.status === 200 && response.data.sensors[0]){  //if response data from search is not 400 i.e. empty query
                this.setState({
                    searchFlag  : true,
                    User : response.data,
                    sensorId : response.data.sensors[0].sensorId,
                    clusterId : response.data.sensors[0].clusterId,
                    smartNodeId : response.data.sensors[0].smartNodeId,
                    latitude: response.data.sensors[0].latitude,
                    longitude: response.data.sensors[0].longitude,
                    type: response.data.sensors[0].type,
                    status: response.data.sensors[0].status,
                })
                // window.location.reload(1);
            }else{
                this.setState({
                    searchFlag : false,
                    message : "Sorry! No data avaliable for these" //message for empty query
                })
            }
            console.log(this.state.searchFlag)
            console.log(this.state.User.sensors)
        });
}

//username change handler to update state variable with the text entered by the user
sensorIdChangeHandler = (e) => {
    this.setState({
        sensorId : e.target.value
    })
}
//username change handler to update state variable with the text entered by the user
clusterIdChangeHandler = (e) => {
    this.setState({
        clusterId : e.target.value,
    })
}

//password change handler to update state variable with the text entered by the user
smartNodeIdChangeHandler = (e) => {
    this.setState({
        smartNodeId : e.target.value
    })
}
//password change handler to update state variable with the text entered by the user
typeChangeHandler = (e) => {
    this.setState({
        type : e.target.value
    })
}
//password change handler to update state variable with the text entered by the user
latitudeChangeHandler = (e) => {
    this.setState({
        latitude : e.target.value
    })
}

longitudeChangeHandler = (e) => {
    this.setState({
        longitude : e.target.value
    })
}

statusChangeHandler = (e) => {
    this.setState({
        status : e.target.value
    })
}

languagesChangeHandler = (e) => {
    this.setState({
        languages : e.target.value
    })
}

//for setting image description


//submit Property handler to send a request to the node backend
submitUpdate = (e) => {
    var headers = new Headers();
    //const { description, selectedFile } = this.state;
    let formData = new FormData();
    //prevent page from refresh
    e.preventDefault();
    console.log("data",this.state.User)
    const data = {
        sensorId : this.state.sensorId,
        clusterId : this.state.clusterId,
        smartNodeId : this.state.smartNodeId,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        type: this.state.type,
        status: this.state.status,
    }
    console.log("sensor",this.state.User[0])
    console.log("data",data)
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/api/dataUpdate',data)
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.data.status === 200){
                this.setState({
                    authFlag : true,
                    message : "Congratulations! Successfully updated"
                })   
            }else{
                this.setState({
                    authFlag : false,
                    message : "Invalid Data "
                })
            }
        });

}

deleteRequest = (e) => {
var headers = new Headers();
//const { description, selectedFile } = this.state;
let formData = new FormData();
//prevent page from refresh
e.preventDefault();
console.log("data",this.state.User)
const data = {
    sensorId : this.state.sensorId,
    clusterId : this.state.clusterId,
    smartNodeId : this.state.smartNodeId,
}
console.log("sensor",this.state.User[0])
console.log("data",data)
//set the with credentials to true
axios.defaults.withCredentials = true;
//make a post request with the user data
axios.post('http://localhost:3001/api/deleteData',data)
    .then(response => {
        console.log("Status Code : ",response.data);
        axios.post('http://localhost:3001/sensor/deleteData',data)
        if(response.data.status === 200){
            this.setState({
                authFlag : true,
                message : "Congratulations! Successfully updated"
            })   
        }else{
            this.setState({
                authFlag : false,
                message : "Invalid Data "
            })
        }
    });

}


showMapRequest = (e) => {
    var headers = new Headers();
    //const { description, selectedFile } = this.state;
    let formData = new FormData();
    //prevent page from refresh
    e.preventDefault();
    console.log("data",this.state.User.sensors[0].latitude)
    if(this.state.searchFlag){
        this.setState({
            latitude:this.state.User.sensors[0].latitude,
            longitude:this.state.User.sensors[0].longitude,
            mapFlag:true
        })
    }
    
    }

    onMarker1Click = (props, marker, e) =>
    this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
    marker1ActiveFlag: true
    });

    render(){

        let nav = <Navbar navrender={this.props.navrender}/>
        let foot = <Footbar footrender={this.props.footrender}/>

        let details=null
        let map=null

        if(this.state.searchFlag){
            details = this.state.User.sensors.map(user => {
                return( 
                                    
                            <div class="col-sm-12" style={{marginTop:"10px"}}>
                                <div class="col-sm-2">
                                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} type="Number" class="form-control" name="sensorId" value={user.sensorId} placeholder={user.sensorId}/>
                                </div>
                                <div class="col-sm-1">
                                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.clusterIdChangeHandler} type="Number" class="form-control" name="clusterId" placeholder={user.clusterId}/>
                                </div>
                
                                <div class="col-sm-1">
                                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.smartNodeIdChangeHandler} type="Number" class="form-control" name="smartNodeId" placeholder={user.smartNodeId}/>
                                </div>
                
                               <div class="col-sm-2">
                                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.typeChangeHandler} type="text" class="form-control" name="type" placeholder={user.type}/>
                                </div>
                
                                <div class="col-sm-2">
                                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.latitudeChangeHandler} type="text" class="form-control" name="latitude" placeholder={user.latitude}/>
                                </div>
                
                                <div class="col-sm-2">
                                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.longitudeChangeHandler} type="text" class="form-control" name="longitude" placeholder={user.longitude}/>
                                </div>
                                <div class="col-sm-2">
                                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.statusChangeHandler} type="text" class="form-control" name="status" placeholder={user.status}/>
                                </div>
                
                            </div>             
                            
                )
                
           
            })
        }

        if(this.state.mapFlag){
            map= (
            
            <div style={{marginTop:"120px",marginLeft:"5%"}}>
            <Map
            google={this.props.google}
            zoom={6}
            style={mapStyles}
            initialCenter={{lat: this.state.latitude,lng: this.state.longitude}}
        >
        <Marker
            onClick={this.onMarker1Click}
            name={"Sensor"}
            position={{lat: this.state.latitude,lng: this.state.longitude}}
            />
        <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
        >
        <div>
            <h4>{"Sensor"}</h4>
        </div>
        </InfoWindow>
        </Map>
        </div>)

        this.state.mapFlag=false

        }else{
            map=<div style={{marginTop:"180px"}}>{foot}</div>
        //    map=(
        //     <div style={{marginTop:"120px"}}>
        //     <Map
        //     google={this.props.google}
        //     zoom={2}
        //     style={mapStyles}
        //     initialCenter={{lat: 0,lng: 0}}
        // >
        // </Map>
        // </div>
        //    )
        }
        const imgurl = require(`../Images/smart-agriculture-image.jpg`);
       
        return(
            
            <div>
                {nav} 
                <div style={{backgroundImage:`url(${imgurl})`,backgroundSize:"cover",backgroundPosition:"100%",backgroundRepeat:"no-repeat",height:"700px"}}>
               
            <div class="container">
            
                <div class="login-form"> 
                
                    <div class="main-div-search" style={{backgroundColor:"transparent"}}>
                    <div id="profileheading">
                            <h2 style={{color:"white"}}>Sensor Profile Information</h2>
                        </div>
                        <div class="table-col">
                            <div class="col-sm-3">   
                            <input style={{height:"60px",backgroundColor:"white",fontSize:"16px"}} onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="Cluster/Smart Node/Sensor"/>
                            </div>
                            <div class="col-sm-2">
                                <input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.guestsChangeHandler} type="Number" class="form-control" name="Id" placeholder="ID"/>
                            </div>
                        </div> 
                        <div style={{backgroundColor: "blue"}}>
                            <h3>{this.state.message}</h3> 
                        </div> 
                    </div>
                </div>
            </div>
            
            
            <div class="container">
                
                <div>
                    {/*Display the Tbale row based on data recieved*/}
                    {details}
                </div>
                <div class="col-sm-3" style={{marginTop:"10px"}}>
                    <button onClick = {this.submitSearch} style={{backgroundColor:"tranlucent",borderColor:"#0067db",fontSize:"18px",marginLeft:"40px"}} class="btn button-submit">Search Data</button>
                </div>
                <div class="col-sm-3" style={{marginTop:"10px"}}>
                    <button onClick = {this.submitUpdate} style={{backgroundColor:"tranlucent",borderColor:"#0067db",fontSize:"18px",marginLeft:"40px"}} class="btn button-submit">Save Changes</button>
                </div>
                <div class="col-sm-3" style={{marginTop:"10px"}}>
                    <button onClick = {this.deleteRequest} style={{backgroundColor:"tranlucent",borderColor:"#0067db",fontSize:"18px",marginLeft:"40px"}} class="btn button-submit">Delete Data</button>
                </div>
                <div class="col-sm-3" style={{marginTop:"10px"}}>
                    <button onClick = {this.showMapRequest} style={{backgroundColor:"tranlucent",borderColor:"#0067db",fontSize:"18px",marginLeft:"40px"}} class="btn button-submit">Show Map</button>
                </div>
            </div>
                {map} 
                 
                </div>  
            </div> 

            
        )
}
}
//export Home Component
//export default Login;
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBLF7TdB5A5hLaxAY2wZg2vg8ZSM-1PtP8'
  })(SensorProfile);