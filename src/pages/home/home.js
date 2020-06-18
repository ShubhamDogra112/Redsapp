import React, { Component } from "react";
import Spinner from "../../Components/Spinners/home/index";
import axios from "../../serverInstance";
import Scream from "../../Components/Scream/scream";
import "./home.css";
import Profile from "../profile/profile";
import { connect } from "react-redux";
import {getscream , decrement_like , increment_like , delete_scream} from '../../store/actions/index'


class home extends Component {
  componentDidMount() {
    this.props.screams()

    setInterval(() => {
      this.props.screams()
      
    }, 300000);
  }

  likeScreamHandler = (screamId) => {
    let index = this.props.screamData.findIndex(
      (scream) => scream.id === screamId
    );
    let scream = { ...this.props.screamData[index] };

    scream.likeCount += 1;

    let screams = [...this.props.screamData];

    screams[index] = scream;

    axios
      .get(`/scream/${screamId}/like`)
      .then((res) => {
        // console.log(res)
        this.props.increaseLike(screams)
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  unlikeScreamHandler = (screamId) => {
    let index = this.props.screamData.findIndex(
      (scream) => scream.id === screamId
    );
    let scream = { ...this.props.screamData[index] };

    if (scream.likeCount !== 0) {
      scream.likeCount -= 1;
    }
    let screams = [...this.props.screamData];
    screams[index] = scream;

    axios
      .get(`/scream/${screamId}/unlike`)
      .then((res) => {
        // console.log(res)
        this.props.decreaseLike(screams)
      })
      .catch((err) => {
        // console.log(err);
      });
    }
  

  deleteScreamHandler = (screamId) => {
    this.props.deleteScream(screamId)
  };


  render() {

    let data = <Spinner />;

    if(this.props.screamData){

    

    let screamdata =  this.props.screamData.map((scream ,index) => (
          <Scream
            key={index}
            scream={scream}
            like={() => this.likeScreamHandler(scream.id)}
            unlike={() => this.unlikeScreamHandler(scream.id)}
            delete = {()=>this.deleteScreamHandler(scream.id)}
          />
        ))
      
        data = (
        <div className="container__home">
          <div className="screams">{screamdata}</div>
          <div className="profile">
            <Profile />
          </div>
        </div>
      );
    }

    return <div className="container">{data}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.credentials,
    screamData:state.screams.data
  };
};

const mapDispatchToProps = dispatch=>{
    return{
        screams : ()=>dispatch(getscream()),
        increaseLike : (scream)=>dispatch(increment_like(scream)),
        decreaseLike: (scream)=>dispatch(decrement_like(scream)),
        deleteScream : (screamId)=>dispatch(delete_scream(screamId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(home);
