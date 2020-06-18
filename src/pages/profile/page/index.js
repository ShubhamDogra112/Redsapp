import React, { Component } from 'react'
import classes from './index.module.scss'
import {Link} from "react-router-dom"

export class index extends Component {
    render() {
        return (
            <div className = {classes.paper}>
                <p className = {classes.para}>Can't find user profile</p>
                <div className= {classes.btn__box}>
                <Link className = {classes.primary} to = "/login">Login</Link>
                <Link className = {classes.secondary} to = "/signUp">SignUp</Link>

                </div>
                
                               
            </div>
        )
    }
}

export default index
