import React from 'react';
import { TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import { View, Icon, Screen, ScrollView, ListView, Row, Subtitle, Divider} from '@shoutem/ui';

import axios from 'axios';

import NavigationBar from '../components/navigationBar';

export default class FollowList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            users: undefined
        }
    }

    setFollowing(username){
        axios.get(`http://52.58.179.173/profile/${username}/follows`)
            .then(res => {
            this.setState({users: res.data.results});
            });
    }

    setFollowers(username){
        axios.get(`http://52.58.179.173/profile/${username}/followers`)
            .then(res => {
            this.setState({users: res.data.results});
            });
    }

    componentDidMount(){
        const { pageType, username } = this.props.navigation.state.params;
        pageType === 'Followers' ? this.setFollowers(username) : this.setFollowing(username);
    }

    renderRow(user){
        return(
          <TouchableOpacity
          onPress={() => this.props.navigation
            .navigate('OtherProfile', {navigation: this.props.navigation, username: user.username})}
          >
            <Row>
                <Image
                    style={styles.userAvatar}
                    source={{ uri: user.picture }} //'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'
                />
                <View style={styles.username}>
                    <Subtitle>{user.username}</Subtitle>
                </View>
                <Icon styleName="disclosure" name="right-arrow" />
            </Row>
            <Divider styleName="line" />
          </TouchableOpacity>
        )
      }

    render(){
        if (this.state.users === undefined) {
            return (
              <Row style={styles.spinnerContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
              </Row>
            );
        }
        return(
            <Screen style={styles.container}>
                <NavigationBar
                navigation={this.props.navigation}
                title={this.props.navigation.state.params.pageType}
                type={'TitleAndLeftBack'}
                />
                <ScrollView>
                    <ListView
                    data={this.state.users}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    //Don't remove.It is for this bug --> https://github.com/facebook/react-native/issues/1831
                    removeClippedSubviews={false}
                    />
                </ScrollView>
            </Screen>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    spinnerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userAvatar: {
        borderRadius: 30,
        height: 60,
        width: 60,
        borderWidth: 2,
        borderColor: 'transparent',
        marginRight: 10
    },
    username: {
        flexDirection: 'row'
    },
}