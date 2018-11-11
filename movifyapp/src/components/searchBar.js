import React, { Component } from 'react';
import { Header, Item, Input, Icon } from 'native-base';
import { Button, Icon as IconShoutem } from '@shoutem/ui';

import { connect } from 'react-redux';
import { profileSearchDataChanged, movieSearchDataChanged, searchSpinnerChanged } from '../actions';

//axios
import axios from 'axios';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.handleMovieSearch = this.handleMovieSearch.bind(this);
    this.handleUserSearch = this.handleUserSearch.bind(this);
    this.returnButton = this.returnButton.bind(this);
  }

  handleMovieSearch(input) {
    //If user writes something then delete all of it, it was showing first character's search result
    //This if statement is for fixing it
    if(input === ''){
      this.props.movieSearchDataChanged({ movieSearchData: []});
      return;
    }
    //if input isn't blank and the last elements isn't space
    //(if the last element is space, search result will not change. So, request isn't needed )
    if(input !== '' && input.charAt(input.length-1) !== ' '){
      this.props.searchSpinnerChanged({ searchSpinner: true });
      axios.post('http://52.58.179.173/search/title', {
        keyword: input,
        })
        .then((response) => {
          this.props.searchSpinnerChanged({ searchSpinner: false });
          this.props.movieSearchDataChanged({ movieSearchData: response.data.results.results});
        })
        .catch((error) => {
          console.log(error);
      });
    }
  }

  handleUserSearch(input) {
    //If user writes something then delete all of it, it was showing first character's search result
    //This if statement is for fixing it
    if(input === ''){
      this.props.profileSearchDataChanged({ profileSearchData: []});
      return;
    }
    //if input isn't blank and the last elements isn't space
    //(if the last element is space, search result will not change. So, request isn't needed )
    if(input !== '' && input.charAt(input.length-1) !== ' '){
      this.props.searchSpinnerChanged({ searchSpinner: true });
      axios.post('http://52.58.179.173/search/profile', {
        keyword: input,
        })
        .then((response) => {
          this.props.searchSpinnerChanged({ searchSpinner: false });
          this.props.profileSearchDataChanged({ profileSearchData: response.data.results});
        })
        .catch((error) => {
          console.log(error);
      });
    }
  }

  returnButton(type){
      if(type){
        return(
        <Button
        onPress={()=> this.props.navigation.goBack()}
        >
          <IconShoutem name="back" />
        </Button>
        )
      }
  }
  render() {
    const { type } = this.props; //User search page --> type = true. Movie search page --> type = false;
    return (
        <Header searchBar rounded style={{ backgroundColor: 'white'}} >
          {this.returnButton(type)}
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(input) => type ? this.handleUserSearch(input) : this.handleMovieSearch(input)} />
          </Item>
        </Header>
    );
  }
}

const mapStateToProps = ({ allReducers }) => {
    const { movieSearchData, profileSearchData } = allReducers;
    return { movieSearchData, profileSearchData };
  };

export default connect(mapStateToProps, { profileSearchDataChanged, movieSearchDataChanged, searchSpinnerChanged })(SearchBar);
