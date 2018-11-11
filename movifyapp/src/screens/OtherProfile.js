import React from 'react';

import { GenericProfile } from '../components';

import { connect } from 'react-redux';
import { userChanged } from '../actions';

class OtherProfile extends React.Component {
  static navigationOptions = {
    title: 'OtherProfile',
  };

  render(){
    const { navigation, username } = this.props.navigation.state.params;
    return(
      <GenericProfile
      navigation={navigation}
      username={username}
      type={true} // false own profile, true other profile
      />
    );
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps, { userChanged })(OtherProfile);