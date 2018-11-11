import React from 'react';
import { AsyncStorage, ActivityIndicator, TouchableOpacity, TouchableHighlight } from 'react-native';
import { ListView, Text, Image, Title, Caption, View, Icon, Button, Row } from '@shoutem/ui';
import { connect } from 'react-redux';

import NetworkAccess from '../common/NetworkAccess';
import { userChanged } from '../actions';
import { StackNavigator } from 'react-navigation';
import MovieDetailsScreen from './MovieDetailsScreen';
import ArtistDetailsScreen from './ArtistDetailsScreen';
import NavigationBar from '../components/navigationBar';

let user;
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    refreshing: false
  };

  constructor(props){
    super(props);
    this.state = {
        titles: undefined,
    }
    this.renderRow = this.renderRow.bind(this);
    this.amountOfRecommendations = 3;
  }

  componentDidMount(){
    try{
      AsyncStorage.getItem('user', (err, result) => {
        user = JSON.parse(result);
        //user logins again when app is opened because
        //it loses cookies when app is closed
        NetworkAccess.loginUser(user, () => {
          this.props.userChanged({ user: user });
          this._onRefresh();
        });
      });
    } catch(error){
      console.log(error);
    }
  }

  _onRefresh(){
    this.setState({...this.state, refreshing: true});
    NetworkAccess.getHomeFeed((movieList) => {
      NetworkAccess.getRecommendations((recommendationList) => {
        const merged = recommendationList.concat(movieList);
        this.setState({titles: merged, refreshing: false});
      });
    }
    );
  }

  renderRow(oneTitle, sectionId, rowId){
    const recommendationComponent = rowId < this.amountOfRecommendations ? <Text>Recommended</Text> : undefined;
    return (
        <View style={styles.rowCard}>
          <TouchableHighlight onPress={() => this.props.navigation
            .navigate('MovieDetails', {movieName: oneTitle.original_title, movieId: oneTitle.id})}>
          <Image
            styleName="medium-square"
            source={{uri: NetworkAccess.IMAGE_PATH + oneTitle.poster_path}}
          />
          </TouchableHighlight>
          <View style={{ flex: 1, marginHorizontal: 8}}>
            <TouchableOpacity onPress={() => this.props.navigation
              .navigate('MovieDetails', {movieName: oneTitle.original_title, movieId: oneTitle.id})}>
              <Title style={{marginVertical: 4}}>{oneTitle.original_title}</Title>
              <Text numberOfLines={3}>{oneTitle.overview}</Text>
            </TouchableOpacity>
            <Caption style={{marginVertical: 4}}>{oneTitle.release_date}</Caption>
            {recommendationComponent}
            <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginVertical: 5 }}>
              <Button style={styles.smallButton}><Icon name="share" /></Button>
              <Button onPress={() => NetworkAccess.addMovieToWatchlist(oneTitle.id)} style={styles.smallButton}><Icon name="add-to-favorites-off" /></Button>
              <Button onPress={() => NetworkAccess.addMovieToWatched(oneTitle.id)} style={styles.smallButton}><Icon name="checkbox-on" /></Button>
            </View>
          </View>
        </View>
    );
  }

  render() {
    const { titles } = this.state;
    if(titles === undefined){
      return (
        <Row style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </Row>
      );
    }
    return (
      <View>
        <NavigationBar
        navigation={this.props.navigation}
        title={'Home'}
        type={'JustTitle'}
        />
        <ListView
          data={titles}
          renderRow={this.renderRow.bind(this)}
          loading={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  rowCard: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  smallButton: {
    paddingHorizontal: 5
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

const HomeStack = StackNavigator({
  Home: { screen: connect(mapStateToProps, { userChanged })(HomeScreen)},
  MovieDetails: { screen: MovieDetailsScreen },
  ArtistDetails: {screen: ArtistDetailsScreen }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

export default HomeStack;
