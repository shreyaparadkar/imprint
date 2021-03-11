import React from 'react';
import { NavLink } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const icon = {
  color: 'rgb(101, 107, 129)'
}

const active = {
  backgroundColor:'#ecedf2'
}

export const mainListItems = (
  <div>
        <ListItem button component={NavLink} exact to ='/dashboard' activeStyle={ active }>
        <ListItemIcon>
        <NotificationsIcon style={ icon }/>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
        </ListItem>
      <ListItem button component={NavLink} exact to='/dashboard/add' activeStyle={active}>
      <ListItemIcon>
        <NoteAddIcon style={ icon }/>
      </ListItemIcon>
      <ListItemText primary="Add notes" />
    </ListItem>
    <ListItem button component={NavLink} exact to ='/dashboard/view' activeStyle={ active }>
      <ListItemIcon>
        <VisibilityIcon style={ icon }/>
      </ListItemIcon>
      <ListItemText primary="View clients" />
    </ListItem>
    <ListItem button component={NavLink} exact to ='/dashboard/remove' activeStyle={ active }>
      <ListItemIcon>
        <DeleteForeverIcon style={ icon }/>
      </ListItemIcon>
      <ListItemText primary="Delete client" />
    </ListItem>
  </div>
);
