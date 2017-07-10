import React, { Component } from 'react';
import Search from './Search/search.jsx';
import BreweryList from './Brewery/breweryList.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Profile from './Profile/Profile.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    };
  }

  handleSearch(searchData) {
    this.setState({
      searchResults: searchData
    });
    console.log('searchResults ', this.state.searchResults)
  }

  handleBeerSearch(searchData) {

  }

  render() {
    return (
      <div>
        <h1>Welcome to Deja-Brew</h1>
        <Profile />
        <MuiThemeProvider>
          <Search handleSearch={this.handleSearch.bind(this)}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <BreweryList breweries={this.state.searchResults}/>
        </MuiThemeProvider>

  
      </div>
    );
  }

}

export default App;
