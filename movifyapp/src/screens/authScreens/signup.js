import React, { Component } from 'react';
import {
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  ImageBackground,
  Alert
} from 'react-native';
import { Button } from 'react-native-elements';

import axios from 'axios';

//redux stuff
import { connect } from 'react-redux';
import { userChanged } from '../../actions';

//components
import { MovifyLogo, RedirectHere, FormInput} from '../../components';

//images and icons
import BackgroundImage from '../../../assets/authBackground.jpg';
import FemaleImage from '../../../assets/female.png';
import MaleImage from '../../../assets/male.png';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedType: null,
      username: '',
      email: '',
      password: '',
      confirmationPassword: '',
      emailValid: true,
      passwordValid: true,
      usernameValid: true,
      confirmationPasswordValid: true,
      userCreated: false,
      verificationCode: '',
    };

    this.setSelectedType = this.setSelectedType.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirmationPassword = this.validateConfirmationPassword.bind(this);
    this.signup = this.signup.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  setSelectedType = selectedType => {
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });
  }

  validateUsername() {
    const { username } = this.state;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usernameValid });
    usernameValid || this.usernameInput.shake();
    return usernameValid;
  }

  signup() {
    LayoutAnimation.easeInEaseOut();
    const usernameValid = this.validateUsername();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    const confirmationPasswordValid = this.validateConfirmationPassword();
    if (
      emailValid &&
      passwordValid &&
      confirmationPasswordValid &&
      usernameValid
    ) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        axios.post('http://52.58.179.173/register', {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          })
          .then((response) => {
            this.setState({ isLoading: false, userCreated: true });
          })
          .catch((error) => {
            const errorMessage = error.response.headers['www-authenticate'];
            this.setState({ isLoading: false, userCreated: false });
            Alert.alert('An error occurred😔', errorMessage);
          });
          }, 1500);    
        }
  }

  verifyCode() {
    const { verificationCode } = this.state;
    if (verificationCode === '') {
        Alert.alert('Error', 'Please enter the verification code.');
    }
    else {
      this.setState({ isLoading: true });
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        axios.post(`http://52.58.179.173/activate/${this.state.username}`, {
          activation_key: this.state.verificationCode
          })
          .then((response) => {
          Alert.alert(
              'Success', 
              'User is verified. Please login',
              [
                {text: 'Okay', onPress: () => this.props.navigation.replace('Login')},
              ],
              { cancelable: false }
            );
          })
          .catch((error) => {
          const errorMessage = error.response.data.error;
          this.setState({ isLoading: false });
          Alert.alert('An error occurred😔', `${errorMessage}`);
          });
          }, 1500);    
    }
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  }

  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  }

  validateConfirmationPassword() {
    const { password, confirmationPassword } = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({ confirmationPasswordValid });
    confirmationPasswordValid || this.confirmationPasswordInput.shake();
    return confirmationPasswordValid;
  }
  
  render() {
    const {
      isLoading,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
      username,
      usernameValid,
    } = this.state;

    if (this.state.userCreated) {
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
                  refInput={input => (this.emailInput = input)}
                  icon="envelope"
                  value={this.state.verificationCode}
                  onChangeText={verificationCode => this.setState({ verificationCode: verificationCode })}
                  placeholder="Verification Code"
                  keyboardType="numeric"
                  returnKeyType="next"
                  displayError={!emailValid}
                  errorMessage="Please enter a valid email address" 
                />
                <Button
                loading={isLoading}
                title="Verify"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.signUpButton}
                ViewComponent={require('expo').LinearGradient}
                linearGradientProps={{
                  colors: ['#FF9800', '#F44336'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                titleStyle={styles.signUpButtonText}
                onPress={() => this.verifyCode()}
                disabled={isLoading}
                disabledStyle={styles.signUpButton}
                />
          </View>
          </KeyboardAvoidingView>
          </ScrollView>
          </ImageBackground>
      );
    }
    else {
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
              <Text style={styles.signUp}>SIGN UP</Text>
              <View style={styles.userTypesContainer}>
                <UserTypeItem
                  label="Female"
                  labelColor="white"
                  image={FemaleImage}
                  onPress={() => this.setState({ selectedType: 'female' })}
                  selected={this.state.selectedType === 'female'}
                />
                <UserTypeItem
                  label="Male"
                  labelColor="white"
                  image={MaleImage}
                  onPress={() => this.setState({ selectedType: 'male' })}
                  selected={this.state.selectedType === 'male'}
                />
              </View>
              <View>
              <FormInput
                  refInput={input => (this.usernameInput = input)}
                  icon="envelope"
                  value={username}
                  onChangeText={usernameInput => this.setState({ username: usernameInput })}
                  placeholder="Username"
                  keyboardType="default"
                  returnKeyType="next"
                  displayError={!usernameValid}
                  errorMessage="Please enter a valid username"
                  onSubmitEditing={() => {
                    this.validateUsername();
                    this.passwordInput.focus();
                  }}
              />
                <FormInput
                  refInput={input => (this.emailInput = input)}
                  icon="envelope"
                  value={email}
                  onChangeText={emailInput => this.setState({ email: emailInput })}
                  placeholder="Email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  displayError={!emailValid}
                  errorMessage="Please enter a valid email address"
                  onSubmitEditing={() => {
                    this.validateEmail();
                    this.passwordInput.focus();
                  }}
                />
                <FormInput
                  refInput={input => (this.passwordInput = input)}
                  icon="lock"
                  value={password}
                  onChangeText={passwordInput => this.setState({ password: passwordInput })}
                  placeholder="Password"
                  secureTextEntry
                  returnKeyType="next"
                  displayError={!passwordValid}
                  errorMessage="Please enter at least 8 characters"
                  onSubmitEditing={() => {
                    this.validatePassword();
                    this.confirmationPasswordInput.focus();
                  }}
                />
                <FormInput
                  refInput={input => (this.confirmationPasswordInput = input)}
                  icon="lock"
                  value={confirmationPassword}
                  onChangeText={confirmationPasswordInput =>
                    this.setState({ confirmationPassword: confirmationPasswordInput })}
                  placeholder="Confirm Password"
                  secureTextEntry
                  displayError={!confirmationPasswordValid}
                  errorMessage="The password fields are not identics"
                  returnKeyType="go"
                  onSubmitEditing={() => {
                    this.validateConfirmationPassword();
                    this.signup();
                  }}
                />
              </View>
              <Button
                loading={isLoading}
                title="SIGNUP"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.signUpButton}
                ViewComponent={require('expo').LinearGradient}
                linearGradientProps={{
                  colors: ['#FF9800', '#F44336'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                titleStyle={styles.signUpButtonText}
                onPress={this.signup}
                disabled={isLoading}
                disabledStyle={styles.signUpButton}
              />
            </KeyboardAvoidingView>
            <RedirectHere
            message="Already have an account?"
            title="Login Here"
            redirect="Login"
            />
          </ScrollView>
          </ImageBackground>
          );
    }
  }
}

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props;
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

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
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH / (1.25),
    alignItems: 'center',
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  userTypeLabel: {
    color: 'yellow',
    fontSize: 11,
  },
  signUpButtonText: {
    fontFamily: 'bold',
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    fontSize: 12,
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

export default connect(mapStateToProps, { userChanged })(SignupScreen);
