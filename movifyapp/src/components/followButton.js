import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'

import axios from 'axios';

import { connect } from 'react-redux';
import { profileSearchDataChanged } from '../actions';

//Example call <FollowButton username={user1} />
class FollowButton extends React.Component {
    constructor() {
      super();
      this.state = {
        following: false
      };
    }

    componentDidMount() {
      axios.get(`http://52.58.179.173/profile/${this.props.user.user.key}/follows`)
            .then(res => {
              res.data.results.forEach((element) => {
                if(element.username === this.props.username){
                  this.setState({ following: true });
                }
              })
        });
    }

    followUser(){
      this.setState({ following: true });
      axios.post('http://52.58.179.173/follow', {
        username: this.props.username,
        })
        .catch((error) => {
          console.log(error);
      });
    }

    unfollowUser(){
      this.setState({ following: false });
      axios.post('http://52.58.179.173/unfollow', {
        username: this.props.username,
        })
        .catch((error) => {
          console.log(error);
      });
    }

    render() {
      const { following } = this.state;
      return (
        <Button
          title={following ? 'Following' : 'Follow'}
          titleStyle={following ? styles.selectedTitle : styles.title}
          buttonStyle={following ?  styles.selected : styles.notSelected}
          containerStyle={{ marginRight: 10 }}
          onPress={() => following ? this.unfollowUser() : this.followUser()}
        />
      );
    }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Rubik-Regular'
  },
  selectedTitle: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Rubik-Regular'
  },
  selected: {
      borderWidth: 1,
      borderColor: 'transparent', //Border width and border color is added because
      //size of button changes after selection and other elements in same view changes postion (moves below)
      //if other elements move, it looks like a bug
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderRadius: 100,
      width: 127
  },
  notSelected: {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 30,
      width: 127,
      backgroundColor: 'transparent'
  },
});

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps, { profileSearchDataChanged })(FollowButton);
