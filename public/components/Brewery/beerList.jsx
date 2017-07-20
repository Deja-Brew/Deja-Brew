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

  componentDidMount() {
    let info = JSON.parse(localStorage.getItem('userInfo'));
//    console.log('info retrieved', info.id);
    this.setState({ userId: info.id })
  }

  onChangePage(pageOfItems) {
//    console.log('pageOfItems: ', pageOfItems)
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <div>
        <div className="text-center">
            {this.state.pageOfItems.map((beer, i) => 
              <BeerListEntry
                history={this.props.history}
                key={i}
                beer={beer}
                beerId={beer.id}
              />
            )}
            <Pagination items={this.props.beers} onChangePage={this.onChangePage} />
        </div>
        <hr />
      </div>
    );
  }
}


// const BeerList = ({beers, history}) => (
//   <div>
//     {console.log('beers from blist ', beers)}
//     {beers.map((beer, i) => 
//         <BeerListEntry
//           history={history}
//           key={i}
//           beer={beer}
//         />
//     )}
//   </div>
// );

export default BeerList

