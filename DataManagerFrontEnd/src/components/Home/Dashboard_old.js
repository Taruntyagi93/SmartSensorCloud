import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { SplitButton,DropdownButton, MenuItem, Button, Image } from 'react-bootstrap';
import NavbarSub from './NavbarSub';
import './DashboardCloud.css';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
  };



//create the Navbar Component
class Dashboard extends Component {
    constructor (props){
        super(props);
        this.state = {
        showingInfoWindow: false,  
        activeMarker: {},        
        selectedPlace: {} ,
        activeFlag1: false,
        activeFlag2: false,
        activeFlag3: false,
        activeFlag4: false,
        view1Flag: false ,
        mainMapFlag: true, 
        sanfranciscoFlag: false,
        tempdataflag: false, 
        tempdataflag2: false,  
        sanjoseFlag: false,
        backButtonFlag: false,
        paloAltoFlag:false,
        sacramentoFlag: false,
        sfsuMarker: false,
        clusterId: 0,
        authFlag: false,
        goldenMarker: false,
        twinMarker: false,
        missionMarker: false,
        SJSUMarker: false,
        hensleyMarker: false,
        santaClaraMarker: false,
        williamMarker: false,
        theHomeMarker: false,
        TheWilliamMarker: false,
        eastPaloMarker: false,
        ChanningMarker: false,
        elCaminoFlag: false,
        sutterFlag: false,
        ardenFlag: false,
        costcoFlag: false,
      }
    };
  
