import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import ReactTable from "react-table";
import './react-table.css'

import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { SplitButton,DropdownButton, MenuItem, Button, Image } from 'react-bootstrap';
import Navbar from './Navbar';
import Footbar from './Footbar';


//create the Navbar Component
class SearchBar extends Component {
    constructor(props){
    super(props);
        //maintain the state required for this component
        this.state = {
            Properties : [],
            location : "",
            checkin : "",
            checkout : "",
            guests: "",
            authFlag : false,
            searchFlag : false,
            message : ""
        }
        //Bind the handlers to this class
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.checkinChangeHandler = this.checkinChangeHandler.bind(this);
        this.checkoutChangeHandler = this.checkoutChangeHandler.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.propertyChangeHandler = this.propertyChangeHandler.bind(this);
    }
    //get the books data from backend  

    componentWillMount(){
        this.setState({
            authFlag : false,
            searchFlag : false
        })
    }

    propertyChangeHandler = (e) => {
        this.setState({
            displayprop : e.target.dataset.attr,
        })
        console.log("Successful test - ",this.state.displayprop)
    }

    locationChangeHandler = (e) => {
        this.setState({
            location : e.target.value,
            message : ""
        })
        console.log(this.state.location)
    }
    checkinChangeHandler = (e) => {
        this.setState({
            checkin : e.target.value,
            message : ""
        })
    }
    checkoutChangeHandler = (e) => {
        this.setState({
            checkout : e.target.value,
            message : ""
        })
    }

    guestsChangeHandler = (e) => {
        this.setState({
            guests : e.target.value,
            message : ""
        })
    }


    submitSearch = (e) => {
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
                location : this.state.location,
                checkin : this.state.checkin, //from
                checkout : this.state.checkout, //to
                guests :  this.state.guests  //sensorId
            }
        })
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200 && response.data!=400){  //if response data from search is not 400 i.e. empty query
                    this.setState({
                        searchFlag  : true,
                        Properties : response.data,
                    })
                    // window.location.reload(1);
                }else{
                    this.setState({
                        searchFlag : false,
                        message : "Sorry! No data avaliable for these" //message for empty query
                    })
                }
                console.log(this.state.searchFlag)
                console.log(this.state.Properties.sensors)
            });
    }

    

    render(){
        //if not logged in go to login page

        let redirectVar = null;
        let table = null;
        const columns = [{
            Header: 'Sensor',
            accessor: 'sensorId' // String-based value accessors!
          }, {
            Header: 'Smart Node',
            accessor: 'smartNode',
           // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          },
          {
            Header: 'Cluster',
            accessor: 'cluster',
           // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          },
          {
            Header: 'Type',
            accessor: 'type',
           // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          },
          {
            Header: 'Latitude',
            accessor: 'latitude',
           // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          },
          {
            Header: 'Longitude',
            accessor: 'longitude',
           // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          },
          {
            Header: 'Status',
            accessor: 'status',
           // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          },
          ]
         let data=[] 
    
        if(this.state.searchFlag){


                redirectVar = this.state.Properties.sensors.map(property => {

                    const data1 = {
                        sensorId: property.sensorId,
                        smartNode: property.smartNodeId,
                        cluster: property.clusterId, 
                        type:property.type,
                        latitude:property.latitude,
                        longitude:property.longitude,
                        status:property.status
                      }
                      data.push(data1)

                      
                    //       return( 
                    //   <div>
                    //       <div class="row main-div-search1">
                    //           <div class="col-sm-12">
                    //           <div class="col-sm-6">
                    //               <div style={{height:"60px",backgroundColor:"white",marginTop:"30px",marginBottom:"30px",marginLeft:"40px"}}>
                    //                   <td onClick={this.propertyChangeHandler} name="displayprop" data-attr={property.sensorId} style={{fontSize:"40px",fontFamily:"Lato, Roboto !important"}}>
                    //                   {property.sensorId}
                    //                   </td>
                    //               </div>
                    //               <div class="col-sm-12" style={{height:"200px"}}>
                    //               <div class="col-sm-3" ><div class="col-sm-12" style={{fontSize:"19px",fontWeight:"500",textAlign:"left"}}>{property.smartNodeId}</div></div>
                    //               <div class="col-sm-3" ><div class="col-sm-12" style={{fontSize:"19px",fontWeight:"500",textAlign:"left"}}>{property.clusterId}</div></div>
                    //               <div class="col-sm-3" ><div class="col-sm-12" style={{fontSize:"19px",fontWeight:"500",textAlign:"left"}}>{property.type}</div></div>
                    //               </div>   
                    //           </div>
                    //           </div>
                    //       </div>
                    //   </div>
                  
                    //       )
                      })

                    table =<ReactTable data={data} columns={columns}/>  

                
            } 
            
        

        const imgurl = require(`../Images/smartReport.jpg`);

        return(
            <div>
            <div style={{backgroundImage:`url(${imgurl})`,backgroundSize:"cover",backgroundPosition:"100%",backgroundRepeat:"no-repeat",height:"700px"}}>  
              
            <div class="container">
                <div class="login-form"> 
                    <div class="main-div-search" style={{backgroundColor:"transparent"}}>
                        <div class="table-col">
                            <div class="col-sm-3">
                           {/* 
                            <select style={{height:"60px",backgroundColor:"black",fontSize:"16px"}} name="location" onChange = {this.locationChangeHandler}>
                                <option value="Select">Select an option</option>
                                <option value="cluster">Cluster</option>
                                <option value="smartNode">Smart Node</option>
                                <option value="sensor">Sensor</option>
                            </select>
                        */}     
                            <input style={{height:"60px",backgroundColor:"white",fontSize:"16px"}} onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="Cluster/Smart Node/Sensor"/>
                            </div>

                            <div class="col-sm-2">
                                <input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.checkinChangeHandler} type="Date" class="form-control" name="checkin" placeholder="From"/>
                            </div>

                            <div class="col-sm-2">
                                <input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.checkoutChangeHandler} type="Date" class="form-control" name="checkout" placeholder="Till"/>
                            </div>
                            <div class="col-sm-2">
                                <input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.guestsChangeHandler} type="Number" class="form-control" name="Id" placeholder="ID"/>
                            </div>
                            <div class="col-sm-3">
                                <button onClick = {this.submitSearch} style={{backgroundColor:"#0067db",borderColor:"#0067db",fontSize:"18px"}} class="btn btn-primary button-search">Search Data</button>
                            </div>
                        </div> 
                        <div class="panel" style={{backgroundColor:"transparent",color:"white"}}>
                            Seach Data Generate Report<br></br>
                            Cluster Smart Node Sensors
                        </div>
                        <div style={{backgroundColor: "red"}}>
                            <h3>{this.state.message}</h3> 
                        </div> 
                    </div>
                </div>
            </div>
            </div>
            <div style={{marginTop:"10pi"}}>
            {redirectVar}
            {table}
            
            </div>
            </div>
            
        )
    }
}
export default SearchBar;