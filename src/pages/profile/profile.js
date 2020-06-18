import React, { Component } from "react";
import "./profile.scss";
import { connect } from "react-redux";
// import Page from "./page/index";
import Spinner from "../../Components/Spinners/simple/index";
import axios from '../../serverInstance'
import * as actions from '../../store/actions/index'
import Modal from '../../Components/Modal/Modal'
import EditDetails from './editDetails/editdetails'
import NewScream from "./newScream/newScream"
import Notification from '../../Components/notifications/notification'
class profile extends Component {

  state = {
    openModal:false,
    showIcons:true,
    newScream:false
  }


  editdetailsHandler = ()=>{
    console.log("hello")
  }

  imageChangeHandler = (event)=>{

    const imageFile = event.target.files[0];
  

    const formData = new FormData();
    formData.append('image' , imageFile ,imageFile.name)
    axios.post("/user/upload" , formData)
    .then(res=>{
      this.props.userDetails()
    
    })
    .catch(err=>{
      // console.log(err)
    })

  }


  uploadImageHandler = (event)=>{
    const file  = document.getElementById("image_upload")

    file.click();
   
  }

  editdetailsHandler = ()=>{
    this.setState({openModal:true});
  }

  toggleModalHandler = ()=>{


    this.setState({openModal:false , newScream:false})
  }


  addScreamHandler = ()=>{
    
    this.setState({newScream:true})

}



  

  render() {
    const handleButtonClick = (e) => {
      const buttons = document.querySelectorAll(".card-buttons button");
      const sections = document.querySelectorAll(".card-section");
      const card = document.querySelector(".card");

      const bool = this.state.showIcons

      this.setState({
        showIcons:!bool
      })

      const targetSection = e.target.getAttribute("data-section");
      const section = document.querySelector(targetSection);
      targetSection !== "#about"
        ? card.classList.add("is-active")
        : card.classList.remove("is-active");
      card.setAttribute("data-state", targetSection);
      sections.forEach((s) => s.classList.remove("is-active"));
      buttons.forEach((b) => b.classList.remove("is-active"));
      e.target.classList.add("is-active");
      section.classList.add("is-active");
    };

  

   

    // let profile = <Page />;
    let profile = <Spinner />;
    

    if (this.props.user) {
       profile = (
        <div className="card" data-state="#about">
          <div className="card-header">
            <div
              className="card-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')",
              }}
            ></div>
            <img className="card-avatar" src={this.props.user.imgUrl} alt="" />
            <h1 className="card-fullname">{this.props.user.handle}</h1>

            {this.props.user.jobTitle ? (
              <h2 className="card-jobtitle">{this.props.user.jobTitle}</h2>
            ) : null}
          </div>

          {this.state.showIcons ?<div className="userDetailsUpload">

          {/* image upload */}
            <div>

              <input style = {{height:"0" , width:'0' , opacity:"0"}} type="file" name= "file" id = "image_upload" className = "imageInput"  onChange = {this.imageChangeHandler}/>
              <label htmlFor="image_upload" onClick = {this.uploadImageHandler} className ="tooltip">

                <span className="tooltiptext tooltip__upload">Upload image</span>

                <svg  className = "icon icon__upload"  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 8c-1.657 0-3 1.344-3 3s1.343 3 3 3c1.656 0 3-1.344 3-3s-1.344-3-3-3zM18 5h-2.4c-0.33 0-0.686-0.256-0.789-0.57l-0.621-1.861c-0.105-0.313-0.459-0.569-0.79-0.569h-6.8c-0.33 0-0.686 0.256-0.789 0.568l-0.622 1.862c-0.104 0.314-0.459 0.57-0.789 0.57h-2.4c-1.1 0-2 0.9-2 2v9c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2v-9c0-1.1-0.9-2-2-2zM10 16c-2.762 0-5-2.238-5-5s2.238-5 5-5c2.761 0 5 2.238 5 5s-2.239 5-5 5zM17.5 8.2c-0.387 0-0.7-0.314-0.7-0.701 0-0.385 0.313-0.7 0.7-0.7s0.7 0.314 0.7 0.7c0 0.387-0.313 0.701-0.7 0.701z"></path>
        
                 </svg>
          
              </label>

            </div>

            <div className="addScream tooltip ">

            <span className="tooltiptext tooltip__plus" >New Scream</span>
          <svg  onClick = {this.addScreamHandler} className="icon icon__plus" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
          </svg>


            </div>

            <div className="notifications tooltip ">

            {/* <span className="tooltiptext tootltip__bell">Notifications</span>
          <svg className = "icon icon__bell" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15.984l2.016 2.016v0.984h-16.031v-0.984l2.016-2.016v-4.969q0-2.344 1.195-4.078t3.305-2.25v-0.703q0-0.609 0.422-1.055t1.078-0.445 1.078 0.445 0.422 1.055v0.703q2.109 0.516 3.305 2.25t1.195 4.078v4.969zM12 21.984q-0.844 0-1.43-0.563t-0.586-1.406h4.031q0 0.797-0.609 1.383t-1.406 0.586z"></path>
          </svg> */}
          <Notification/>


            </div>

          

           {/* edit details */}
           <div onClick = {this.editdetailsHandler} className = " tooltip">

           <span className="tooltiptext tooltiptext__pen">Edit Profile</span>
          <svg className="icon icon__pen" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.3 3.7l4 4-12.3 12.3h-4v-4l12.3-12.3zM13.7 2.3l2.3-2.3 4 4-2.3 2.3-4-4z"></path>
          </svg>
          </div>

          </div>:null
    }
    


         


          <div className="card-main">
            <div className="card-section is-active" id="about">

                {this.props.user.bio ?<div className="card-content">
                   <div className="card-subtitle">ABOUT</div> 
                  <p className="card-desc">
                    {this.props.user.bio}
                  </p>
                </div>:null}

              
            </div>

            <div className="card-section" id="contact">
              <div className="card-content">
                <div className="card-subtitle">CONTACT</div>
                <div className="card-contact-wrapper">
                  {this.props.user.location ? (
                    <div className="card-contact">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                        }}
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {this.props.user.location}
                    </div>
                  ) : null}

                  {this.props.user.contactNo ? (
                    <div className="card-contact">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                        }}
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      {this.props.user.contactNo}
                    </div>
                  ) : null}

                  {this.props.user.website ? (
                    <div className="card-contact">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <path d="M22 6l-10 7L2 6" />
                      </svg>
                      <a href={this.props.user.website}>{this.props.user.website}</a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="card-buttons">
               <button
                data-section="#about"
                className="is-active"
                id="about"

              
                onClick={handleButtonClick}
              >
                ABOUT
              </button>
              {this.props.user.contactNo ||
              this.props.user.website ||
              this.props.location ? (
                <button data-section="#contact" onClick={handleButtonClick} className = "contact">
                  CONTACT
                </button>
              ) : null}
            </div>
          </div>
        </div>
      );
    }

    

    return (<>
          <Modal show= {this.state.openModal} modalClosed = {this.toggleModalHandler}>
          
            <EditDetails  closed = {this.toggleModalHandler} />
          </Modal>

          <Modal show = {this.state.newScream}  modalClosed = {this.toggleModalHandler}>
            <NewScream closed = {this.toggleModalHandler}/>

          </Modal>
          {profile}
    
      </>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.credentials,
    authenticated: state.auth.token ? true : false,
  };
};

const mapDispatchToprops = dispatch=>{
  return{
    userDetails :()=>dispatch(actions.get_user_details()),
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(profile);
