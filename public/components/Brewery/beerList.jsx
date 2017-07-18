import React, { Component } from 'react';
import BeerListEntry from './beerListEntry.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pagination from './pagination.jsx'


class BeerList extends React.Component {
  constructor() {
    super();
    
    this.state = {
        pageOfItems: []
    };
  
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    console.log('pageOfItems: ', pageOfItems)
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <div>
        <div className="text-center">
            {this.state.pageOfItems.map((beer, i) => 
              <BeerListEntry
                key={i}
                beer={beer}
              />
            )}
            <Pagination items={this.props.beers} onChangePage={this.onChangePage} />
        </div>
        <hr />
      </div>
    );
  }
}

export default BeerList

