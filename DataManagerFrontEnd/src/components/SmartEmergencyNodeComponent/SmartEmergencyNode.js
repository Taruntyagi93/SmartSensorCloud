import React, { Component } from "react";
import TableContainer from "..//Table/TableContainer";
import Switch from "react-switch";

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
          

          <div class="sensorbg">
          <div class  = "headerFormat">
          <h>
            Smart Emergency Node Component
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

export default SmartEmergencyNode;
