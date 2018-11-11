import React from 'react';
import { Platform, StatusBar, Dimensions, AsyncStorage } from 'react-native';
import Expo from 'expo';
import { View, NavigationBar, Button, Icon } from '@shoutem/ui';

import axios from 'axios';

const height = Dimensions.get('window').height;

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      page: 'NewPage'
    };
    this.logout = this.logout.bind(this);
  }

  logout(){
    axios.get('http://52.58.179.173/logout', {
        withCredentials: true
      })
      .then(() => {
        let userObject = {
          key: null,
          password: null
        }
        try {
          AsyncStorage.setItem('user', JSON.stringify(userObject));
          Expo.Util.reload();
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  returnLeftComponent(type){
    if(type === 'TitleAndLeftBack' || type === 'OtherProfile'){
      return(
          <Button
          onPress={()=> this.props.navigation.pop()}
          >
            <Icon name="back" />
          </Button>
        );
    }
    else if (type === 'OwnProfile'){
      console.log(this.props.navigation);
      return(
        <Button
        onPress={()=> this.logout()}
        >
          <Icon name="turn-off" />
        </Button>
      );
    }
  }

  returnRightComponent(type){
    if(type === 'OwnProfile' || type === 'OtherProfile'){
      return(
        <Button
        onPress={()=> this.props.navigation.navigate('ProfileSearch', {profileScreenNavigation: this.props.navigation})}
        >
          <Icon name="search" />
        </Button>
      );
    }
  }

  render() {
    //type options --> 'OtherProfile', 'OwnProfile', 'TitleAndLeftBack', 'JustTitle', 
    const { title, type } = this.props;
    return(
    <View style={styles.navigationBarView}>
      <NavigationBar
            title={title} styleName="inline"
            style={styles.navigationBarStyle}
            leftComponent={this.returnLeftComponent(type)}
            rightComponent={this.returnRightComponent(type)}
      />
    </View>
    );
  }
}

const styles = {
  navigationBarStyle: {
    container: {
    height: (Platform.OS === 'ios' ? height / 12 : height / 15)
  }},
  navigationBarView: {
    paddingTop: Platform.OS === 'ios' ? 0 : (StatusBar.currentHeight || 0)
  },
}