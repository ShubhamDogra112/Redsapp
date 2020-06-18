import React, { Component, Fragment } from "react";
import classes from "./comment.module.scss";
import Spinner from "../../Components/Spinners/home/index";
import axios from "../../serverInstance";
import { withRouter, Link } from "react-router-dom";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import Comment from '../../Components/comment/comment'
import Modal from '../../Components/Modal/Modal'
import {connect} from 'react-redux'


class comment extends Component {

  constructor(props){
    super(props);

    this.scroll = React.createRef();
    this.focus = React.createRef()
    
  }




  componentDidMount() {
    let id = this.props.match.params.id;
  
    axios
      .get(`/scream/${id}`)
      .then((res) => {

        // console.log(res.data)
  
        this.setState({
          screamData: res.data,
          comments:res.data.comments
        });
      })

      .catch((err) => {
        
      });


     }

  

  

  state = {
    body: "",
    screamData: null,
    comments:null,
    showModal:false,
    showSpinner:false
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
  event.preventDefault();

  if(this.props.authenticated){


    this.setState({showSpinner:true})

    

    let comments = [...this.state.comments]
    let screamData = this.state.screamData

    let comment = {
      imgUrl:this.props.user.imgUrl,
      userHandle:this.props.user.handle,
      body:this.state.body,
}


let newComment = comments.concat([comment])

    let id = this.props.match.params.id
    axios.post(`/scream/${id}/comment` , {body:this.state.body})
    .then(res=>{

      // console.log(res.data)
      screamData.commentCount +=1

      this.setState({
        comments:newComment,
        showSpinner:false,
        screamData:screamData


        
      })
      
      
    })
    .catch(err=>{

      this.setState({
        showSpinner:false
      })

    })

  }

  else{
    this.setState({showModal:true})
  }
 
  };

  toggleModalHandler = ()=>{
    this.setState({
      showModal:false
    })
  }

  componentDidUpdate(){
    this.focusInput()
    this.scrollToBottom()

  }


  focusInput =()=>{
    if(this.focus.current){
    this.focus.current.focus();


    }

  
  }

  scrollToBottom = ()=>{

    if(this.scroll.current){

      this.scroll.current.scrollIntoView({
        behavior:'smooth'
      })
    }
      
    }
  
 
  




  render() {


    dayjs.extend(relativeTime);

    let post = <Spinner />;

    if (this.state.screamData) {

    const comments = this.state.comments ? this.state.comments.map((comment , index)=>(
      <Comment key = {index} data = {comment}  />

    )):null
      
    let {userHandle , createdAt , body  , imgUrl ,likeCount ,commentCount} = this.state.screamData

    let button =    <button type="Submit" onClick = {this.handleSubmit} className = {classes.submit}>Submit</button>

    if(this.state.showSpinner){
      button = <div className = {classes.spinner}></div>
    }
               

      post = (
        <Fragment>
          <div className={classes.post}>
            <div className={classes.post__body}>

              <div className={classes.post__image}>
              <img src={imgUrl}  alt=""/>


              </div>

              <div className={classes.post__content}>
                
                <div className={classes.post__header}>
                  <h2 className = {classes.post__author}>{userHandle}</h2>
                  <span className = {classes.post__date}>{dayjs(createdAt).fromNow()}</span>
                </div>

                <div className={classes.post__text}>
                  {body}
                </div>

                <div className={classes.post__icons}>

                <svg className={classes.icon__heart} viewBox="0 0 20 20">
                <path d="M17.19 4.155c-1.672-1.534-4.383-1.534-6.055 0l-1.135 1.042-1.136-1.042c-1.672-1.534-4.382-1.534-6.054 0-1.881 1.727-1.881 4.52 0 6.246l7.19 6.599 7.19-6.599c1.88-1.726 1.88-4.52 0-6.246z"></path>
                </svg>

                <span className ={classes.like}> {likeCount} {likeCount>1 ? 'likes':'like'}</span>

                <svg className={classes.icon__message} viewBox="0 0 20 20" >
                <path d="M18 6v7c0 1.1-0.9 2-2 2h-4v3l-4-3h-4c-1.101 0-2-0.9-2-2v-7c0-1.1 0.899-2 2-2h12c1.1 0 2 0.9 2 2z"></path>
              </svg>

              <span className = {classes.message}>{commentCount} {commentCount>1 ? 'comments':'comment'}</span>


                </div>
                
              
              </div>
            </div>

            <form onSubmit = {this.handleSubmit} className = {classes.form}>
              <label htmlFor="body">Your Comment</label>
              <input type="text" className ={classes.input} ref = {this.focus} required name ="body" id="helo" onChange = {this.handleChange} autoComplete="off" />
              {button}
            </form>
          </div>

          <div className={classes.comments} >
            {comments}

            <div ref = {this.scroll}></div>
          </div>
        </Fragment>
      );
    }
    return <Fragment>
    <Modal show = {this.state.showModal} modalClosed = {this.toggleModalHandler}>
    <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 className="message">
              Join Redsapp now to let <strong>{this.state.screamData ? this.state.screamData.userHandle : null}</strong> know that
              you have commented on their tweet
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/login" className={classes.primary}>
                Login
              </Link>
              <Link to="/signUp" className={classes.secondary}>
                SignUp
              </Link>
            </div>
          </div>

    </Modal>
    <Link to ={"/home"}>

    <svg className={classes.arrow} viewBox="0 0 32 32">
    
      <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
    </svg>
  </Link>

    <div className={classes.container} >{post}</div>
    
  
    
    </Fragment>
  }
}

const mapStateToProps = state=>{
  return{
    authenticated:state.auth.token  ? true: false,
    user:state.user.credentials
  }
}

export default connect(mapStateToProps , null)(withRouter(comment));
