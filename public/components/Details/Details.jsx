import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from '../../components/Search/search.jsx';
import actions from '../../actions';
import { connect, Store } from 'react-redux';

class Details extends React.Component {
  constructor(props) {
    // console.log('props from Details! = ', props)
    super(props);
  }
  
  componentDidMount() {

  }

  render() {
    console.log('this.props = ', this.props);
    return (
      <div>
        <h1>BEER NAME: {this.props.venue.selectedVenue.breweries[0].name}</h1>
        BREWERY ICON: {this.props.venue.selectedVenue.breweries[0].images ? <img src={this.props.venue.selectedVenue.breweries[0].images.squareMedium} alt="boohoo" className="img-responsive" /> : null}
        <h3>BREWERY ID: {this.props.venue.selectedVenue.breweries[0].id}</h3> 
      </div>
    );
  }
}
  

const stateToProps = (state) => {
  return {
    venue: state.venue
  }
}

const dispatchToProps = (dispatch) => {
  return {
    selectVenue: (venue) => {
      dispatch(actions.selectVenue(venue));
    }
  }
}

export default connect(stateToProps, dispatchToProps)(Details);