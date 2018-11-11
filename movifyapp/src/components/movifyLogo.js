import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import mLogo from '../../assets/movify.png';
import yCatalog from '../../assets/yourCatalog.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

//Simple math, just adjusts image sizes and positions
const logoOriginalHeight = 162;
const logoOriginalWidth = 435;
const logoHeight = SCREEN_HEIGHT / 10;
const logoWidth = (SCREEN_HEIGHT / 10) * (logoOriginalWidth / logoOriginalHeight);

const sloganOriginalHeight = 114;
const sloganOriginalWidth = 1020;
const sloganHeight = SCREEN_HEIGHT / 20;
const sloganWidth = (SCREEN_HEIGHT / 20) * (sloganOriginalWidth / sloganOriginalHeight);


export default class MovifyLogo extends Component {

    render() {
        if (this.props.screen === 'loginOrSignUp') {
            return (
                <View>
                    <Image
                    style={{
                        width: logoWidth, 
                        height: logoHeight,
                        marginLeft: (SCREEN_WIDTH - logoWidth) / 2,
                        marginRight: (SCREEN_WIDTH - logoWidth) / 2,
                        marginTop: SCREEN_HEIGHT / 15
                    }}
                    source={mLogo}
                    />
                    <Image
                    style={{
                    width: sloganWidth, 
                    height: sloganHeight,
                    marginLeft: (SCREEN_WIDTH - sloganWidth) / 2,
                    marginRight: (SCREEN_WIDTH - sloganWidth) / 2,
                    marginTop: SCREEN_HEIGHT / 100
                    }}
                    source={yCatalog}
                    />
                </View>
            );
        }
        else {
            return (
                <View>
                    <Image
                    style={{
                        width: logoWidth, 
                        height: logoHeight,
                        marginLeft: (SCREEN_WIDTH - logoWidth) / 2,
                        marginRight: (SCREEN_WIDTH - logoWidth) / 2,
                        marginTop: SCREEN_HEIGHT / 15
                    }}
                    source={mLogo}
                    />
                </View>
            );
        }
    }
}