    onMarker1Click = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        sanjoseFlag: true,
        sanfranciscoFlag: false,
        backButtonFlag: true,
        paloAltoFlag: false,
        sacramentoFlag: false,
        });

    onMarker2Click = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        sanfranciscoFlag: true,
        sanjoseFlag: false,
        paloAltoFlag: false,
        sacramentoFlag: false,
        backButtonFlag: true,
        });

    onMarker3Click = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        sanjoseFlag: false,
        paloAltoFlag: true,
        sacramentoFlag: false,
        sanfranciscoFlag: false,
        backButtonFlag: true,
        });

    onMarker4Click = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        sanjoseFlag: false,
        paloAltoFlag: false,
        sacramentoFlag: true,
        sanfranciscoFlag: false,
        backButtonFlag: true,
        });

    back = () =>
        this.setState({
            sanfranciscoFlag : false,
            sanjoseFlag: false,
            paloAltoFlag: false,
            sacramentoFlag: false,
            mainMapFlag: true,
            backButtonFlag: false,
        });

    tempdata2 = () =>
        this.setState({tempdataflag2 : true});
    
  
   onClose = props => {
     if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onSFSUClick = () =>
  this.setState({
      sfsuMarker: true,
      clusterId: 1,
  });

  onMissionClick = () =>
  this.setState({
      missionMarker: true,
      clusterId: 2,
  });

  onGoldenClick = () =>
  this.setState({
      goldenMarker: true,
      clusterId: 3,
  });

  onTwinClick = () =>
  this.setState({
      twinMarker: true,
      clusterId: 4,
  });

  onSJSUClick = () =>
  this.setState({
      SJSUMarker: true,
      clusterId: 5,
  });

  onHensleyClick = () =>
  this.setState({
      hensleyMarker: true,
      clusterId: 6,
  });

  onSantaClaraClick = () =>
  this.setState({
      santaClaraMarker: true,
      clusterId: 7,
  });

  onWilliamClick = () =>
  this.setState({
      williamMarker: true,
      clusterId: 8,
  });

  onEastPaloClick = () =>
  this.setState({
      eastPaloMarker: true,
      clusterId: 9,
  });

  onTheHomeClick = () =>
  this.setState({
      theHomeMarker: true,
      clusterId: 10,
  });

  onChanningClick = () =>
  this.setState({
      ChanningMarker: true,
      clusterId: 11,
  });

  onTheWillowClick = () =>
  this.setState({
      TheWilliamMarker: true,
      clusterId: 12,
  });

  onArdenClick = () =>
  this.setState({
      ardenFlag: true,
      clusterId: 13,
  });

  onCostcoClick = () =>
  this.setState({
      costcoFlag: true,
      clusterId: 14,
  });

  onElCaminoClick = () =>
  this.setState({
      elCaminoFlag: true,
      clusterId: 15,
  });

  onSutterClick = () =>
  this.setState({
      sutterFlag: true,
      clusterId: 16,
  });

    render(){

        let tabledata2 = null;
        let modaldata1 = null;
        let backButton = null;
        let mainMap = null;
        let SanFranciscoMap = null;
        let modaldatatemp = null;
        let modaldatatemp2 = null;
        let SanJoseMap = null;
        let PaloAltoMap = null;
        let SacramentoMap = null;


        if(this.state.sfsuMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                sfsuMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.goldenMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                goldenMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.missionMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                missionMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.twinMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                twinMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.SJSUMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                SJSUMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.williamMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                williamMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.hensleyMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                hensleyMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.santaClaraMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                santaClaraMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.eastPaloMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                eastPaloMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.theHomeMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                theHomeMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.ChanningMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                ChanningMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.TheWilliamMarker){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                TheWilliamMarker : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.elCaminoFlag){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                elCaminoFlag : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.sutterFlag){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                sutterFlag : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.ardenFlag){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                ardenFlag : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }

        if(this.state.costcoFlag){
            const data = {
              clusterId: this.state.clusterId
            };
            console.log(data);
            axios.defaults.withCredentials = true;
            axios
          .post("http://localhost:3001/api/fetchSensors", data)
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log(response.data);
            if (response.status === 200) {
              this.setState({
  
                authFlag: true,
                costcoFlag : false,
                sensors: response.data.sensors
                //properties: response.data
              });
            } else {
              this.setState({
                authFlag: false
              });
            }
          })
          .catch(err => {
            this.setState({ error: true });
            console.log(err);
          });
        }


  
        if (this.state.authFlag){
            console.log("inside");
                tabledata2 = (
                  <div className = "dashboardsensor-tablemain" style = {{overflowX: "auto"}}>
                  <table style={{borderCollapse: "collapse", borderSpacing:0, width:"100%", border:"2px solid #ddd",padding:"5px"}}>
                  <tr className="dashboardsensor-tablemain-heading">
                      <th>Sensor ID</th>
                      <th>Cluster ID</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Historical Data</th>
                  </tr>
                  {this.state.sensors.map(sensor => (
                  <tr className="dashboardsensor-tablemain-data">
                    <td>{sensor.sensorId}</td>
                    <td>{sensor.clusterId}</td>
                    <td>{sensor.type}</td>
                    <td>{sensor.location}</td>
                    <td>{sensor.provider}</td>
                    <td>{sensor.status}</td>
                    <td>
                         <button onClick= {this.tempdata1} class="view-button" data-toggle="modal" data-target="#myModal"  className= "view-button">view</button>
                     </td>
                  </tr>
                  ))}
                </table> 
                </div>
                  );
                  this.setState.marker2ActiveFlag = false;
                  
          }

        
        if(this.state.backButtonFlag){
            backButton = (
                <div>
                    <button onClick= {this.back} type="button"  class="btn btn-default dashboardcloud-dashboardbutton-region col-md-3">
                            Main Map  
                    </button>
                </div>
            )
        }
       

        if(this.state.tempdataflag){
          modaldatatemp=(
              <div id="myModal" class="modal fade modal-whole" role="dialog">
              <div class="modal-dialog">

                  <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title Modal-Header">Sensor Data</h4>
                  </div>
                  <div className = "dashboardsensor-tablemain" style = {{overflowX: "auto"}}>
                      <table style={{borderCollapse: "collapse", borderSpacing:0, width:"100%", border:"2px solid #ddd",padding:"5px"}}>
                      <tr className="dashboardsensor-tablemain-heading">
                      <th>Date</th>
                      <th>Time (24 hrs)</th>
                      <th>Data (in Celcius)</th>
                      <th>Alert</th>
                      
                      </tr>
                      <tr className="dashboardsensor-tablemain-data">
                      
                      <td>04-15-2019</td>
                      <td>12:00</td>
                      <td>56(F)</td>
                      <td className="dashboardsensor-tablemain-active">No</td>
                      </tr>
                      <tr className="dashboardsensor-tablemain-data">
                      
                      <td>04-15-2019</td>
                      <td>13:00</td>
                      <td>59(F)</td>
                      <td className="dashboardsensor-tablemain-active">No</td>
                      </tr>
                      <tr className="dashboardsensor-tablemain-data">
                      <td>04-15-2019</td>
                      <td>14:00</td>
                      <td>60(F)</td>
                      <td className="dashboardsensor-tablemain-active">No</td>
                      </tr>

                      <tr className="dashboardsensor-tablemain-data">
                      <td>04-15-2019</td>
                      <td>15:00</td>
                      <td>57(F)</td>
                      <td className="dashboardsensor-tablemain-active">No</td>
                      </tr>

                      <tr className="dashboardsensor-tablemain-data">
                      <td>04-15-2019</td>
                      <td>16:00</td>
                      <td>59(F)</td>
                      <td className="dashboardsensor-tablemain-active">No</td>
                      </tr>

                      <tr className="dashboardsensor-tablemain-data">
                      <td>04-15-2019</td>
                      <td>17:00</td>
                      <td>57(F)</td>
                      <td className="dashboardsensor-tablemain-active">No</td>
                      </tr>

                  </table> 
              </div>
              <a className="modal-viewmore">View More Data</a>
              <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
              </div>

              </div>
              </div>
              

          )
      }


        if(this.state.mainMapFlag){
          mainMap = (
            <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{lat: 37.3353,lng: -121.8803}}
            >
            <Marker
                onClick={this.onMarker1Click}
                name={'SJSU'}
                position={{lat: 37.3353,lng: -121.8803}}
                />
            <Marker
                onClick={this.onMarker2Click}
                name={'San Francisco'}
                position={{lat: 37.7753,lng: -122.4203}}
                />
            <Marker
                onClick={this.onMarker4Click}
                name={'Sacramento'}
                position={{lat: 38.600,lng: -121.4591}}
                />   
            <Marker
                onClick={this.onMarker3Click}
                name={'Palo Alto'}
                position={{lat: 37.459,lng: -122.1400}}
                />
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
            >
            <div>
                <h4>{this.state.selectedPlace.name}</h4>
            </div>
            </InfoWindow>
        </Map>

          )
      }

      if(this.state.sanfranciscoFlag){
        SanFranciscoMap = (
        <Map
            google={this.props.google}
            zoom={12.5}
            style={mapStyles}
            initialCenter={{lat: 37.7540,lng: -122.4485}}
        >
        <Marker
            onClick={this.onSFSUClick}
            name={'SFSU'}
            position={{lat: 37.7240,lng: -122.4803}}
        />
        <Marker
            onClick={this.onGoldenClick}
            name={'Golden Gate Park'}
            position={{lat: 37.7700,lng: -122.4653}}
        />
        <Marker
            onClick={this.onTwinClick}
            name={'Twin Peaks'}
            position={{lat: 37.7540,lng: -122.4485}}
        />
        <Marker
            onClick={this.onMissionClick}
            name={'Mission Distroit'}
            position={{lat: 37.7580,lng: -122.4085}}
        />
        <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
        >
        <div>
            <h4>{this.state.selectedPlace.name}</h4>
        </div>
        </InfoWindow>
        </Map>
            )
        }

       
            if(this.state.sanjoseFlag){
              SanJoseMap = (
                  <Map
                      google={this.props.google}
                      zoom={14}
                      style={mapStyles}
                      initialCenter={{lat: 37.3353,lng: -121.8803}}
                  >
                  <Marker
                      onClick={this.onSJSUClick}
                      name={'SJSU'}
                      position={{lat: 37.3353,lng: -121.8803}}
                  />
                  <Marker
                      onClick={this.onHensleyClick}
                      name={'Hensley'}
                      position={{lat: 37.3453,lng: -121.8903}}
                  />
                  <Marker
                      onClick={this.onSantaClaraClick}
                      name={'Santa Clara St.'}
                      position={{lat: 37.3399,lng: -121.8803}}
                  />
                  <Marker
                      onClick={this.onWilliamClick}
                      name={'William St. Park'}
                      position={{lat: 37.3338,lng: -121.8703}}
                  />
                  <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      onClose={this.onClose}
                  >
                  <div>
                      <h4>{this.state.selectedPlace.name}</h4>
                  </div>
                  </InfoWindow>
                  </Map>
         
              )
          }

          if(this.state.paloAltoFlag){
            PaloAltoMap = (
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{lat: 37.459,lng: -122.1400}}
                >
                <Marker
                    onClick={this.onTheHomeClick}
                    name={'The Home Depot'}
                    position={{lat: 37.459,lng: -122.1400}}
                />
                <Marker
                    onClick={this.onEastPaloClick}
                    name={'East Palo Alto'}
                    position={{lat: 37.469,lng: -122.1400}}
                />
                <Marker
                    onClick={this.onChanningClick}
                    name={'Channing Ave.'}
                    position={{lat: 37.449,lng: -122.1400}}
                />
                <Marker
                    onClick={this.onTheWillowClick}
                    name={'The Willow'}
                    position={{lat: 37.459,lng: -122.1490}}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                </div>
                </InfoWindow>
                </Map>
       
            )
        }

        if(this.state.sacramentoFlag){
            SacramentoMap = (
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{lat: 38.600,lng: -121.4591}}
                >
                <Marker
                    onClick={this.onCostcoClick}
                    name={'Costco Wholesale'}
                    position={{lat: 38.5988,lng: -121.4529}}
                />
                <Marker
                    onClick={this.onElCaminoClick}
                    name={'El Camino Ave'}
                    position={{lat: 38.611,lng: -121.4591}}
                />
                <Marker
                    onClick={this.onSutterClick}
                    name={'Sutter Landing'}
                    position={{lat: 38.584,lng: -121.4559}}
                />
                <Marker
                    onClick={this.onArdenClick}
                    name={'Arden Garden'}
                    position={{lat: 38.6058,lng: -121.4691}}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                </div>
                </InfoWindow>
                </Map>
       
            )
        }

        return(
            <div className="super-dashboardcloud col-md-12">
            
                <NavbarSub/>

                {modaldata1}
                {modaldatatemp}
                {modaldatatemp2}

                    <div className="dashboardmain-heading">
                        CLOUD DASHBOARD
                    </div>

                    <div className="dashboardmain-dashboardbutton-main col-md-12">

                        <div class="btn-group dashboardcloud-dashboardbutton-sub col-md-12">

                            
                            <button type="button" class="btn btn-default dashboardcloud-dashboardbutton-cloud col-md-3">
                            CloudBased-Dashboard

                            </button>

                            <a href="/dashboardcloudiotsensorstatus">
                            <button type="button" href="/dashboardsensorstatus" class="btn btn-default dashboardcloud-dashboardbutton-sensor col-md-3">
                            Cloud-based IOT status view
                            </button>
                            </a>

                            <a href="/dashboardregion">
                            <button type="button" href="/dashboardcloud" class="btn btn-default dashboardcloud-dashboardbutton-region col-md-3">
                            RegionBased-Dashboard
                            </button>
                            </a>
                           
                            <a href="/dashboardregioniotsensorstatus">
                            
                            <button type="button" href="/dashboardregion" class="btn btn-default dashboardcloud-dashboardbutton-region col-md-3">
                            Region-based IOT status view   
                            </button>
                            </a>
                        </div>
                    </div>

                    <div className = "dashboardcloud-statistics col-md-12">

                      <div>
                        <button className = "dashboardcloud-statisticsButtonTotalNode col-md-3">
                          112
                          <br></br>
                          Total Nodes
                          <br></br>
                      <a onClick= {this.view1} class="view-button" data-toggle="modal" data-target="#myModal" className="more-info">More Info</a>
                      </button>
                      </div>

                      <div>
                        <button className = "dashboardcloud-statisticsButtonActiveNode col-md-3">
                          62 
                          <br></br>
                          Active Nodes
                        <br></br>
                      <a onClick= {this.view1} class="view-button" data-toggle="modal" data-target="#myModal" className="more-info">More Info</a>
                      </button>
                      </div>

                      <div >
                        <button className = "dashboardcloud-statisticsButtonTotalCluster col-md-3">
                          32 <br></br>
                          Total Cluster
                        <br></br>
                      <a onClick= {this.view1} class="view-button" data-toggle="modal" data-target="#myModal" className="more-info">More Info</a>
                      </button>
                      </div>

                      <div >
                        <button className = "dashboardcloud-statisticsButtonTotalArea col-md-3">
                          4 <br></br>
                          Total Area
                        <br></br>
                      <a onClick= {this.view1} class="view-button" data-toggle="modal" data-target="#myModal" className="more-info">More Info</a>
                      </button>
                      </div>
                    
                    
                    </div>
                    
                    <div className="col-md-12">
                    <div className="google-maps-component col-md-5">
                        {mainMap}
                        {SanFranciscoMap}
                        {SanJoseMap}
                        {SacramentoMap}
                        {PaloAltoMap}
                    </div>
                    
                    <div className="dashboardcloud-table col-md-6">
                        
                        {tabledata2}
                        
                    </div>
                    </div>

                    <div className="col-md-12">
                    <div className="col-md-4 empty"></div>
                    <div className="col-md-4 backButton">
                    {backButton}
                    </div>
                    <div className="col-md-4 empty"></div>
                    </div>

                    

            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBLF7TdB5A5hLaxAY2wZg2vg8ZSM-1PtP8'
   // apiKey: 'AIzaSyBLF7TdB5A5hLaxAY2wZg2vg8ZSM-1PtP8'
  })(Dashboard);