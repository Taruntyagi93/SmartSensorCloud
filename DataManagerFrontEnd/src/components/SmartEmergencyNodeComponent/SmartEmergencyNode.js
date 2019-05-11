import React, { Component } from "react";
import TableContainer from "..//Table/TableContainer";
import Switch from "react-switch";
import './SmartEmergencyNode.css';
import NavbarSub from '../Home/NavbarSub';

var data = {
  "fielddata": [{
    "header": "Node Name",
    "inputfield": true,
    "name": "name"
  }, {
    "header": "Node ID",
    "inputfield": true,
    "name": "id"
  }, {
    "header": "Node Location",
    "inputfield": true,
    "name": "loc"
  }, {
    "header": "Sensors",
    "inputfield": false,
    "name": "sensor"
  }, {
    "header": "Status",
    "inputfield": false,
    "name": "status"
  }],
  "instances": [{
    "name": "Node1",
    "id": "1.0",
    "loc": "San Francisco",
    // "sensor": "view info"
    "sensor": <button onClick={(e) => window.location = '/sensor'}>view info</button>,
    "status": <Switch/>

  }, {
    "name": "Node2",
    "id": "2.0",
    "loc": "San Jose",
    "sensor": <button onClick={(e) => window.location = '/sensor'}>view info</button>,
    "status": <Switch/>
  }, {
    "name": "Node3",
    "id": "3.0",
    "loc": "Cupertino",
    "sensor": <button onClick={(e) => window.location = '/sensor'}>view info</button>,
    "status": <Switch/>
  }]
};

class SmartEmergencyNode extends Component {
    render() {
        return(
          

          <div class="SmartNodeMain col-md-12">
          <NavbarSub/>
          <div class  = "SmartNodeHeader col-md-12">
          <h>
            Smart Emergency Node Component
            </h>
            </div>
            <div className="SmartNodedescription col-md-12">
          <p>
            To add Sensors, click on the Add Button and fill out the all the sensor deatils 
          </p>
          </div>
          
            <div class = "SmartNodeTable col-md-12">
            <TableContainer data={data} />
            </div>
      
        </div>
    );
}
}

export default SmartEmergencyNode;
