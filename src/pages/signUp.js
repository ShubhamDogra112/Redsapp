import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Spinner from '../Components/Spinners/login/Spinner'
import * as actions from '../store/actions/index'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import axios from '../serverInstance'
import withErrorHandler from '../withErrorHandler/withErrorHandler'


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
    btn:{
        padding:'1rem',
        fontSize:'1rem',
        width:'100%',
        margin:"1rem auto"
    },
    resize:{   //for fontSize

        fontSize:15
    
        },
    link:{
        fontSize:"1.5rem",
    }

}

const initialstate = {
    email:"",
    password:"",
    handle:"",
    confirmPassword:"",
    loading:false,
    valid:false,
    emailError:'',
    passwordError:'',
    handleError:'',
    confirmPasswordError:''
}

 class SignUp extends Component {

    state = {
        email:"",
        password:"",
        handle:"",
        confirmPassword:"",
        loading:false,
        valid:false,
        emailError:'',
        passwordError:'',
        handleError:'',
        confirmPasswordError:''
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
        let handleError = ""
        let confirmPasswordError = ""

        if(this.isEmpty(this.state.email)){
            emailError = "This field is required"
        }
        else if(!this.IsEmail(this.state.email)){
            emailError = "Enter a valid email"
        }
        if(this.isEmpty(this.state.password)){
            passwordError = "This field is required"
        }

        if(this.isEmpty(this.state.handle)){
            handleError = "This field is required"
        }

        if(this.isEmpty(this.state.confirmPassword)){
            confirmPasswordError = "This field is required"
        }

        if(this.state.password.trim() !== this.state.confirmPassword.trim()){
            confirmPasswordError = "Passwords dont match"
        }

        if(emailError || passwordError || handleError || confirmPasswordError){
            this.setState({
                emailError,
                passwordError,
                handleError,
                confirmPasswordError
            })

            return false
        }

        return true

    }



    handleSubmit = (event)=>{
        event.preventDefault()
        let valid = this.validate()

        if(valid){

        this.props.auth(this.state.email ,this.state.password , this.props , this.state.handle ,this.state.confirmPassword )
        
        this.setState(initialstate)

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
                    <form noValidate onSubmit={this.handleSubmit}>

                        

                        <TextField id="email" name="email" type="email" label="Email"
                         className = {classes.TextField} value={this.state.email}
                         onChange = {(event)=>this.handleChange(event)}
                         fullWidth
                         error ={this.state.emailError.trim() !== ''?true:false}
                         helperText = {this.state.emailError}
                         InputProps={{  //changing size of input
                            classes: {
                              input: classes.resize,
                            }}}
                         />
                    
                        <TextField id="password" name="password" type="password" label="Password"
                         className = {classes.TextField} value={this.state.password}
                         onChange = {(event)=>this.handleChange(event)} 
                         fullWidth
                         error ={this.state.passwordError.trim() !== ''?true:false}
                         helperText = {this.state.passwordError}
                         />
                        
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="ConfirmPassword"
                         className = {classes.TextField} value={this.state.confirmPassword}
                         onChange = {(event)=>this.handleChange(event)} 
                         fullWidth
                         error ={this.state.confirmPasswordError.trim() !== ''?true:false}
                         helperText = {this.state.confirmPasswordError}
                         />

                        
                        <TextField id="handle" name="handle" type="text" label="Handle"
                         className = {classes.TextField} value={this.state.handle}
                         onChange = {(event)=>this.handleChange(event)} 
                         fullWidth
                         error ={this.state.handleError.trim() !== ''?true:false}
                         helperText = {this.state.handleError}
                         InputProps={{  //changing size of input
                            classes: {
                              input: classes.resize,
                            }}}
                         />

                        
                       
                         <Button type = "submit" variant="contained" color ="primary" className={classes.btn}
                         onClick = {this.handleSubmit}
                         style = {{backgroundColor:'#64b3f4' , color:'#fff'}}
                         >SignUp</Button>

                         <Link to="/" className={classes.link}>Already have an account ? Switch to sign in</Link>


                    </form>
                    </>
        )

        if(this.props.loading){
            form = <Spinner/>
        }




        return (
            <div className="container container__signUp">


            

                <div style={{display:'flex',flexDirection:'column' ,height:"65vh",minWidth:'25rem' , maxWidth:"50rem" ,backgroundColor:'#fff',padding:'2rem'}}>
        <Typography variant="h2" className = {classes.title}>SignUp</Typography>

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
        auth:(email , password ,props , handle , confirmPassword)=>dispatch(actions.auth(email , password ,props , handle , confirmPassword ))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(withStyles(styles)(SignUp) , axios))
