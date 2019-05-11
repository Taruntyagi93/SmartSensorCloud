import React, { Component } from "react";
import axios from 'axios';
import ReactTable from "react-table";
import NavbarSub from '../Home/NavbarSub';
import './Cluster.css';



class Cluster extends Component {

  constructor(props){
    super(props);
        //maintain the state required for this component
        this.state = {
            Properties : [],
            loadDataFlag:false
        }
        //Bind the handlers to this class 
        this.submitSearch = this.submitSearch.bind(this);
    }


  submitSearch = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        let queryMade=""
        //set the with credentials to true
        axios.defaults.withCredentials = true;
            queryMade='http://localhost:3001/api/allfetchCluster'
        console.log(queryMade)
        //make a post request with the user data
        axios.get(queryMade)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200 && response.data!=400){  //if response data from search is not 400 i.e. empty query
                    this.setState({
                        loadDataFlag  : true,
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

    render() {

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

     if(this.state.loadDataFlag){


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
            })

            table = (
              <div className = "dashboardsensor-tablemain" style = {{overflowX: "auto"}}>
              <table style={{borderCollapse: "collapse", borderSpacing:0, width:"100%", border:"2px solid #ddd",padding:"5px"}}>
              <tr className="dashboardsensor-tablemain-heading">
                  <th>Sensor ID</th>
                  <th>Smart Node</th>
                  <th>Cluster ID</th>
                  <th>Type</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Status</th>
              </tr>
              {this.state.Properties.sensors.map(sensor => (
              <tr className="dashboardsensor-tablemain-data">
                <td>{sensor.sensorId}</td>
                <td>{sensor.smartNode}</td>
                <td>{sensor.clusterId}</td>
                <td>{sensor.type}</td>
                <td>{sensor.latitude}</td>
                <td>{sensor.longitude}</td>
                <td>{sensor.status}</td>
                
              </tr>
              ))}
            </table> 
            </div>
              );
      
  }
        return(
          
          <div className="clustermain col-md-12">
            <NavbarSub/>
          <div >
          <div className  = "clusterheading col-md-12">
          <h>
            Smart Emergency Cluster Component
            </h>
            </div>
            <div className="clusterdescription col-md-12">
          <p>
            This component will help the user to get the list of all the sensors
          </p>
          </div>
        <div className="clusterloadbutton col-sm-3">
                <button onClick = {this.submitSearch} style={{backgroundColor:"#fff",borderColor:"#fff",color:"black",fontSize:"18px"}} class="btn btn-primary button-search">Load Data</button>
        </div>
        </div>
        <div className= "clustertable col-md-12" style={{marginTop:"10pi"}}>    
          {redirectVar}
            {table}
        </div>
        </div>
    );
}
}

export default Cluster;
