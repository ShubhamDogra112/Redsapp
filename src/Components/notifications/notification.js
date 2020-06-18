import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { marknotificationsRead } from '../../store/actions/index'

import './notification'

class Notifications extends Component {
  state = {
    anchorEl: null
  };

  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };
  render() {
    let icon =  <svg className = "icon icon__bell" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 15.984l2.016 2.016v0.984h-16.031v-0.984l2.016-2.016v-4.969q0-2.344 1.195-4.078t3.305-2.25v-0.703q0-0.609 0.422-1.055t1.078-0.445 1.078 0.445 0.422 1.055v0.703q2.109 0.516 3.305 2.25t1.195 4.078v4.969zM12 21.984q-0.844 0-1.43-0.563t-0.586-1.406h4.031q0 0.797-0.609 1.383t-1.406 0.586z"></path>
    </svg> 
    
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon  style = {{fontSize:"2rem"}}/>
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon fontSize="large" style={{padding:"0"}}/>);
    } else {
      notificationsIcon = <NotificationsIcon fontSize="large" style={{padding:"0"}} />;
    }
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? 'primary' : 'secondary';
          const icon =
            not.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/scream/${not.screamId}`}
              >
                {not.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
            style={{padding:"0"}}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => ({
  notifications: state.user.notifications
});

const mapDispatchToProps = (dispatch) => ({
    markNotificationsRead:(data)=> dispatch(marknotificationsRead(data))
  });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);