import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Navbar from '../LandingPage/Navbar';
import Footbar from '../LandingPage/Footbar';

class UserDisplay extends Component {

    constructor(props){
        super(props);
        this.state = {
        User : [],
        username:"",
        firstname:"",
        lastname:"",
        phone : "",
        city : "",
        country : "",
        company : "",
        school :"",
        hometown : "",
        languages: '',
        gender: '',
        about : "",
        description: '',
        selectedFile: '',
        authFlag : false,

    }
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.aboutChangeHandler = this.aboutChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.companyChangeHandler = this.companyChangeHandler.bind(this);
    this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
    this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
    this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
    this.genderChangeHandler = this.genderChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
}
//Call the Will Mount to set the auth Flag to false
componentWillMount(){
    this.setState({
        authFlag : false,
        User : []
    }) 
    console.log("my cookie",cookie.load("cookie"))
    console.log("testprops",this.state.User)
    console.log("test",this.state.username)
}


componentDidMount(){
        const data = {
            username : cookie.load("cookie"),
        }
        console.log("User Info Page1:",this.state.username);
       // let redirectVar = null;
        console.log("authFlagNav",this.state.authFlag)

        axios.post('http://localhost:3001/userdisplay',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log("Status",response.data); 
                if(response.status === 200){
                    this.setState({
                        loginFlag : true,
                        User : response.data
                    })
                   // alert(this.state.err)
                }else{
                    this.setState({
                        loginFlag : false,
                        err : "Invalid Request"
                    })
                    //alert(this.state.err)
                }

                console.log("User Data",this.state.User)
                console.log("User1 Data",response.data)
               
            });
                 
}
//username change handler to update state variable with the text entered by the user
phoneChangeHandler = (e) => {
    this.setState({
        phone : e.target.value
    })
}
//username change handler to update state variable with the text entered by the user
usernameChangeHandler = (e) => {
    this.setState({
        username : e.target.value
    })
    console.log("username",this.state.username)
}
//username change handler to update state variable with the text entered by the user
firstnameChangeHandler = (e) => {
    this.setState({
        firstname : e.target.value
    })
}
//username change handler to update state variable with the text entered by the user
lastnameChangeHandler = (e) => {
    this.setState({
        lastname : e.target.value
    })
}

//password change handler to update state variable with the text entered by the user
cityChangeHandler = (e) => {
    this.setState({
        city : e.target.value
    })
}
//password change handler to update state variable with the text entered by the user
countryChangeHandler = (e) => {
    this.setState({
        country : e.target.value
    })
}
//password change handler to update state variable with the text entered by the user
companyChangeHandler = (e) => {
    this.setState({
        company : e.target.value
    })
}

schoolChangeHandler = (e) => {
    this.setState({
        school : e.target.value
    })
}

hometownChangeHandler = (e) => {
    this.setState({
        hometown : e.target.value
    })
}

languagesChangeHandler = (e) => {
    this.setState({
        languages : e.target.value
    })
}

genderChangeHandler = (e) => {
    this.setState({
        gender : e.target.value
    })
}

aboutChangeHandler = (e) => {
    this.setState({
        about : e.target.value
    })
}
//for setting image description
onChange = (e) => {
    if(e.target.name === 'selectedFile'){
      this.setState({
        selectedFile: e.target.files[0]
      })
    }else{
      this.setState({ [e.target.name]: e.target.value });
    }
}

