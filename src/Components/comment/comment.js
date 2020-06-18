import React, { Component } from 'react'
import classes from "./comment.module.scss"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';


 class comment extends Component {
    render() {

        

        dayjs.extend(relativeTime)

        const {createdAt , body , imgUrl , userHandle } = this.props.data
        return (
            <div className = {classes.comment}>
                <div className = {classes.image}>
                    <img src={imgUrl} className = {classes.img} alt=""/>
                </div>

                <div style={{display:"flex" , flexDirection:"column" , padding:"1rem"}}>

                    <div className={classes.header}>
                        <h2>{userHandle}</h2>
                    
                    <span className = {classes.time}>
                    {dayjs(createdAt).fromNow()}
                    </span>

                    </div>

                    <div className = {classes.body}>
                        {body}
                    </div>

                </div>
                

               


                
            </div>
        )
    }
}

export default comment
