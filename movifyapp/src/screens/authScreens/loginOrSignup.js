import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import { Button } from 'react-native-elements';

//redux stuff
import { connect } from 'react-redux';
import { userChanged } from '../../actions';

//Logo, bgimage and slogan
import BackgroundImage from '../../../assets/authBackground.jpg';
import MovifyLogo from '../../components/movifyLogo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class LoginScreen extends Component {
  
  render() {
    return (
      <ImageBackground source={BackgroundImage} style={styles.container}>
          <MovifyLogo screen='loginOrSignUp' />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button
                title='LOGIN'
                onPress={() => this.props.navigation.navigate('Login')}
                buttonStyle={{ height: 50, width: 250, backgroundColor: 'white', borderRadius: 30 }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: 'black' }}
            />
            <Button
                title='SIGN UP'
                onPress={() => this.props.navigation.navigate('Signup')}
                buttonStyle={{ height: 50, width: 250, backgroundColor: 'white', borderRadius: 30, marginTop: 18 }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: 'black' }}
            />
          </View>
          </ImageBackground>
        );
      }
  }


//If you want to add background image, just change backgroundColor of container to transparent
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: 'transparent',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps, { userChanged })(LoginScreen);
