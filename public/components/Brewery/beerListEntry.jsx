import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import actions from '../../actions';
import { connect } from 'react-redux';

const styles = {
  card: {
    'paddingTop': 0
  }
};

class BeerListEntry extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from BeerListEntry' ,props)
    this.state = {
      //locationValue: ''
    };
  }

  selectVenue(venue, e) {
    console.log('selectVenue invoked in beerListEntry');
    e.preventDefault();
    // console.log('selectVenue this.props.selectVenue(venue): ', this.props.selectVenue(venue));
    console.log('this is the thing we are looking for', this.props)
    this.props.selectVenue(venue)
  }

  render() {
    // <a onClick={this.selectVenue.bind(this, venue)} href='#'>{venue.name}</a>
    // {(this.props.venue.selectedVenue) ? this.props.venue.selectedVenue.name : 'No Venue'}
    return (
      <Card>
        <CardHeader 
          onClick={() => console.log('clicked')}
          title={this.props.beer.breweries[0].name}
          subtitle={this.props.beer.name}
          showExpandableButton={true}
          avatar={this.props.beer.breweries[0].images ? 
                  this.props.beer.breweries[0].images.squareMedium 
                  :"../../images/No_picture_available.jpg"}
        />
        <CardText 
        style={styles.card}
        >
          Website: <a href={this.props.beer.breweries[0].website}>
             {this.props.beer.breweries[0].website}
          </a>
        </CardText>
        <CardText 
        style={styles.card}
        >
          Phone: {!!this.props.beer.breweries[0].locations ?
            this.props.beer.breweries[0].locations[0].phone : ''}
        </CardText>
        <CardText 
        style={styles.card}
        >
          {!!this.props.beer.breweries[0].locations[0] ? 
            this.props.beer.breweries[0].locations[0].streetAddress : ''}
            <br />
          {!!this.props.beer.breweries[0].locations[0] ?
            this.props.beer.breweries[0].locations[0].locality: ''}
            <br />
          {!!this.props.beer.breweries[0].locations[0] ? 
            this.props.beer.breweries[0].locations[0].region : ''}
        </CardText>
        <CardText expandable={true}>
          {this.props.beer.breweries[0].description}
        </CardText>
      </Card>
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

export default connect(stateToProps, dispatchToProps)(BeerListEntry);

// export default BeerListEntry;

// import React, { Component } from 'react';
// import {
//   TableRow,
//   TableRowColumn
// } from 'material-ui/Table';

// class BeerListEntry extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log('props from BeerListEntry' ,props)
//     this.state = {
//       locationValue: ''
//     };
//   }

//   render() {
//     return (
//         <TableRow>
//           <TableRowColumn>
//            {this.props.beer.name}
//           </TableRowColumn>
//           {/*<TableRowColumn>{this.props.breweries[0].id}</TableRowColumn>*/}
//           <TableRowColumn>
//             <img src={this.props.beer.breweries[0].images ? 
//              this.props.beer.breweries[0].images.icon 
//             :"../../images/No_picture_available.jpg"}/>
//           </TableRowColumn>
//           <TableRowColumn>
//            {this.props.beer.breweries[0].name}
//           </TableRowColumn>
//           <TableRowColumn>
//             <a href={this.props.beer.breweries[0].website}>
//             {this.props.beer.breweries[0].website}
//             </a>
//             </TableRowColumn>
//           <TableRowColumn>
//             {!!this.props.beer.breweries[0].locations ?
//              this.props.beer.breweries[0].locations[0].phone : ''}
//           </TableRowColumn>
//            <TableRowColumn>
//             {!!this.props.beer.breweries[0].locations[0] ? 
//              this.props.beer.breweries[0].locations[0].streetAddress : ''}, 
//             {!!this.props.beer.breweries[0].locations[0] ?
//             this.props.beer.breweries[0].locations[0].locality : ''},
//             {!!this.props.beer.breweries[0].locations[0] ? 
//             this.props.beer.breweries[0].locations[0].region : ''}
//           </TableRowColumn> 
//         </TableRow>
//     );
//   }
// }

// export default BeerListEntry;
