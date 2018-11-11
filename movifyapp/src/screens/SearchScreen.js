import React from 'react';
import { View } from '@shoutem/ui';
import { StackNavigator } from 'react-navigation';

import { connect } from 'react-redux';
import { movieSearchDataChanged } from '../actions';
import MovieDetailsScreen from './MovieDetailsScreen';
import { GenericSearch } from '../components';

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <View>
        <GenericSearch
        parentPageProps={this.props}
        type={false} //User search page --> type = true. Movie search page --> type = false;
        />
    </View>
     );
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { movieSearchData, searchSpinner } = allReducers;
  return { movieSearchData, searchSpinner };
};

const SearchStack = StackNavigator(
  {
    Search: { screen: connect(mapStateToProps, { movieSearchDataChanged })(SearchScreen)},
    MovieDetails: { screen: MovieDetailsScreen },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   }
);

export default SearchStack;
