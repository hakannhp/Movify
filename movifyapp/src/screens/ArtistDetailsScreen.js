import React from 'react';
import { ActivityIndicator} from 'react-native';
import { View, Image, Text, Row, ListView, Caption, Subtitle, Divider, Title, ScrollView } from '@shoutem/ui';
import { connect } from 'react-redux';

import NetworkAccess from '../common/NetworkAccess';
import { userChanged } from '../actions';

import NavigationBar from '../components/navigationBar';

class ArtistDetailsScreen extends React.Component {
  state = {
    movie: undefined
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.artistName : 'Details',
    }
  };

  componentDidMount(){
    const { params } = this.props.navigation.state;
    NetworkAccess.getArtistDetails(params.artistId, (artist) => {
      this.setState({artist});
    });
  }

  renderRow(movie){
    return(
      <View>
      <Row>
        <Image
          styleName="small-avatar"
          source={{ uri: NetworkAccess.IMAGE_PATH + movie.poster_path }}
        />
        <View style={{ flexDirection: 'row' }}>
          <Subtitle>{movie.original_title}</Subtitle>
          <Caption style={{marginLeft: 'auto'}}>{movie.release_date}</Caption>
        </View>
      </Row>
      <Divider styleName="line" />
      </View>
    )
  }

  render() {
      if (this.state.artist === undefined) {
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
        title={this.state.artist.name}
        type={'TitleAndLeftBack'}
        />
        <ScrollView style={{ marginVertical: 10, marginHorizontal: 10 }}>
          <View style={{flexDirection: 'row'}}>
          <Image
            styleName="medium-square"
            source={{uri: NetworkAccess.IMAGE_PATH + this.state.artist.images[this.state.artist.images.length-1].file_path}}
            style={{ marginRight: 10, marginBottom: 10 }}
          />
            <View>
              <Title style={styles.textStyle}>{this.state.artist.name}</Title>
            </View>
          </View>

          <Text style={{marginVertical: 15, marginHorizontal: 10}}>{this.state.artist.biography}</Text>
          <Title style={{marginBottom: 15}}>Played in</Title>
          <ListView
            data={this.state.artist.movies}
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

export default connect(mapStateToProps, { userChanged })(ArtistDetailsScreen);
