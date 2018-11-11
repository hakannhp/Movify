import React from 'react';
import { View } from '@shoutem/ui';
import NavigationBar from '../components/navigationBar';

export default class ProfileSettings extends React.Component{

    render(){
        return(
        <View>
            <NavigationBar
            navigation={this.props.navigation}
            title={'Settings'}
            type={'TitleAndLeftBack'}
            />
        </View>
        );
    }
}