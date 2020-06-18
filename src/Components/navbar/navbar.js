import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './navbar.scss'

export class navbar extends Component {

    navbarToggler =()=>{
        const input = document.querySelector('.navigation__checkbox')
        input.checked = false;
    }


    
    render() {

        let links = (<>

            <li className = "navigation__item" ><Link className = "navigation__link"  onClick={this.navbarToggler} to="/">Login</Link></li>
            <li  className = "navigation__item"><Link className = "navigation__link" onClick={this.navbarToggler} to="/signUp">SignUp</Link></li>
            </>)

            if(this.props.authenticated){
                links = <>
            
             <li  className = "navigation__item"><Link  className = "navigation__link" onClick={this.navbarToggler} to="/" >Home</Link></li>
             <li className = "navigation__item"><Link className = "navigation__link" onClick={this.navbarToggler} to="/logout" >Logout</Link></li>
                    </>
            }
        return (

            <div className="navigation">

                <input type="checkbox" className = "navigation__checkbox" id = 'navi-toggle'/>

                <label htmlFor="navi-toggle" className = "navigation__button">
                    <span className="navigation__icon">
                        &nbsp;
                    </span>
                </label>

                <div className="navigation__background"></div>
                <div className="navigation__nav">

                    <ul className="navigation__list">
                        {links}
                    </ul>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        authenticated:state.auth.token ? true:false
    }
}

export default connect(mapStateToProps , null)(navbar)
