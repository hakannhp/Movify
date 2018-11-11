import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  Dimensions,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
//import Expo from 'expo';
import { Button } from 'react-native-elements';
import Expo from 'expo';
import axios from 'axios';

//redux stuff
import { connect } from 'react-redux';
import { userChanged } from '../../actions';

//images and icons
import BackgroundImage from '../../../assets/authBackground.jpg';

//components
import { MovifyLogo, RedirectHere, FormInput} from '../../components';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      key: '',
      keyValid: true,
      password: '',
      passwordValid: true,
    };

    this.validateKey = this.validateKey.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    LayoutAnimation.easeInEaseOut();

    const passwordValid = this.validatePassword();
    const keyValid = this.validateKey();
    if (
      keyValid &&
      passwordValid
    ) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        axios.post('http://52.58.179.173/login', {
          key: this.state.key,
          password: this.state.password,
          })
          .then((response) => {
            axios.get('http://52.58.179.173/profile', {
              withCredentials: true,
            })
            .then((responseProfile) => {
                this.setState({ isLoading: false });
                let userObject = {
                  key: responseProfile.data.results.username,
                  password: this.state.password
                }
                try {
                  AsyncStorage.setItem('user', JSON.stringify(userObject));
                } catch (error) {
                  Alert.alert('An error occurred😔', error.result);
                }
                Expo.Util.reload();
            })
            .catch((error) => {
              console.log(error);
              this.setState({isLoading: false});
            });
          })
          .catch((error) => {
            const errorMessage = error.response.headers['www-authenticate'];
            this.setState({ isLoading: false });
            Alert.alert('An error occurred😔', errorMessage);
          });
          }, 1500);
    }
  }

  validateKey(){
    const { key } = this.state;
    const keyValid = key.length !== 0;
    this.setState({keyValid: keyValid});
    keyValid || this.keyInput.shake();
    return keyValid;
  }

  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  }

  render() {
    const {
      isLoading,
      key,
      keyValid,
      password,
      passwordValid,
    } = this.state;


    return (
      <ImageBackground source={BackgroundImage} style={styles.container2}>
          <ScrollView
            scrollEnabled={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
          >
            <KeyboardAvoidingView
              behavior="position"
              contentContainerStyle={styles.formContainer}
            >
              <MovifyLogo />
              {/* change marginBottom of this view if you want to adjust space between login area and bottom of the screen  */}
              <View style={{ marginBottom: SCREEN_HEIGHT / 18 }}>
                <FormInput
                  refInput={input => (this.keyInput = input)}
                  icon="envelope"
                  value={key}
                  onChangeText={currentKey => this.setState({ key: currentKey })}
                  placeholder="Username or email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  displayError={!keyValid}
                  errorMessage="Please enter a valid email or username"
                  onSubmitEditing={() => {
                    this.validateKey();
                    this.keyInput.focus();
                  }}
                />
                <FormInput
                  refInput={input => (this.passwordInput = input)}
                  icon="lock"
                  value={password}
                  onChangeText={currentPassword => this.setState({ password: currentPassword })}
                  placeholder="Password"
                  secureTextEntry
                  returnKeyType="next"
                  displayError={!passwordValid}
                  errorMessage="Please enter at least 8 characters"
                  onSubmitEditing={() => {
                    this.validatePassword();
                    this.passwordInput.focus();
                  }}
                />
                <Button
                loading={isLoading}
                title="LOGIN"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.signUpButton}
                ViewComponent={require('expo').LinearGradient}
                linearGradientProps={{
                  colors: ['#FF9800', '#F44336'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                titleStyle={styles.signUpButtonText}
                onPress={this.login}
                disabled={isLoading}
                disabledStyle={styles.signUpButton}
                />
                <RedirectHere
                  message="Don't have an account?"
                  title="Sign Up"
                  redirect="Signup"
                />
                <RedirectHere
                  message="Forgot Password?"
                  title="Reset Password"
                  redirect="ResetPassword"
                />
                <RedirectHere
                  message="Not activated account?"
                  title="Activate Account"
                  redirect="ActivateUser"
                />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
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
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,
  },
  signUp: {
    color: 'white',
    fontSize: 25,
  },
  signUpButtonText: {
    fontFamily: 'bold',
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
    marginTop: 15,
    marginRight: 5
  },
  container2: {
    flex: 1,
    position: 'relative',
  },
});

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps, { userChanged })(LoginScreen);
