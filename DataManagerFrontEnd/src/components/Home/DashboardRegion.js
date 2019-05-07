import React, {Component} from "react";
import NavbarSub from './NavbarSub';
import axios from 'axios';
import './DashboardRegion.css';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


const mapStyles = {
    width: '100%',
    height: '100%'
  };

class DashboardRegion extends Component{

    constructor (props){
        super(props);
        this.state = {
        showingInfoWindow: false,  
        activeMarker: {},        
        selectedPlace: {} ,
        sanjoseFlag: false,
        sanfranciscoFlag : false,
        sacramentoFlag: false,
        paloAltoFlag: false,
        mainMapFlag1: true,
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



    sanJoseMarkerClick = ()=>{
        this.setState({
            sanfranciscoFlag : false,
            sanjoseFlag: true,
            sacramentoFlag: false,
            paloAltoFlag: false,

        })
    }

    sanFranciscoMarkerClick = ()=>{
        this.setState({
            sanfranciscoFlag : true,
            sanjoseFlag: false,
            sacramentoFlag: false,
            paloAltoFlag: false,
        })
    }

    sacramentoMarkerClick = ()=>{
        this.setState({
            sanfranciscoFlag : false,
            sanjoseFlag: false,
            sacramentoFlag: true,
            paloAltoFlag: false,
        })
    }

    paloAltoMarkerClick= ()=>{
        this.setState({
            sanfranciscoFlag : false,
            sanjoseFlag: false,
            sacramentoFlag: false,
            paloAltoFlag: true,
        })
    }

    onClose = props => {
            if (this.state.showingInfoWindow) {
             this.setState({
               showingInfoWindow: false,
               activeMarker: null
             });
           }
         };
    render(){

        let SanJoseMap = null;
        let SanFranciscoMap = null;
        let mainMap = null;
        let PaloAltoMap  =  null;
        let SacramentoMap  =  null;
        let modaldatatemp = null;
        let tabledata2 = null;



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
                        <td>09:00</td>
                        <td>44(F)</td>
                        <td className="dashboardsensor-tablemain-active">No</td>
                        </tr>
                        <tr className="dashboardsensor-tablemain-data">
                        
                        <td>04-15-2019</td>
                        <td>10:00</td>
                        <td>44(F)</td>
                        <td className="dashboardsensor-tablemain-active">No</td>
                        </tr>
                        <tr className="dashboardsensor-tablemain-data">
                        <td>04-15-2019</td>
                        <td>11:00</td>
                        <td>43(F)</td>
                        <td className="dashboardsensor-tablemain-active">No</td>
                        </tr>
  
                        <tr className="dashboardsensor-tablemain-data">
                        <td>04-15-2019</td>
                        <td>12:00</td>
                        <td>44(F)</td>
                        <td className="dashboardsensor-tablemain-active">No</td>
                        </tr>
  
                        <tr className="dashboardsensor-tablemain-data">
                        <td>04-15-2019</td>
                        <td>13:00</td>
                        <td>44(F)</td>
                        <td className="dashboardsensor-tablemain-active">No</td>
                        </tr>
  
                        <tr className="dashboardsensor-tablemain-data">
                        <td>04-15-2019</td>
                        <td>14:00</td>
                        <td>49(F)</td>
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

        

        if(this.state.sanfranciscoFlag){
            SanFranciscoMap = (
        <Map
            google={this.props.google}
            zoom={12}
            style={mapStyles}
            initialCenter={{lat: 37.7300,lng: -122.4803}}
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

        if(this.state.mainMapFlag1){
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
                    onClick={this.onMarker8Click}
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

        return(
            <div className="super-dashboardregionmain col-md-12">
            
                <NavbarSub/>
                 {modaldatatemp}
             

                

                    <div className="dashboardmain-heading">
                        REGION DASHBOARD
                    </div>

                    <div className="dashboardregion-dashboardbutton-main col-md-12">

                        <div class="btn-group dashboardregion-dashboardbutton-sub col-md-12" role="group" aria-label="...">

                            <a href="/dashboard">
                            
                            <button type="button" class="btn btn-default dashboardregion-dashboardbutton-cloud col-md-3">
                            CloudBased-Dashboard
                                

                            </button>
                            </a>

                            <a href="/dashboardcloudiotsensorstatus">
                            <button type="button" class="btn btn-default dashboardregion-dashboardbutton-sensor col-md-3">
                            Cloud-based IOT status view

                            </button>
                            </a>

                            
                            <button type="button" href="/dashboardregion" class="btn btn-default dashboardregion-dashboardbutton-region  col-md-3">
                            RegionBased-Dashboard
                            </button>
                            

                            <a href="/dashboardregioniotsensorstatus">
                            <button type="button"  class="btn btn-default dashboardregion-dashboardbutton-dasboard col-md-3">
                            Region-based IOT status view
                            </button>
                            </a>
                        </div>
                            

                        <div className="deshboardregion-defaultarea col-md-12">
                        <div className="empty col-md-5"></div>
                        <duv className="deshboardregion-defaultarea-textanddropdown col-md-2">
                        <text className="deshboardregion-defaultarea-text col-md-6">
                            Select Area
                        </text>
                        <div class="dropdown">
                            <button class="btn  dropdown-toggle dashboardregion-areadropdown col-md-6" type="button" data-toggle="dropdown">Areas
                            <span class="caret"></span></button>
                            <ul class="dropdown-menu dashboardregion-areadropdownmenu col-md-1">
                                <li><a onClick= {this.sanJoseMarkerClick}>San Jose</a></li>
                                <li><a onClick= {this.sanFranciscoMarkerClick}>San Francisco</a></li>
                                <li><a onClick= {this.paloAltoMarkerClick}>Palo Alto</a></li>
                                <li><a onClick= {this.sacramentoMarkerClick}>Sacramento</a></li>
                            </ul>
                        </div> 
                        </duv>
                        <div className="empty col-md-5"></div>
                        </div>
                        
                        <div className="dashboardcloud-table col-md-6">
                            {tabledata2}
                    </div>

                        <div className="google-maps-component col-md-5">
                        {mainMap}
                        {SanJoseMap}
                        {SanFranciscoMap}
                        {SacramentoMap}
                        {PaloAltoMap}
                    </div>


                    </div>


                    </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBLF7TdB5A5hLaxAY2wZg2vg8ZSM-1PtP8'
  })(DashboardRegion);
