import React from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Row, Icon } from '@shoutem/ui';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';
import { HomeScreen, ProfileScreen, WatchlistScreen, SearchScreen, WatchedlistScreen,
         ActivateUser, Login, LoginOrSignup, ResetPassword, Signup } from './src/screens';

let user = {
  key: null,
  password: null
}

console.disableYellowBox = true;

const RootNavigator = TabNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    Search: { screen: SearchScreen },
    Watchlist: { screen: WatchlistScreen },
    Watchedlist: { screen: WatchedlistScreen }
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'white'
    },
    navigationOptions: ({navigation}) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = "home";
            break;
          case 'Profile':
            iconName = "user-profile";
            break;
          case 'Search':
            iconName = "search";
            break;
          case 'Watchlist':
            iconName = "add-to-favorites-on";
            break;
          case 'Watchedlist':
            iconName = "checkbox-on";
            break;
          default:
            iconName = "lock"
        }

        // shoutemui icons doesn't support coloring, so we're stuck with black.
        return (
          <Icon name={iconName} />
        );
      }
    })
  }
);

const AuthPages = StackNavigator(
  {
    ActivateUser: { screen: ActivateUser },
    Login: { screen: Login },
    LoginOrSignup: { screen: LoginOrSignup },
    ResetPassword: { screen: ResetPassword },
    Signup: { screen: Signup },
  },
  {
    initialRouteName: 'LoginOrSignup',
    headerMode: 'none' //to hide header for auth pages
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.state,
      fontsAreLoaded: false,
      asyncGetFinished: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
      'Ionicons': require('./node_modules/@expo/vector-icons/fonts/Ionicons.ttf'),
      'FontAwesome': require('./node_modules/@expo/vector-icons/fonts/FontAwesome.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    });

    try{
      await AsyncStorage.getItem('user', (err, result) => {
      user = JSON.parse(result);
    });
    } catch(error){
      console.log(error);
    }

    this.setState({ fontsAreLoaded: true, asyncGetFinished: true});
  }

  render() {
    if (!this.state.fontsAreLoaded && !this.state.asyncGetFinished) {
        return (
          <Row style={styles.container}>
              <ActivityIndicator size="large" color="#0000ff" />
          </Row>
        );
    }
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    if(user !== null && user.key !== null){
      return (
        <Provider store={store}>
         <RootNavigator />
       </Provider>
     );
    }
    else {
      return (
       <Provider store={store}>
         <AuthPages />
       </Provider>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
