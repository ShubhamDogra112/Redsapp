import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./scream.scss";
import dayjs from "dayjs";
import { connect } from "react-redux";
import relativeTime from "dayjs/plugin/relativeTime";
import Modal from "../Modal/Modal";
import * as actions from "../../store/actions/index"



class scream extends Component {


  state = {
    showModal: false,
  };

  likedScream = () => {
    if (
      this.props.userLikes &&
      this.props.userLikes.find((like) => like.screamId === this.props.scream.id)
    ){
      return true;
    }
    else return false;
  };

  likeHandler = (screamId) => {
    if (!this.props.authenticated) {
      this.setState({ showModal: true });
    } else {

      let new_like = {
        userHandle: this.props.user.handle,
        screamId : screamId
      }

      this.props.like();
      this.props.Like(new_like)
    }
  };


  unlikeHandler = (screamId) => {
    if (!this.props.authenticated) {
      this.setState({ showModal: true});
    } else {

      this.props.unlike();
      this.props.Unlike(screamId)
    }
  };

  modalToggleHanlder = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const {
      scream: {
        body,
        imgUrl,
        likeCount,
        commentCount,
        id,
        createdAt,
        userHandle,
      },
    } = this.props;

  

    let heart = this.likedScream() ? (
      <svg
      className="Icon Icon__Heart"
      viewBox="0 0 20 20"
      onClick={() => this.unlikeHandler(id)}
    >
      <path d="M17.19 4.155c-1.672-1.534-4.383-1.534-6.055 0l-1.135 1.042-1.136-1.042c-1.672-1.534-4.382-1.534-6.054 0-1.881 1.727-1.881 4.52 0 6.246l7.19 6.599 7.19-6.599c1.88-1.726 1.88-4.52 0-6.246z"></path>
    </svg>

      
    ) : (

      <svg
        className="Icon Icon__Heart-outlined"
        viewBox="0 0 20 20"
        onClick={() => this.likeHandler(id)}
      >
        <path d="M17.19 4.156c-1.672-1.535-4.383-1.535-6.055 0l-1.135 1.041-1.136-1.041c-1.672-1.535-4.382-1.535-6.054 0-1.881 1.726-1.881 4.519 0 6.245l7.19 6.599 7.19-6.599c1.88-1.726 1.88-4.52 0-6.245zM16.124 9.375l-6.124 5.715-6.125-5.715c-0.617-0.567-0.856-1.307-0.856-2.094s0.138-1.433 0.756-1.999c0.545-0.501 1.278-0.777 2.063-0.777s1.517 0.476 2.062 0.978l2.1 1.825 2.099-1.826c0.546-0.502 1.278-0.978 2.063-0.978s1.518 0.276 2.063 0.777c0.618 0.566 0.755 1.212 0.755 1.999s-0.238 1.528-0.856 2.095z"></path>
      </svg>
     
    );

    


    

    let modal = null;

    if (this.state.showModal) {
      modal = (
        <Modal
          show={this.state.showModal}
          modalClosed={this.modalToggleHanlder}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 className="message">
              Join Redsapp now to let <strong>{userHandle}</strong> know that
              you have liked their tweet
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/login" className="primary">
                Login
              </Link>
              <Link to="/signUp" className="secondary">
                SignUp
              </Link>
            </div>
          </div>
        </Modal>
      );
    }

    let message = likeCount > 1 ? "likes" : "like";
    let trashIcon = null;
    if(this.props.authenticated){
      if(this.props.user && this.props.user.handle === this.props.scream.userHandle){
      trashIcon = <svg className="Icon__Trash" onClick = {this.props.delete}>
      <path d="M3.389 7.113l1.101 10.908c0.061 0.461 2.287 1.977 5.51 1.979 3.225-0.002 5.451-1.518 5.511-1.979l1.102-10.908c-1.684 0.942-4.201 1.387-6.613 1.387-2.41 0-4.928-0.445-6.611-1.387zM13.168 1.51l-0.859-0.951c-0.332-0.473-0.692-0.559-1.393-0.559h-1.831c-0.7 0-1.061 0.086-1.392 0.559l-0.859 0.951c-2.57 0.449-4.434 1.64-4.434 2.519v0.17c0 1.547 3.403 2.801 7.6 2.801 4.198 0 7.601-1.254 7.601-2.801v-0.17c0-0.879-1.863-2.070-4.433-2.519zM12.070 4.34l-1.070-1.34h-2l-1.068 1.34h-1.7c0 0 1.862-2.221 2.111-2.522 0.19-0.23 0.384-0.318 0.636-0.318h2.043c0.253 0 0.447 0.088 0.637 0.318 0.248 0.301 2.111 2.522 2.111 2.522h-1.7z"></path>
      
  </svg>
      }
    }

    dayjs.extend(relativeTime);

    return (
      <>
        {modal}

        <div className="Card">
          <img className="Card__image" src={imgUrl} alt="" />

          <div className="Card__content">
            <Link className="Card__title" to={`/users/${userHandle}`}>
              {userHandle}
            </Link>


          {trashIcon}
            

            
            <h5 className="Card__created"> {dayjs(createdAt).fromNow()} </h5>
            <p className="Card__body"> {body} </p>

            <div className="icons">
              {heart}

              <Link to={`/scream/${id}`}><svg className="Icon icon__message" viewBox="0 0 20 20" >
                <path d="M18 6v7c0 1.1-0.9 2-2 2h-4v3l-4-3h-4c-1.101 0-2-0.9-2-2v-7c0-1.1 0.899-2 2-2h12c1.1 0 2 0.9 2 2z"></path>
              </svg>
              </Link>
            </div>

            <div className="count">
              {likeCount} {message}  <span style={{marginLeft:"1rem"}}>{commentCount} comments</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.token ? true : false,
    userLikes: state.user.likes,
    user:state.user.credentials
  };
};

const mapDispatchToProps = dispatch=>{
return {
  Like:(like)=>dispatch(actions.likescream(like)),
  Unlike:(screamId)=>dispatch(actions.unlikescream(screamId))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(scream);
