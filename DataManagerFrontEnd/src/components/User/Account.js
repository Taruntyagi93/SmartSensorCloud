import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Navbar from '../LandingPage/Navbar';
import Footbar from '../LandingPage/Footbar';

class Account extends Component {

    constructor(props){
        super(props);
        this.state = {
        User : [],
        username:"",
        password:"",
        newpassword:"",
        confirmpassword:"",
        authFlag : false,

    }
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
    this.confirmPasswordHandler = this.confirmPasswordHandler.bind(this);
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
usernameChangeHandler = (e) => {
    this.setState({
        username : e.target.value
    })
    console.log("username",this.state.username)
}
//username change handler to update state variable with the text entered by the user
passwordHandler = (e) => {
    this.setState({
        password : e.target.value
    })
}
//username change handler to update state variable with the text entered by the user
passwordChangeHandler = (e) => {
    this.setState({
        newpassword : e.target.value
    })
}

//password change handler to update state variable with the text entered by the user
confirmPasswordHandler = (e) => {
    this.setState({
        confirmpassword : e.target.value
    })
}
//password change handler to update state variable with the text entered by the user

//submit Property handler to send a request to the node backend
submitUpdate = (e) => {
    var headers = new Headers();
    //const { description, selectedFile } = this.state;
    let formData = new FormData();
    //prevent page from refresh
    e.preventDefault();
    const data = {
        username : this.state.User[0].email,
        password: this.state.password,
        newpassword : this.state.newpassword,
    }
    console.log("email",this.state.User[0].email)
    console.log("data",data)
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/accountupdate',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            console.log("authFlagaccount",this.state.authFlag)
            if(response.status === 200){
                this.setState({
                    authFlag : true,
                    message : "Congratulations! Successfully updated"
                })
                
            }else{
                this.setState({
                    authFlag : false,
                    message : "Invalid Request "
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
            <div class="table-row">
            <div class="row-sm-4">
            <input style={{height:"60px",backgroundColor:"white",fontSize:"16px"}} type="text" class="form-control" name="username" placeholder={user.email}/>
            </div><br></br>
                <div class="row-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"16px"}} onChange = {this.passwordHandler} type="text" class="form-control" name="password" placeholder="Current Password"/>
                </div><br></br>

                <div class="row-sm-4">
                    <input style={{height:"60px",backgroundColor:"white",fontSize:"18px"}} onChange = {this.passwordChangeHandler} type="text" class="form-control" name="newpassword" placeholder="Enter New Password"/>
                </div><br></br>

                <div class="row-sm-12">
                    <input style={{height:"160px",width:"100%",backgroundColor:"white",fontSize:"18px"}} onChange = {this.confirmPasswordHandler} type="text" class="form-control" name="confirmpassword" placeholder="Confirm New Password"/>
                </div><br></br>
                
            </div> 
                
            )
        })

        let redirectVar = null;

        
       
        if(this.state.User!=""){
           
        return(
            
            <div>
                {redirectVar}
                {nav}
                <div class="main-div">
                    <h2>Profile Information</h2>
                    <p style={{fontSize:"20px",backgroundColor:"red"}}>{this.state.message}</p>

                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                </div> 
                <div class="col-sm-3">
                    <button onClick = {this.submitUpdate} style={{backgroundColor:"#0067db",borderColor:"#0067db",fontSize:"18px"}} class="btn btn-primary button-search">Save Changes</button>
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
                    <div class="main-div">
                        <h2>No results for this query</h2>
                    </div> 
                    {foot} 
             </div> 
    
                
            )
    }
}
}
//export Home Component
export default Account;