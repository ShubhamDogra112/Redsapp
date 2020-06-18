import React, { Component } from 'react'
import {connect} from 'react-redux'
import {auth_logout , remove_user_details} from '../store/actions/index'
import {Redirect} from 'react-router-dom'

 class logout extends Component {

    constructor(props){
        super(props)
        this.props.logout()
        this.props.remove()
    }
    render() {
        return (
            <Redirect  to="/" />
        )
    }
}


const mapDispatchToProps = (dispatch)=>{
    return{
        logout:()=>dispatch(auth_logout()),
        remove:()=>dispatch(remove_user_details())
    }
}

export default connect(null , mapDispatchToProps )(logout)
