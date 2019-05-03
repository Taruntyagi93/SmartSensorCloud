import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Navbar from '../LandingPage/Navbar';
import Footbar from '../LandingPage/Footbar';
import { isMoment } from 'moment';
import { format } from 'util';
import NavbarResult from '../LandingPage/NavbarResult';



class Property extends Component {

    constructor(props){
        super(props);
        this.state = {  
            Properties : [],
            authFlag : false,
            bookFlag : false,
            imageView : [],
            propertyname : "",
            location : "",
            checkin : "",
            checkout : "",
            guests :"",
            total :"",
            customer:cookie.load("cookie"),
            message : "",
            description: '',
            selectedFile: '',
        }
        this.book = this.book.bind(this);
        this.checkinChangeHandler = this.checkinChangeHandler.bind(this);
        this.checkoutChangeHandler = this.checkoutChangeHandler.bind(this);
        this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
        this.totalChangeHandler = this.totalChangeHandler.bind(this);
        
    } 
    
    componentDidMount(){

        this.setState({
            authFlag : false,
        });

        const data = {
            propertyname : this.props.location.state.displayprops,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        console.log("propertyname :",data)
        //make a post request with the user data
        axios.post('http://localhost:3001/displayprop',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            console.log("propertyname :",response.data)
            if(response.status === 200){
                this.setState({
                    authFlag : true,
                    Properties : response.data,
                })
            }else{
                this.setState({
                    authFlag : false,
                    message : "User Already Exist "
                })
            }
        });
                   // window.location.reload(1);
                console.log(this.state.Properties)
        
    }

    checkinChangeHandler = (e) => {
        this.setState({
            checkin : e.target.value
        })
    }

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

    totalChangeHandler = (e) => {
        this.setState({
            total : e.target.value
        })
    }

