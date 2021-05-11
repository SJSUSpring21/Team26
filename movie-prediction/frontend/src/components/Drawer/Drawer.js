import React from "react";
import Drawer from "@material-ui/core/Drawer";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import "./drawer.css"
import { useHistory } from "react-router-dom";
import {Redirect} from 'react-router';


const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});



// class DrawerComponent extends React.Component {
//   state = {
//     left: false,
//     redirectVar:null
//   };
  class DrawerComponent extends React.Component {
    state = {
      left: false,
      redirectVarPredict:false,
      redirectVarRecommend:false,
      redirectVarRange:false
    };
   

  handlepredClick()
  {
    
    console.log("Inside predclick!")
    // history.push({
    //   pathname: "/prediction",
    // });
    this.setState({
      redirectVarPredict : true

  })
    
    
      // redirectVar:<Redirect to="/prediction"/>
  }
  handlerecommendClick()
  {
    console.log("Inside Recommend click!")
    this.setState({
      redirectVarRecommend : true

  })
  }
  handlerangeClick()
  {
    console.log("Inside Range click!")
    this.setState({
      redirectVarRange : true

  })
  }

  render() {

    const { classes } = this.props;

    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.props.toggleDrawerHandler}
        onKeyDown={this.props.toggleDrawerHandler}
      >
        

       <List>
      {this.state.redirectVarPredict && <Redirect to="/prediction"/>}
      <ListItem button key="IMDB Prediction" className="item-drawer"  onClick={() => {this.handlepredClick()}}>
      <ListItemText primary="IMDB Prediction" />
      </ListItem>
      <Divider />
      
      {this.state.redirectVarRecommend && <Redirect to="/recommendation"/>}
      <ListItem button key="Movie Recommendation" className="item-drawer" onClick={() => {this.handlerecommendClick()}}>
      <ListItemText primary="Movie Recommendation" />
      </ListItem>
      <Divider />

      {this.state.redirectVarRange && <Redirect to="/filter"/>}
      <ListItem button key="Suggest By Range" className="item-drawer" onClick={() =>{this.handlerangeClick()}}>
      <ListItemText primary="Suggest By Range"  />
      </ListItem>
      <Divider />

      </List>

      </div>
    );

    return (
      <div>
     
      <Drawer open={this.props.left} onClose={this.props.toggleDrawerHandler}>
        {sideList("left")}
      </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(DrawerComponent);
