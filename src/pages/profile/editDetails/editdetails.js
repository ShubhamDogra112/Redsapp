import React, { Component } from 'react'
import axios from '../../../serverInstance'
import TextField from "@material-ui/core/TextField"
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from "react-redux"
import * as actions from '../../../store/actions/index'
import Class from "./editDetails.module.css"


const styles = {
    form:{
        textAlign:'center',
        padding:'1rem',
    },
    title:{
        margin:'1rem auto'
    },
    TextField:{
        margin:'1rem auto',
        width:'50'
    },
    resize:{   //for fontSize

        fontSize:15
    
},
    

}



 class editdetails extends Component {

    componentDidMount(){

    
        this.props.get_user_details()


        


        setTimeout(()=>{

            if(this.props.user){
                this.setState({
                    jobTitle: this.props.user.jobTitle ? this.props.user.jobTitle : "",
                    bio: this.props.user.bio? this.props.user.bio : "",
                    location: this.props.user.location? this.props.user.location : "",
                    website: this.props.user.website? this.props.user.website : "",
                    contactNo: this.props.user.contactNo ? this.props.user.contactNo : ""
                })
            }
        
               

        },5000)

      
       

        

    }




state = {

    jobTitle:"",
    bio:"",
    location:"",
    website:"",
    contactNo:"",
    editDetails:false

    
    
}

handleChange = (event)=>{
    this.setState({
        [event.target.name]:event.target.value
    })
}

handleSubmit = (event)=>{

    event.preventDefault()

    this.setState({editDetails:true})


    const userDetails = {
        jobTitle : this.state.jobTitle,
         bio : this.state.bio,
        location : this.state.location,
        contactNo : this.state.contactNo,
        website : this.state.website

    }

    axios.post("/user" , userDetails)
        .then(res=>{

            // console.log(res)
            this.props.get_user_details()
            this.props.closed()
            this.setState({editDetails:false})

        })
        .catch(err=>{

            this.props.closed()
            this.setState({editDetails:false})


        })


}




    render() {
       let  button  =  ( <span className = {Class.icon} onClick = {this.handleSubmit}>
                    <svg  viewBox="0 0 20 20" style = {{height:"2rem" , width:"2rem" , color:'#212121'}}>
                        <path d="M8.294 16.998c-0.435 0-0.847-0.203-1.111-0.553l-3.573-4.721c-0.465-0.613-0.344-1.486 0.27-1.951 0.615-0.467 1.488-0.344 1.953 0.27l2.351 3.104 5.911-9.492c0.407-0.652 1.267-0.852 1.921-0.445s0.854 1.266 0.446 1.92l-6.984 11.21c-0.242 0.391-0.661 0.635-1.12 0.656-0.022 0.002-0.042 0.002-0.064 0.002z"></path>
                    </svg>
                </span>)

        if(this.state.editDetails){
         button =  <div className={Class.spinner}></div>
        }

        const {classes} = this.props

            let form = (<>
            <form  onSubmit={this.handleSubmit}>


                <TextField id="jobTitle" name="jobTitle" type="text" label="JobTitle"
                 className = {classes.TextField} value={this.state.jobTitle}
                 placeholder = "Jobtitle"
                 onChange = {(event)=>this.handleChange(event)}
                 fullWidth
                 InputProps={{  //changing size of input
                    classes: {
                      input: classes.resize,
                    }}}
                 />

                <TextField id="bio" name="bio" type="text" label="Bio"
                 className = {classes.TextField} value={this.state.bio}
                 placeholder = "Tell us something about yourself"
                 onChange = {(event)=>this.handleChange(event)}
                 fullWidth
                 InputProps={{  //changing size of input
                    classes: {
                      input: classes.resize,
                    }}}
                 />
            
                <TextField id="location" name="location" type="text" label="Location"
                 className = {classes.TextField} value={this.state.location}
                 placeholder = "Your address"
                 onChange = {(event)=>this.handleChange(event)} 
                 fullWidth
                 InputProps={{  //changing size of input
                    classes: {
                      input: classes.resize,
                    }}}
                 />
                
                <TextField id="website" name="website" type="url" label="Website"
                placeholder = "Your personal or professional website"
                 className = {classes.TextField} value={this.state.website}
                 onChange = {(event)=>this.handleChange(event)} 
                 fullWidth
                 InputProps={{  //changing size of input
                    classes: {
                      input: classes.resize,
                    }}}
                 
                 />

                
                <TextField id="contactNo" name="contactNo" type="text" label="ContactNo"
                placeholder="Contact No"
                 className = {classes.TextField} value={this.state.contactNo}
                 onChange = {(event)=>this.handleChange(event)} 
                 fullWidth
                 InputProps={{  //changing size of input
                    classes: {
                      input: classes.resize,
                    }}}
                 />

                 {button}

              

                 


            </form>
            </>
)


        
        return (
            <div>
                <h1>Edit your details</h1>
                {form}
                
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        user:state.user.credentials,
        authenticated:state.auth.token ? true :false
    }

}

const mapDispatchToprops = dispatch=>{
    return{
        get_user_details :()=>dispatch(actions.get_user_details())
    }
}

export default connect(mapStateToProps , mapDispatchToprops)(withStyles(styles)(editdetails) , axios)
