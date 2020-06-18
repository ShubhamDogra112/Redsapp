import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField"
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from "react-redux";
import axios from '../../../serverInstance'
import style from './newScream.module.css'
import * as actions from '../../../store/actions/index'




const styles = {
    form:{
        textAlign:'center',
        padding:'1rem',
    },
    title:{
        margin:'1rem auto'
    },
    TextField:{
        margin:'1rem',
        width:'50'
    },
    resize:{   //for fontSize

        fontSize:15
    
}
}
    


class NewScream extends Component {


    state = {
        body : "",
        showSpinner:false
    }





    handleChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    
  

    handleSubmit = (event)=>{

        event.preventDefault()
        this.setState({showSpinner:true})
        
        let scream_Data  = {
            likeCount:0,
            unlikeCount:0,
            imgUrl:this.props.user.imgUrl,
            body:this.state.body,
            userHandle:this.props.user.handle
        }

        axios.post("/createScream",{body:this.state.body})
        .then(res=>{

            // console.log(res)

            scream_Data.id = res.data.id
            
            this.props.newScream(scream_Data)
            this.setState({showSpinner:false})
            
            this.props.closed()

        

        })
        .catch(err=>{

            this.props.closed()
            this.setState({showSpinner:false})

            


        })

    }




   
    render() {

        const classes = this.props

        let Button =  <button className = {classes.btn} type = "submit" variant="contained" style = {{backgroundColor:'#64b3f4' , color:'#fff' , marginTop:'1rem' , padding:"1rem",outline:"none",border:"none"}} onClick = {this.handleSubmit}>ADD</button>
        
        if(this.state.showSpinner){
            Button = <div className={style.spinner}></div>
        }

        let form = (<form onSubmit = {this.handleSubmit} className = {style.form}>

                <TextField id="BODY" name="body" type="text" label="BODY"
                 className = {classes.TextField} value={this.state.body}
                 onChange = {(event)=>this.handleChange(event)}
                 fullWidth
                 InputProps={{  //changing size of input
                    classes: {
                      input: classes.resize,
                    }}}
                 />

                    {Button}


                    </form>)
        return (
            <div>

                {form}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user.credentials
    };
  };


const mapDispatchToprops = dispatch=>{
    return{
      newScream:(Data)=>dispatch(actions.create_scream(Data))
    }
  }

export default connect(mapStateToProps , mapDispatchToprops)(withStyles(styles)(NewScream) , axios)
