import React from 'react';
import { ActivityIndicator} from 'react-native';
import { View, Image, Text, Button, Row, ListView, Caption, Subtitle, Divider, Title, Icon, ScrollView, TouchableOpacity } from '@shoutem/ui';
import { connect } from 'react-redux';
import NetworkAccess from '../common/NetworkAccess';
import { userChanged } from '../actions';

import NavigationBar from '../components/navigationBar';

class MovieDetailsScreen extends React.Component {
  state = {
    movie: undefined
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.movieName : 'Details',
    }
  };

  constructor(props){
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    NetworkAccess.getMovieDetails(params.movieId, (movie) => {
      this.setState({movie});
    });
  }

  renderRow(person){
    return(
      <TouchableOpacity onPress={() =>
        this.props.navigation.navigate('ArtistDetails', {artistName: person.name, artistId: person.id})}>
        <Row>
          <Image
            styleName="small-avatar"
            source={{ uri: NetworkAccess.IMAGE_PATH + person.profile_path }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Subtitle>{person.name}</Subtitle>
            <Caption style={{marginLeft: 'auto'}}>{person.character}</Caption>
          </View>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    )
  }

  render() {
      if (this.state.movie === undefined) {
          return (
            <Row style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </Row>
          );
      }
     return (
      <View>
        <NavigationBar
        navigation={this.props.navigation}
        title={this.state.movie.original_title}
        type={'TitleAndLeftBack'}
        />
        <ScrollView style={{ marginVertical: 10, marginHorizontal: 10 }}>
          <View style={{flexDirection: 'row'}}>
          <Image
            styleName="medium-square"
            source={{uri: NetworkAccess.IMAGE_PATH + this.state.movie.poster_path}}
            style={{ marginRight: 10, marginBottom: 10 }}
          />
            <View>
              <Title style={styles.textStyle}>{this.state.movie.original_title}</Title>
              <Text style={styles.textStyle}>Rate: {this.state.movie.vote_average}</Text>
              <Text style={styles.textStyle}>Duration: {this.state.movie.runtime} min.</Text>
              <Text style={styles.textStyle}>Release: {this.state.movie.release_date}</Text>
              <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginVertical: 10 }}>
              <Button style={styles.smallButton}><Icon name="share" /></Button>
              <Button onPress={() => NetworkAccess.addMovieToWatchlist(this.props.navigation.state.params.movieId)}
                style={styles.smallButton}><Icon name="add-to-favorites-off" /></Button>
              <Button onPress={() => NetworkAccess.addMovieToWatched(this.props.navigation.state.params.movieId)}
                style={styles.smallButton}><Icon name="checkbox-on" /></Button>
              </View>
            </View>
          </View>

          <Text style={{marginVertical: 15, marginHorizontal: 10}}>{this.state.movie.overview}</Text>
          <Title style={{marginBottom: 15}}>Actors</Title>
          <ListView
            data={this.state.movie.cast}
            renderRow={this.renderRow}
            initialNumToRender={5}
            />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    marginVertical: 3
  },
  smallButton: {
    paddingHorizontal: 5
  },
}

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};


export default connect(mapStateToProps, { userChanged })(MovieDetailsScreen);
