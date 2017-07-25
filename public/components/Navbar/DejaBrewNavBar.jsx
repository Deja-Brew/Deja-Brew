import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


class DejaBrewNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }

  handleClose () {
    this.setState({open: false});
  }


  goTo(route) {
    this.handleToggle();
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton
            label="Deja-Brew"
            onTouchTap={this.handleToggle.bind(this)}
          />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >
            { !this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.login.bind(this)}>Log in</MenuItem>) }
            { this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.logout.bind(this)}>Log out</MenuItem>) }
            <MenuItem onTouchTap={this.goTo.bind(this, 'home')}>Home</MenuItem>
            { this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.goTo.bind(this, 'profile')}>Profile</MenuItem>) }
            { this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.goTo.bind(this, 'addBeer')}>Submit Beer</MenuItem>) }
            { this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.goTo.bind(this, 'addBrewery')}>Submit Brewery</MenuItem>) }
            { this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.goTo.bind(this, 'pendingDejaBrew')}>Pending DejaBrews...</MenuItem>) }
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default DejaBrewNavBar;
