import React  ,{Fragment , Component} from 'react'
import {Switch , Route} from 'react-router-dom'
import Login from "./pages/login"
import Signup from "./pages/signUp"
import logout from './pages/logout'
import Home from "./pages/home/home"
import comment from './pages/comment/comment'
import {connect} from 'react-redux'
import Navbar from './Components/navbar/navbar'
import * as actions from './store/actions/index'


class  App extends Component{

  constructor(props){
    super(props)

    this.props.authCheck()
  }


  render(){

  let routes = <Switch>
    <Route  path = '/signUp' component = {Signup} />
    <Route  path = "/" component = {Login} />



  </Switch>

  if(this.props.authenticated){
    routes = <Switch>
    <Route path = "/home" component = {Home}/>
    <Route path = "/scream/:id" component = {comment}/>
    <Route  path = '/signUp' component = {Signup} />
    <Route path = "/logout" component = {logout}/>
    <Route  path = "/" component = {Login} />


  </Switch>
  }

return (
      <Fragment>

        
      <Navbar/>
        
        {routes}
        




        
       
     
      </Fragment>
    )
  }
}

  const mapStateToProps = state=>{
    return{

      authenticated:state.auth.token ? true:false

    }
  }


  const mapDispatchToProps = dispatch=>{
    return{
      authCheck : ()=>dispatch(actions.auth_check())
    }
  }


export default connect(mapStateToProps , mapDispatchToProps)(App)