import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Spinner from '../Components/Spinners/login/Spinner'
import * as actions from '../store/actions/index'
import withErrorHandler from '../withErrorHandler/withErrorHandler'
import axios from '../serverInstance'
import {connect} from "react-redux"
import {Link} from  "react-router-dom"


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
        
    },
    btn:{
        padding:'1rem',
        fontSize:'1rem',
        width:'100%',
        margin:"1rem auto"
    },

    resize:{   //for fontSize

    fontSize:15,
    color:'#212121'

    }
}
const initialstate = {
    email:"",
    password:"",
    loading:false,
    valid:false,
    emailError:'',
    passwordError:''
}

 class Login extends Component {

    state = {
        email:"",
        password:"",
        loading:false,
        valid:false,
        emailError:'',
        passwordError:''
       
    }

    IsEmail = (email)=>{
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email.match(reg)) return true;
        else return false
    
    }
    
     isEmpty = (value)=>{
        if (value.trim() === ""){
            return true
        }
        else{
            return false
        }
    }

    validate = ()=>{
        let emailError = ""
        let passwordError = ""

        if(this.isEmpty(this.state.email)){
            emailError = "This field is required"
        }
        else if(!this.IsEmail(this.state.email)){
            emailError = "Enter a valid email"
        }
        if(this.isEmpty(this.state.password)){
            passwordError = "This field is required"
        }

        if(emailError || passwordError){
            this.setState({
                emailError,
                passwordError
            })

            return false
        }

        return true

    }




    handleSubmit = (event)=>{
        event.preventDefault()
        const isValid = this.validate()

        if(isValid){
        
        this.props.auth(this.state.email ,this.state.password ,this.props , '')

        this.setState({initialstate})


        }
    
}

handleChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
            
    
}

    render() {
        const {classes} = this.props

        
        let form = (<>
            <Typography variant="h2" className = {classes.title}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit} >

                        <TextField id="email" name="email" type="email" label="Email"
                         className = {classes.TextField} value={this.state.email}
                         onChange = {(event)=>this.handleChange(event)} fullWidth
                         error ={this.state.emailError.trim() !== ''?true:false}
                         helperText = {this.state.emailError}
                         InputProps={{  //changing size of input
                            classes: {
                              input: classes.resize,
                            }}}
                         />

                        <TextField id="password" name="password" type="password" label="Password"
                         className = {classes.TextField} value={this.state.password}
                         onChange = {(event)=>this.handleChange(event)} fullWidth
                         error ={this.state.passwordError.trim() !== ''?true:false}
                         helperText ={this.state.passwordError}
                         />

                         <Button type = "submit" variant="contained" style = {{backgroundColor:'#64b3f4' , color:'#fff'}} className={classes.btn}
                         onClick = {this.handleSubmit}
                         >Login</Button>


                        <div style={{padding:"1rem"}}>
                         <Link to = "/signUp"><h2>Don't have an account ?  click here</h2></Link>


                        </div>

                        



                    </form>
                    </>
        )

        if(this.props.loading){
            form = <Spinner/>
        } 

    


        return (

            
        
        
                <div className="container container__login">
                    <div style={{display:'flex',flexDirection:'column' ,height:"50vh" ,backgroundColor:'#fff',padding:'2rem'}}>
                    {form}
        

                    </div>
                    
                </div>

            
            
          
        )
    }
}

const mapStateToProps = state=>{
    return{
        loading:state.auth.loading
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        auth:(email , password ,props ,handle , confirmPassword)=>dispatch(actions.auth(email , password ,props , handle , confirmPassword  ))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(withStyles(styles)(Login),axios))
