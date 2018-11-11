import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

//If Icon line gives metro bundler error, simply run this command and restart the project
// rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json
// import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class FormInput extends React.Component{

    render(){
        const { icon, refInput, ...otherProps } = this.props;
        return (
            <Input
                {...otherProps}
                ref={refInput}
                containerStyle={styles.inputContainer}
                // icon={<Icon name={icon} color="#7384B4" size={18} />}
                inputStyle={styles.inputStyle}
                autoFocus={false}
                autoCapitalize="none"
                keyboardAppearance="dark"
                errorStyle={styles.errorInputStyle}
                autoCorrect={false}
                blurOnSubmit={false}
                placeholderTextColor="white"
            />
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        height: 45,
        marginVertical: 10,
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
        fontSize: 16,
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: 'white', //#F44336
    },
});