    book = (e) => {
        var headers = new Headers();
        //const { description, selectedFile } = this.state;
        console.log("inside booking request")
        let formData = new FormData();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            propertyname : this.props.location.state.displayprops,
            //propertyname : this.state.propertyname,
            checkin : this.state.checkin,
            checkout : this.state.checkout,
            guests : this.state.guests,
            total : this.state.total,
            customer : this.state.customer,
            description : this.state.description,
            selectedFile : this.state.selectedFile
        }
        formData.append('description',data.description);
        formData.append('selectedFile',data.selectedFile);
        formData.append('propertyname',data.propertyname);
        console.log("inside booking request",data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/booking1',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        bookFlag : true,
                        message : "Congratulations! Successfully booked"
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
        let redirectVar = null; 
        let nav = <NavbarResult navdata={this.props.navdata}/>
        let foot = <Footbar footrender={this.props.footrender}/>
        var tempout = new Date(this.state.checkout)
        var outdate = tempout.getDate()+1
        var tempin = new Date(this.state.checkin)
        var indate= tempin.getDate()+1
        if(indate && outdate)
            var days = outdate-indate;
        else
            days = 0;
        // moment("2018-05-18T04:00:00.000Z").format('DD MMM, YYYY');
        //var indate = this.state.checkin
       // var outdate = Moment(this.state.checkout)
        //let days =  outdate - indate
        console.log("bookFlag" ,this.state.bookFlag);
        
        if(this.state.bookFlag && cookie.load("cookie")){
            redirectVar = <Redirect to= "/booking"/>
        }else if (!cookie.load("cookie")){
            redirectVar = <Redirect to= "/login"/>
        }

        console.log("state transfer" ,this.props.location.state.displayprops);
        let details = this.state.Properties.map(property => {
            return(
        <div>
                <div style={{height:"60px",backgroundColor:"white",fontSize:"2rem",fontFamily:"Lato, Roboto !important",marginTop:"30px",marginBottom:"30px"}}>
                <h2>{property.name}</h2>
                </div>
            <div class="row main-div-search1">
            <div class="col-sm-2" style={{fontSize:"22px",fontWeight:"bold"}}>Details</div>
                <div class="col-sm-10">
                <div class="col-sm-2" ><div class="col-sm-12" style={{fontSize:"19px",textAlign:"left"}}>Location</div><div class="col-sm-12" style={{fontSize:"26px",fontWeight:"500",textAlign:"left"}}>{property.location}</div></div>
                <div class="col-sm-2"  style={{fontSize:"19px",textAlign:"center"}}><div class="col-sm-12">Sleeps</div><div class="col-sm-12" style={{fontSize:"26px",fontWeight:"500",textAlign:"center"}}>{property.guests}</div></div>
                <div class="col-sm-2"  style={{fontSize:"19px",textAlign:"center"}}><div class="col-sm-12">Bedrooms</div><div class="col-sm-12" style={{fontSize:"26px",fontWeight:"500",textAlign:"center"}}>{property.bedroom}</div></div>
                <div class="col-sm-2"  style={{fontSize:"19px",textAlign:"center"}}><div class="col-sm-12">Bathrooms</div><div class="col-sm-12" style={{fontSize:"26px",fontWeight:"500",textAlign:"center"}}>{property.bathroom}</div></div>
                <div class="col-sm-4"  style={{fontSize:"19px",textAlign:"center"}}><div class="col-sm-12">Minimum Stay</div><div class="col-sm-12" style={{fontSize:"26px",fontWeight:"500",textAlign:"center"}}>{property.minstay}</div></div>
                </div>
            </div>
                

                <div class="row main-div-search1">
                <div class="col-sm-2" style={{fontSize:"22px",fontWeight:"bold"}}>About the Property</div>
                <div class="col-sm-10">
                <div class="col-sm-10" style={{fontSize:"17px",fontWeight:"300"}}>
                There are 3 bedrooms downstairs One bedroom has a King Bed Second bedroom has a Queen Bed The last bedroom has 2 Full Size Beds
                We speak both English and Chinese
                Convenient location:
                    3 miles to SFO airport. (Airport easily visible on view)
                    1 Mile to Downtown Millbrae Restaurant
                    15 miles to Downtown SF
                    18 miles to Pier 39 & Golden Gate Bridge
                </div>
                </div>
                </div>

                <div class="row main-div-search1">
                <div class="col-sm-2" style={{fontSize:"22px",fontWeight:"bold"}}>Owner</div>
                <div class="col-sm-10">
                <div class="col-sm-10" style={{fontSize:"17px",fontWeight:"300"}}>
                {property.owner}
                </div>
                </div>
                </div>

                <div class="row main-div-search1">
                <div class="col-sm-2" style={{fontSize:"22px",fontWeight:"bold"}}>Amenities</div>
                <div class="col-sm-10">
                <div class="col-sm-10" style={{fontSize:"17px",fontWeight:"300"}}>
                Bedrooms {property.bedroom}<br></br>
                Bathrooms {property.bathroom}<br></br>
                Capacity {property.guests}
                </div>
                </div>
                </div>

        </div>
    
            )
        })

        let image = this.state.Properties.map(property => {
            //const imgurl = require(`../Images/bkg.png`);
            const imgurl1 = require(`../uploads/${property.img}`);
            //const imgurl2 = require(`../uploads/${property.img}`);
            return(
                <div>
                <div><img src={imgurl1} height="500px" width="1040px"></img></div>
                </div>
            )
        })

        let price = this.state.Properties.map(property => {
            return(
                <h3 style={{marginTop:"10px",marginLeft:"12px"}}>${property.price} per night</h3>
            )
        })

        let total = this.state.Properties.map(property => {
            var finalprice;
            if(days===NaN){
              finalprice=0  
            }else{
                finalprice=days*property.price;
            }
            this.state.total=finalprice;
            return(
                <h3 style={{marginTop:"10px"}}>Total : ${finalprice}</h3>
                
            )
        })

        console.log("details",this.state.total)
           
        return(
            //<input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.totalChangeHandler} type="Number" class="form-control" name="total" placeholder={this.state.total} value={this.state.total}/>
            <div>
                {redirectVar}
                {nav}

                <div class="main-div-book col-sm-8" style={{marginLeft:"30px"}}>
                    <div>
                        {image}       
                    </div>
                    <div >
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                            
                    </div> 
                </div>

                <div class="main-div-book col-sm-3" style={{marginLeft:"30px",marginTop:"100px"}}>
                    {price}
                        <div class="table-col">
                            <div class="col-sm-6">
                                <input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.checkinChangeHandler} type="Date" class="form-control" name="checkin" placeholder="Check In"/>
                            </div>

                            <div class="col-sm-6">
                                <input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.checkoutChangeHandler} type="Date" class="form-control" name="checkout" placeholder="Check Out"/>
                            </div>
                        </div> <br></br>
                        <div class="col-sm-12">
                                <input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.guestsChangeHandler} type="Number" class="form-control" name="guests" placeholder="Guests"/>
                        </div><br></br>
                       
                        <div style={{marginTop:"60px"}}>

                            <div class="col-sm-6">
                                <button onClick = {this.book} style={{backgroundColor:"#0067db",borderColor:"#0067db",fontSize:"18px"}} class="btn btn-primary button-search">Request to Book</button>
                            </div>

                            <div class="col-sm-6" style={{textAlign:"right"}}>
                                {total}
                            </div><br></br>
                        
                        </div>
                        
                        <div class="col-sm-12" style={{marginTop:"80px"}}> 
                            <p style={{color:"black",fontSize:"15px",textAlign:"center"}}><strong>Book Online</strong> or call HomeAway Booking Assistance <strong>888-829-7076</strong></p>
                        </div>
                        
                </div> 
                </div>

            
        )
    
}
}
//export Home Component
export default Property;