//submit Property handler to send a request to the node backend
submitUpdate = (e) => {
    var headers = new Headers();
    //const { description, selectedFile } = this.state;
    let formData = new FormData();
    //prevent page from refresh
    e.preventDefault();
    const data = {
        username : this.state.User[0].email,
        firstname : this.state.firstname,
        lastname : this.state.lastname,
        phone : this.state.phone,
        city: this.state.city,
        country : this.state.country,
        company : this.state.company,
        school : this.state.school,
        hometown : this.state.hometown,
        languages : this.state.languages,
        gender : this.state.gender,
        about : this.state.about,
        description : this.state.description,
        selectedFile : this.state.selectedFile
    }
    formData.append('description',data.description);
    formData.append('selectedFile',data.selectedFile);
    formData.append('name',data.username);
    console.log("email",this.state.User[0].email)
    console.log("data",data)
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/userupdate',data)
        .then(response => {
            console.log("Status Code : ",response.data);
            if(response.data === 200){
                this.setState({
                    authFlag : true,
                    message : "Congratulations! Successfully updated"
                })
                axios.post('http://localhost:3001/userimage', formData)
                .then((result) => {
                  // access results...
                });
                
            }else{
                this.setState({
                    authFlag : false,
                    message : "Invalid Data "
                })
            }
        });

}

    render(){

        let nav = <Navbar navrender={this.props.navrender}/>
        let foot = <Footbar footrender={this.props.footrender}/>


       //<td><button style={{backgroundColor:"#0067db",borderColor:"#0067db",fontSize:"18px"}} class="btn btn-primary button-search">Open</button></td>
        let details = this.state.User.map(user => {
            return( 
            <div>         
            <div>
                
                <div id="profileheading">
                    <h2>Profile Information</h2>
                 </div>
                <div class="col-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} type="text" class="form-control" name="username" value={user.email} placeholder={user.email}/>
                </div><br></br><br></br><br></br><br></br>
                <div class="col-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.firstnameChangeHandler} type="text" class="form-control" name="firstname" placeholder={user.firstname}/>
                </div><br></br><br></br><br></br><br></br>

                <div class="col-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.lastnameChangeHandler} type="text" class="form-control" name="lastname" placeholder={user.lastname}/>
                </div><br></br><br></br><br></br><br></br>

                <div class="col-sm-8">
                    <input style={{height:"160px",width:"100%",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.aboutChangeHandler} type="text" class="form-control" name="about" placeholder="About me"/>
                </div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <div class="col-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.cityChangeHandler} type="text" class="form-control" name="city" placeholder={user.city}/>
                </div><br></br><br></br><br></br><br></br>

                <div class="col-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.countryChangeHandler} type="text" class="form-control" name="country" placeholder={user.country}/>
                </div><br></br><br></br><br></br><br></br>

                <div class="col-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.companyChangeHandler} type="text" class="form-control" name="company" placeholder={user.company}/>
                </div><br></br><br></br><br></br><br></br>
                <div class="col-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.schoolChangeHandler} type="text" class="form-control" name="school" placeholder={user.school}/>
                </div><br></br><br></br><br></br><br></br>

                <div class="col-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.hometownChangeHandler} type="text" class="form-control" name="hometown" placeholder={user.hometown}/>
                </div><br></br><br></br><br></br><br></br>
                <div class="col-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.languagesChangeHandler} type="text" class="form-control" name="languages" placeholder={user.languages}/>
                </div><br></br><br></br><br></br><br></br>

                <div class="col-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.genderChangeHandler} type="text" class="form-control" name="gender" placeholder={user.gender}/>
                </div><br></br><br></br><br></br><br></br>
                <div class="col-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px",fontWeight:"400"}} onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder={user.phone}/>
                </div><br></br>

            </div> 
            </div>
                
            )
        })

        let redirectVar = null;

        let userinfo=this.state.User.map(user => {
            return( 
            <div className="profilephoto" style={{ textAlign: "center" }}>
                <div style={{fontSize:"32px",marginTop:"200px"}}>
                {user.firstname} {user.lastname}<br></br>
                </div>
                <p style={{fontSize:"20px"}}>{user.city}</p>
            </div>
        )
            })
       
        if(this.state.User!=""){
           
        return(
            
            <div>
                {redirectVar}
                {nav}
                {userinfo}
                <div class="main-div-userdisplay">
                            <div>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </div>
                </div> 
                <div class="col-sm-3">
                    <button onClick = {this.submitUpdate} style={{backgroundColor:"#0067db",borderColor:"#0067db",fontSize:"18px",marginLeft:"40px"}} class="btn btn-primary button-submit">Save Changes</button>
                </div>
                <div style={{marginTop:"100px"}}>
                {foot} 
                </div>   
            </div> 

            
        )
    }else{
        return(

            <div>
                    {nav}
                    <div class="main-div" style={{marginTop:"100px"}}>
                        <h2>Session Expired, Login again !</h2>
                    </div> 
                    {foot} 
             </div> 
    
                
            )
    }
}
}
//export Home Component
export default UserDisplay;