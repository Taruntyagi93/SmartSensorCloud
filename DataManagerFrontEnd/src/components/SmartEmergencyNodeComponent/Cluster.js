import React, { Component } from "react";
import TableContainer from "..//Table/TableContainer";
import Switch from "react-switch";
import axios from 'axios';
import ReactTable from "react-table";



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

          table =(
              <div>
                  <ReactTable data={data} columns={columns}/> 
              </div> 

          // <div class = "blackbox">
          //   <TableContainer data={data} columns={columns} />
          //   </div>
          )
      
  }
        return(
          
          <div>
          <div class="sensorbg">
          <div class  = "headerFormat">
          <h>
            Smart Emergency Cluster Component
            </h>
            </div>
          <p class="blackbox">
            We are designing and developing the Smart Alert IoT Emergency system which will give alert to the user at the time of an emergency like natural disasters (wildfire, flooding).
            The system will consist of IoT based smart emergency nodes that will be installed with sensors like Heat, wind, moisture.
            The data from these smart sensor nodes will be transferred to cluster nodes, and then from these cluster nodes to the Cloud. T
            he system will have two cloud databases, one of them will store the data related to the location of the cluster node as well as the smart node.
            The other one will contain the data collected from the smart node
          </p>
          <div class = "tablePadding">
            {/* <div class = "blackbox">
            <TableContainer data={data} columns={columns} />
            </div> */}
            
           
            
        </div>
        <div class="col-sm-3">
                <button onClick = {this.submitSearch} style={{backgroundColor:"#0067db",borderColor:"#0067db",fontSize:"18px"}} class="btn btn-primary button-search">Load Data</button>
        </div>
        </div>
        <div style={{marginTop:"10pi"}}>    
          {redirectVar}
            {table}
        </div>
        </div>
    );
}
}

export default Cluster;
