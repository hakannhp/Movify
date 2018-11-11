import React from 'react';
import { ActivityIndicator } from 'react-native';
import {  Text, ListView, Image, View, Button, Title, Icon, Row } from '@shoutem/ui';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { userChanged } from '../actions';

import NetworkAccess from '../common/NetworkAccess';
import MovieDetailsScreen from './MovieDetailsScreen';
import NavigationBar from '../components/navigationBar';

const image_path = 'http://image.tmdb.org/t/p/original'

class WatchlistScreen extends React.Component {
  static navigationOptions = {
    title: 'Watchlist'
  };

  constructor(props){
    super(props);
    this.state = {
      movieList: undefined,
      refreshing: false
    }
  }

  componentDidMount(){
    this._onRefresh();
  }

  _onRefresh(){
    this.setState({...this.state, refreshing: true});
    NetworkAccess.getUserWatchlist(this.props.user.user.key, (list) => {
      this.setState({movieList: list, refreshing: false});
    });
  }

  renderRow(movieList){
    const { headerTextStyle} = styles;
    return (
      <View style={styles.rowCard}>
        <Image
          styleName="medium-square"
          source={{uri: image_path + movieList.poster_path}}
        />
        <View style={{ flex: 1, marginHorizontal: 8}}>
          <Title style={{marginVertical: 4}}>{movieList.original_title}
          </Title>
          <Text style={headerTextStyle}>{movieList.releaseDate}</Text>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginVertical: 5 }}>
          <Button style={styles.smallButton}><Icon name="checkbox-on" /></Button>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { movieList } = this.state;
    if(movieList === undefined){
      return (
        <Row style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </Row>
      );
    }
    return(
      <View>
        <NavigationBar
        navigation={this.props.navigation}
        title={'Watch List'}
        type={'JustTitle'}
        />
        <ListView
        data={movieList}
        renderRow={this.renderRow}
        onRefresh={this._onRefresh.bind(this)}
        loading={this.state.refreshing}
        />
      </View>
    )
  }
}

const styles = {
  rowCard: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  headerTextStyle: {
    fontSize: 18
  },
  smallButton: {
    paddingHorizontal: 5
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

const WatchlistStack = StackNavigator({
  Watchlist: { screen: connect(mapStateToProps, { userChanged })(WatchlistScreen)},
  MovieDetails: { screen: MovieDetailsScreen },
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

export default WatchlistStack;
