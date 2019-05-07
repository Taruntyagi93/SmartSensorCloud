import React, { Component } from "react";
import TableContainer from "../Table/TableContainer";
import './smartsensor.css';
var data = {
  "fielddata": [{
    "header": "Sensor Name",
    "inputfield": true,
    "name": "name"
  }, {
    "header": "Sensor ID",
    "inputfield": true,
    "name": "id"
  }, {
    "header": "Sensor Location",
    "inputfield": true,
    "name": "loc"
  }, {
    "header": "Status",
    "inputfield": false,
    "name": "status"
  }],
  "instances": [{
    "name": "Sensor1",
    "id": "01",
    "loc": "SouthSF"
  }, {
    "name": "Sensor2",
    "id": "02",
    "loc": "Mission"
  }, {
    "name": "03",
    "id": "03",
    "loc": "Central Park"
  }]
};

class SmartEmergencySensorComponent extends Component {
  render() {

    return (

      <div class="sensorbg">
        <div class  = "headerFormat">
        <h>
          Smart Emergency Sensor Component
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
          <div class = "blackbox">
          <TableContainer data={data} />
          </div>
      </div>
      </div>
    );
  }
}


export default SmartEmergencySensorComponent;

