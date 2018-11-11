import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class MovifyLogo extends Component {
    
    render() {
            return (
            <View style={styles.loginHereContainer}>
                <Text style={styles.alreadyAccountText}>
                {this.props.message}
                </Text>
                <Button
                title={this.props.title}
                titleStyle={styles.loginHereText}
                containerStyle={{ flex: -1 }}
                buttonStyle={{ backgroundColor: 'transparent' }}
                underlayColor="transparent"
                onPress={() => {
                    //4.0.0-beta.28 Actions.replace gives TypeError: undefined is not an object (evaluating 'resetAction.actions.map')
                    //it only works with 4.0.0-beta.27 for now
                    this.props.redirect !== 'Actions.pop()'
                    ?
                    this.props.navigation.navigate(this.props.redirect)
                    :
                    this.props.navigation.goBack();
                }}
                />
            </View>
            );
    }
}

// withNavigation returns a component that wraps MovifyLogo and passes in the navigation prop
export default withNavigation(MovifyLogo);

const styles = {
    loginHereContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
    alreadyAccountText: {
        fontSize: 12,
        color: 'white',
    },
    loginHereText: {
        color: '#FF9800',
        fontSize: 12,
    }
};

