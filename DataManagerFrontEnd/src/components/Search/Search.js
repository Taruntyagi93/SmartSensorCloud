import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import NavbarResult from '../LandingPage/NavbarResult';


class Search extends Component {

    constructor(props){
        super(props);
        this.state = {  
            Properties : [],
            authFlag : false,
            imageView : [],
            displayprop :"",
        }  
        this.propertyChangeHandler = this.propertyChangeHandler.bind(this);
    } 
    
    componentWillMount(){
        this.setState({
            authFlag : false
        })   
    }

    propertyChangeHandler = (e) => {
        this.setState({
            displayprop : e.target.dataset.attr,
        })
        console.log("Successful test - ",this.state.displayprop)
    }

    componentDidMount(){
        axios.get('http://localhost:3001/result')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    authFlag : true,
                    Properties : response.data,
                });
                console.log("Search :",this.state.Properties)
                console.log("No of results :",this.state.Properties.length)

                let imgdata = {
                    imgname : this.state.Properties.map(property => property.img)
                }
                console.log(imgdata);

                
                //let i;
               // for(i=0;i<this.state.Properties.length;i++){
            axios.post('http://localhost:3001/download', imgdata)
                .then(response => {
                    console.log("Image Res : ",response);
                    let imagePreview=[]
                    imagePreview.push('data:image/jpg;base64, ' + response.data);
                    console.log("Image Res2 : ",imagePreview);
                    this.setState({
                        imageView: imagePreview
                    })
                });
                //console.log(i)
                console.log("images :",this.state.imageView)
           // }
            });
                     
    }

    render(){
        let nav = <NavbarResult navdata={this.props.navdata}/>

       //<td><button style={{backgroundColor:"#0067db",borderColor:"#0067db",fontSize:"18px"}} class="btn btn-primary button-search">Open</button></td>
        let details = this.state.Properties.map(property => {
          // const imgurl = require(`../uploads/${property.img}`);
            const imgurl1 = require(`../uploads/${property.img}`);
           // const imgurl2 = require(`../uploads/${property.img}`);
            return( 
        <div>
            
            <div class="row main-div-search1">
                <div class="col-sm-12">

                    <div class="col-sm-6">
                        <img src={imgurl1} height="400px" width="550px"></img>
                    </div>

                <div class="col-sm-6">
                    <div style={{height:"60px",backgroundColor:"white",marginTop:"30px",marginBottom:"30px",marginLeft:"40px"}}>
                        <td onClick={this.propertyChangeHandler} name="displayprop" data-attr={property.name} style={{fontSize:"40px",fontFamily:"Lato, Roboto !important"}}>
                        {property.name}
                        </td>
                    </div>
                    <div class="col-sm-12" style={{height:"200px"}}>
                    <div class="col-sm-3" ><div class="col-sm-12" style={{fontSize:"19px",fontWeight:"500",textAlign:"left"}}>{property.bedroom} BR</div></div>
                    <div class="col-sm-3" ><div class="col-sm-12" style={{fontSize:"19px",fontWeight:"500",textAlign:"left"}}>{property.bathroom} BA</div></div>
                    <div class="col-sm-3" ><div class="col-sm-12" style={{fontSize:"19px",fontWeight:"500",textAlign:"left"}}>Sleeps {property.guests}</div></div>
                    </div>
                    
                    <div class="col-sm-12" style={{backgroundColor:"#eee",marginLeft:"40px"}}>
                    <div class="col-sm-12" style={{fontSize:"26px",fontWeight:"500",textAlign:"left"}}> $ {property.price} per night</div>
                    </div>
                    
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
                <div><img src={imgurl1} height="50px" width="50px"></img></div>
                </div>
            )
        })

        let redirectVar = null;

          
       if(this.state.displayprop!==""){
            this.props.history.push({
                pathname : '/property',
                state : {
                    displayprops : this.state.displayprop
                }

            })
        }
       
        if(this.state.Properties!=""){
           
        return(

            <div>
            {redirectVar}
            {nav}

            <div class="main-div-book col-sm-12" style={{marginLeft:"30px"}}>
                <div >
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            
                            {details}
                        </tbody>
                        
                </div> 
            </div> 
            </div> 

            
        )
    }else{
        return(

            <div>
                    <div class="main-div">
                        <h2>No results for this query</h2>
                    </div>  
            </div> 
    
                
            )
    }
}
}
//export Home Component
export default Search;