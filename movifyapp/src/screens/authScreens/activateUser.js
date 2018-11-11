import React, { Component } from 'react';
import {
  LayoutAnimation,
  Dimensions,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  Alert
} from 'react-native';
import { Button } from 'react-native-elements';
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

class ActivateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: '',
      usernameValid: true,
      activationCode: '',
    };

    this.validateUsername = this.validateUsername.bind(this);
    this.activateAccount = this.activateAccount.bind(this);
  }
 
  activateAccount() {
    LayoutAnimation.easeInEaseOut();
    
    const { activationCode } = this.state;
      if (activationCode === '') {
          Alert.alert('Error', 'Please enter the verification code.');
      }
      else {
        this.setState({ isLoading: true });
        setTimeout(() => {
          LayoutAnimation.easeInEaseOut();
          axios.post(`http://52.58.179.173/activate/${this.state.username}`, {
            key: this.state.verificationCode
            })
            .then((response) => {
              if(response.data.success){
                Alert.alert(
                  'Success', 
                  'User is verified. Please login',
                  [
                    {text: 'Okay', onPress: () => this.props.navigation.goBack()},
                  ],
                  { cancelable: false }
                );
              }
              else{
                Alert.alert('An error occurred😔', `${response.data.error}`);
              }
            })
            .catch((error) => {
            const errorMessage = error.response.data.error;
            this.setState({ isLoading: false });
            Alert.alert('An error occurred😔', `${errorMessage}`);
            });
            }, 1500);    
      }
    }



  validateUsername() {
    const { username } = this.state;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usernameValid });
    usernameValid || this.usernameInput.shake();
    return usernameValid;
  }

  render() {
    const {
      isLoading,
      username,
      usernameValid,
      activationCode,
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
              <View style={{ marginBottom: SCREEN_HEIGHT / 8 }}>
                      <FormInput
                      refInput={usernameInput => (this.usernameInput = usernameInput)}
                      icon="envelope"
                      value={username}
                      onChangeText={usernameInput => this.setState({ username: usernameInput })}
                      placeholder="Username"
                      returnKeyType="next"
                      displayError={!usernameValid}
                      errorMessage="Please enter a valid username"
                      onSubmitEditing={() => {
                          this.validateUsername();
                          this.passwordInput.focus();
                      }}
                      />
                      <FormInput
                      refInput={input => (this.activationCode = input)}
                      icon="envelope"
                      value={activationCode}
                      onChangeText={activationCodeInput => this.setState({ activationCode: activationCodeInput })}
                      placeholder="Activation code"
                      returnKeyType="next"
                      onSubmitEditing={() => {
                          this.validateUsername();
                          this.passwordInput.focus();
                      }}
                      />
                      <Button
                      loading={isLoading}
                      title="ACTIVATE ACCOUNT"
                      containerStyle={{ flex: -1 }}
                      buttonStyle={styles.signUpButton}
                      ViewComponent={require('expo').LinearGradient}
                      linearGradientProps={{
                      colors: ['#FF9800', '#F44336'],
                      start: [1, 0],
                      end: [0.2, 0],
                      }}
                      titleStyle={styles.signUpButtonText}
                      onPress={() => this.activateAccount()}
                      disabled={isLoading}
                      disabledStyle={styles.signUpButton}
                      />
                      <RedirectHere 
                      message="Activated account?"
                      title="Login Here"
                      redirect="Actions.pop()"
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
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: 'white', //#F44336
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

export default connect(mapStateToProps, { userChanged })(ActivateUser);
